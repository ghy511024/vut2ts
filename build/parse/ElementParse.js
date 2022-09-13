"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementParse = void 0;
const BaseParse_1 = require("./BaseParse");
const ParseManager_1 = require("./ParseManager");
const OutStream_1 = require("../writer/OutStream");
class ElementParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        const tag = node.tag;
        let props_array = [];
        let for_Out;
        let if_Out;
        const props = node.props;
        let tmpOut = new OutStream_1.OutStream();
        if (tag != "template") {
            tmpOut.write(`<${tag}`);
            if (props && props.length) {
                for (var pro of props) {
                    if (!this.isIFDirective(node)) {
                        ParseManager_1.parseManager.getParseByType(pro.type).parse(tmpOut, pro);
                    }
                }
            }
            tmpOut.write(">");
        }
        let ifStart = false;
        const children = node.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                let child = children[i];
                const type = child.type;
                const directiveType = this.isIFDirective(child);
                if (directiveType == "if") {
                    let ifConditionArray = [];
                    ifConditionArray.push(child);
                    for (var j = i + 1; j < children.length; j++) {
                        let nextChild = children[j];
                        let nextDirectiveType = this.isIFDirective(nextChild);
                        if (nextChild.type == 1 && (nextDirectiveType == "else" || nextDirectiveType == "else-if")) {
                            ifConditionArray.push(nextChild);
                            i = j;
                        }
                        else if (nextChild.type == 1) {
                            break;
                        }
                    }
                    let ifOutStream = new OutStream_1.OutStream();
                    this.parseIfCondition(ifOutStream, ifConditionArray);
                    tmpOut.writeLn(ifOutStream.toString());
                }
                else if (directiveType == "for") {
                    this.parseFor(tmpOut, child);
                }
                else {
                    ParseManager_1.parseManager.getParseByType(child.type).parse(tmpOut, child);
                }
            }
        }
        if (tag != "template") {
            tmpOut.write(`</${tag}>`);
        }
        out.write(tmpOut.toString());
    }
    isIFDirective(node) {
        if (node.props) {
            const directives = ["if", "else", "else-if"];
            for (var pro of node.props) {
                if (pro.type == 7) {
                    const name = pro.name;
                    if (directives.indexOf(name) >= 0) {
                        return pro.name;
                    }
                    else if (name == "for") {
                        return "for";
                    }
                }
            }
        }
    }
    parseIfCondition(allIfOut, nodes) {
        allIfOut.write(`\${(()=>{`);
        nodes.forEach((node) => {
            if (node.props) {
                let pType = 0;
                let ifPro;
                let forPro;
                let childOut = new OutStream_1.OutStream();
                ParseManager_1.parseManager.getParseByType(node.type).parse(childOut, node);
                for (var pro of node.props) {
                    let name = pro.name;
                    if (pro.type == 7) {
                        if (name == "if" || name == "else" || name == "else-if") {
                            ifPro = pro;
                            pType = pType | 1;
                        }
                        else if (name == "for") {
                            forPro = pro;
                            pType = pType | 2;
                        }
                    }
                }
                let name = ifPro.name;
                if (name == "else-if") {
                    name = "else if";
                }
                let exp = ifPro.exp;
                allIfOut.write(`${name}`);
                if (exp) {
                    let type = exp.type;
                    allIfOut.write(`(`);
                    ParseManager_1.parseManager.getParseByType(type).parse(allIfOut, exp);
                    allIfOut.writeLn(")");
                }
                allIfOut.writeLn("{");
                if (pType == 3) {
                    let forOut = this.parseForCondition(childOut, forPro.exp);
                    allIfOut.write(forOut.toString());
                    allIfOut.write("return str;");
                }
                else {
                    allIfOut.write("return ");
                    allIfOut.writeLn("`" + childOut.toString() + "`");
                }
                allIfOut.write('}');
            }
        });
        allIfOut.write('return \'\'})()}');
    }
    parseFor(out, node) {
        if (node.props) {
            for (var pro of node.props) {
                if (pro.type == 7 && pro.name == "for") {
                    let childOut = new OutStream_1.OutStream();
                    ParseManager_1.parseManager.getParseByType(node.type).parse(childOut, node);
                    out.write(`\${(()=>{`);
                    let forOut = this.parseForCondition(childOut, pro.exp);
                    out.writeLn(forOut.toString());
                    out.write('return str})()}');
                }
            }
        }
    }
    parseForCondition(domOut, node) {
        let type = node.type;
        let content = node.content;
        let forOutStream = new OutStream_1.OutStream();
        let array = content.split(" in ");
        node.content = array[1];
        forOutStream.write(` var str = "";`);
        const param = this.parseForEachParam(array[0]);
        if (param.item) {
            forOutStream.writeLn(`let _tmpItem; if(this['${param.item}']){_tmpItem=this['${param.item}']}`);
        }
        ParseManager_1.parseManager.getParseByType(type).parse(forOutStream, node);
        forOutStream.writeLn(`.forEach(${array[0]}=>{`);
        forOutStream.writeLn(`this['${param.item}'] = ${param.item};`);
        if (param.index) {
            forOutStream.writeLn(`this["${param.index}"] = ${param.index};`);
        }
        forOutStream.writeLn("str += `" + domOut.toString() + "`");
        forOutStream.writeLn("});");
        forOutStream.writeLn(`this['${param.item}']=_tmpItem;`);
        return forOutStream;
    }
    parseForEachParam(str) {
        let item = "";
        let index = "";
        if (/\(.*?\)/gi.test(str)) {
            str.replace(/\((.*?),(.*?)\)/, (all, $1, $2) => {
                item = $1;
                index = $2;
                return "";
            });
        }
        else {
            item = str;
        }
        return {
            item: item,
            index: index
        };
    }
}
exports.ElementParse = ElementParse;
//# sourceMappingURL=ElementParse.js.map