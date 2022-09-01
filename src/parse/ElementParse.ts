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

        tmpOut.write(`<${tag}`)
        if (props && props.length) {
            for (var pro of props) {
                // 处理非指令 属性
                if (pro.type != NodeTypes.DIRECTIVE) {
                    parseManager.getParseByType(pro.type).parse(tmpOut, pro)
                }
            }
        }
        tmpOut.write(">");
        // === 处理孩子节点
        let ifStart = false;
        const children = node.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                let child = children[i]
                const type: NodeTypes = child.type;
                const directiveType = this.isHaveDirectiveProps(child as ElementNode)
                if (directiveType == "if") {
                    let ifConditionArray = []
                    ifConditionArray.push(child);
                    for (var j = i + 1; j < children.length; j++) {
                        let nextChild = children[j]
                        let nextDirectiveType = this.isHaveDirectiveProps(nextChild as ElementNode)
                        console.log("nextDirectiveType", nextDirectiveType)
                        if (nextChild.type == 1 && (nextDirectiveType == "else" || nextDirectiveType == "else-if")) {
                            ifConditionArray.push(nextChild);
                            i = j;
                        } else if (nextChild.type == 1) {
                            console.log("stop")
                            break;
                        }
                    }
                    // 开始处理if
                    let ifOutStream = new OutStream();
                    this.parseIfCondition(ifOutStream, ifConditionArray)
                    tmpOut.writeLn(ifOutStream.toString())
                } else {
                    parseManager.getParseByType(child.type).parse(tmpOut, child as ElementNode)
                }
            }
        }
        tmpOut.write(`</${tag}>`);

        // 处理指令节点
        // if (props && props.length) {
        //     for (var pro of props) {
        //         if (pro.type == NodeTypes.DIRECTIVE) {
        //             const name = pro.name
        //             if (name == "if") {
        //                 tmpOut = this.parseIf(tmpOut, pro.exp as SimpleExpressionNode)
        //             } else if (name == "for") {
        //                 tmpOut = this.parseFor(tmpOut, pro.exp as SimpleExpressionNode)
        //             }
        //         }
        //     }
        // }
        out.write(tmpOut.toString());
    }

    // 是否包含指令
    isHaveDirectiveProps(node: ElementNode) {
        if (node.props) {
            const directives = ["if", "else", "else-if", "for"]
            for (var pro of node.props) {
                if (pro.type == NodeTypes.DIRECTIVE) {
                    const name = pro.name
                    if (directives.indexOf(name) >= 0) {
                        return pro.name
                    }
                }
            }
        }
    }

    // 是否包含指令
    isHaveIf(node: ElementNode) {
        if (node.props) {
            const directives = ["if", "else", "else-if", "for"]
            for (var pro of node.props) {
                if (pro.type == NodeTypes.DIRECTIVE) {
                    const name = pro.name
                    if (directives.indexOf(name) > 0) {
                        return pro.name
                    }
                }
            }
        }
    }

    parseIfCondition(allIfOut: OutStream, nodes: ElementNode[]) {
        allIfOut.write(`\${(()=>{`);
        console.log(nodes.length)
        nodes.forEach((node) => {
            if (node.props) {
                for (var pro of node.props) {
                    let name = pro.name
                    let childOut = new OutStream();
                    parseManager.getParseByType(node.type).parse(childOut, node as ElementNode)
                    if (pro.type == NodeTypes.DIRECTIVE) {
                        if (name == "if" || name == "else" || name == "else-if") {
                            if (name == "else-if") {
                                name = "else if"
                            }
                            let exp = pro.exp
                            allIfOut.write(`${name}(`)
                            let type = exp.type;
                            parseManager.getParseByType(type).parse(allIfOut, exp)
                            allIfOut.write(")\n{")
                            allIfOut.write("return ")
                            allIfOut.writeLn("`" + childOut.toString() + "`");
                            allIfOut.write('}');
                        }
                    }
                }

            }
        })
        allIfOut.write('return \'\'})()}');
    }

    parseIf(out: OutStream, exp: SimpleExpressionNode) {
        let tmpOut = new OutStream();
        tmpOut.write(`\${(()=>{if(`)
        let type = exp.type;
        parseManager.getParseByType(type).parse(tmpOut, exp)
        tmpOut.write("){")
        tmpOut.write("return ")
        tmpOut.writeLn("`" + out.toString() + "`");
        tmpOut.write('}return \'\'})()}');
        return tmpOut;
    }

    parseFor(out: OutStream, exp: SimpleExpressionNode) {
        let type = exp.type; // 4
        let content = exp.content; // (item,index) in array
        let array = content.split(" in ");
        exp.content = array[1]
        let tmpOut = new OutStream();
        tmpOut.write(`\${(()=>{ 
        var str = "";`)
        const param = this.parseForEachParam(array[0]);
        if (param.item) {
            tmpOut.writeLn(`let _tmpItem; if(this['${param.item}']){_tmpItem=this['${param.item}']}`)
        }
        parseManager.getParseByType(type).parse(tmpOut, exp);
        tmpOut.writeLn(`.forEach(${array[0]}=>{`)
        tmpOut.writeLn(`this['${param.item}'] = ${param.item};`)

        if (param.index) {
            tmpOut.writeLn(`this["${param.index}"] = ${param.index};`)
        }
        tmpOut.writeLn("str += `" + out.toString() + "`");
        tmpOut.writeLn("});");
        tmpOut.writeLn(`this['${param.item}']=_tmpItem;`);
        tmpOut.writeLn("return str})()}");
        return tmpOut;
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
}