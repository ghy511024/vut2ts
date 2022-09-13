/**
 * create by ghy 2022/8/23 16:44
 * @desc
 */
import {BaseParse} from "./BaseParse";
import {BaseElementNode, ElementNode, NodeTypes, SimpleExpressionNode, TemplateNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

export class ElementParse extends BaseParse {
    parse(out: OutStream, node: ElementNode) {
        const tag = node.tag;

        // === 处理props
        let props_array = []
        let for_Out: OutStream;
        let if_Out: OutStream;
        const props = node.props;

        let tmpOut = new OutStream();

        if (tag != "template") {

            tmpOut.write(`<${tag}`)
            if (props && props.length) {
                for (var pro of props) {
                    // 处理非指令 属性
                    if (!this.isIFDirective(node as ElementNode)) {
                        parseManager.getParseByType(pro.type).parse(tmpOut, pro)
                    }
                }
            }
            if (this.isSingTag(tag)) {
                tmpOut.write("/>");
            } else {
                tmpOut.write(">");
            }

        }
        let ifStart = false;
        const children = node.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                let child = children[i]
                const type: NodeTypes = child.type;
                const directiveType = this.isIFDirective(child as ElementNode)
                if (directiveType == "if") {
                    let ifConditionArray = []
                    ifConditionArray.push(child);
                    for (var j = i + 1; j < children.length; j++) {
                        let nextChild = children[j]
                        let nextDirectiveType = this.isIFDirective(nextChild as ElementNode)
                        if (nextChild.type == 1 && (nextDirectiveType == "else" || nextDirectiveType == "else-if")) {
                            ifConditionArray.push(nextChild);
                            i = j;
                        } else if (nextChild.type == 1) {
                            break;
                        }
                    }
                    // 开始处理if
                    let ifOutStream = new OutStream();
                    this.parseIfCondition(ifOutStream, ifConditionArray)
                    tmpOut.writeLn(ifOutStream.toString())
                } else if (directiveType == "for") {
                    this.parseFor(tmpOut, child as ElementNode)
                } else {
                    parseManager.getParseByType(child.type).parse(tmpOut, child as ElementNode)
                }
            }
        }
        if (tag != "template") {
            if (!this.isSingTag(tag)) {
                tmpOut.write(`</${tag}>`);
            }

        }
        out.write(tmpOut.toString());
    }

    // 是否包含指令
    isIFDirective(node: ElementNode) {
        if (node.props) {
            const directives = ["if", "else", "else-if"]
            for (var pro of node.props) {
                if (pro.type == NodeTypes.DIRECTIVE) {
                    const name = pro.name
                    if (directives.indexOf(name) >= 0) {
                        return pro.name
                    } else if (name == "for") {
                        return "for"
                    }
                }
            }
        }
    }


    parseIfCondition(allIfOut: OutStream, nodes: ElementNode[]) {
        allIfOut.write(`\${(()=>{`);
        nodes.forEach((node) => {
            if (node.props) {
                let pType = 0;
                let ifPro;
                let forPro;
                let childOut = new OutStream();
                parseManager.getParseByType(node.type).parse(childOut, node as ElementNode)
                for (var pro of node.props) {
                    let name = pro.name
                    if (pro.type == NodeTypes.DIRECTIVE) {
                        if (name == "if" || name == "else" || name == "else-if") {
                            ifPro = pro;
                            pType = pType | 1
                        } else if (name == "for") {
                            forPro = pro;
                            pType = pType | 2
                        }
                    }
                }
                let name = ifPro.name;
                if (name == "else-if") {
                    name = "else if"
                }
                let exp = ifPro.exp
                allIfOut.write(`${name}`)
                if (exp) {
                    let type = exp.type;
                    allIfOut.write(`(`)
                    parseManager.getParseByType(type).parse(allIfOut, exp)
                    allIfOut.writeLn(")")
                }
                allIfOut.writeLn("{")
                if (pType == 3) {
                    let forOut = this.parseForCondition(childOut, forPro.exp)
                    allIfOut.write(forOut.toString())
                    allIfOut.write("return str;")
                } else {
                    allIfOut.write("return ")
                    allIfOut.writeLn("`" + childOut.toString() + "`");
                }
                allIfOut.write('}');
            }
        })
        allIfOut.write('return \'\'})()}');
    }

    parseFor(out: OutStream, node: ElementNode) {


        if (node.props) {
            for (var pro of node.props) {
                if (pro.type == NodeTypes.DIRECTIVE && pro.name == "for") {
                    let childOut = new OutStream();
                    parseManager.getParseByType(node.type).parse(childOut, node as ElementNode)
                    out.write(`\${(()=>{`);
                    let forOut = this.parseForCondition(childOut, pro.exp as SimpleExpressionNode)
                    out.writeLn(forOut.toString())
                    out.write('return str})()}');
                }
            }
        }
    }

    parseForCondition(domOut: OutStream, node: SimpleExpressionNode) {
        let type = node.type; // 4
        let content = node.content; // (item,index) in array
        let forOutStream = new OutStream();
        let array = content.split(" in ");
        node.content = array[1]
        // let tmpOut = new OutStream();
        forOutStream.write(` var str = "";`)
        const param = this.parseForEachParam(array[0]);
        if (param.item) {
            forOutStream.writeLn(`let _tmpItem; if(this['${param.item}']){_tmpItem=this['${param.item}']}`)
        }
        parseManager.getParseByType(type).parse(forOutStream, node);
        forOutStream.writeLn(`.forEach(${array[0]}=>{`)
        forOutStream.writeLn(`this['${param.item}'] = ${param.item};`)

        if (param.index) {
            forOutStream.writeLn(`this["${param.index}"] = ${param.index};`)
        }
        forOutStream.writeLn("str += `" + domOut.toString() + "`");
        forOutStream.writeLn("});");
        forOutStream.writeLn(`this['${param.item}']=_tmpItem;`);

        return forOutStream;
    }

    parseForEachParam(str: string): {
        item: string,
        index: string
    } {
        let item = ""
        let index = ""
        if (/\(.*?\)/gi.test(str)) {
            str.replace(/\((.*?),(.*?)\)/, (all, $1, $2) => {
                item = $1;
                index = $2;
                return ""
            })
        } else {
            item = str;
        }
        return {
            item: item,
            index: index
        }
    }

    private isSingTag(tag: string) {
        if (/^(img|hr|br)$/.test(tag)) {
            return true;
        }
        return false;
    }
}