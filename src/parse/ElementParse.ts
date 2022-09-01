/**
 * create by ghy 2022/8/23 16:44
 * @desc
 */
import {BaseParse} from "./BaseParse";
import {ElementNode, NodeTypes, SimpleExpressionNode, TemplateNode} from "@vue/compiler-core";
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
        const children = node.children;
        if (children) {
            for (let child of children) {
                const type: NodeTypes = child.type;
                parseManager.getParseByType(child.type).parse(tmpOut, child as ElementNode)
            }
        }
        tmpOut.write(`</${tag}>`);

        // 处理指令节点
        if (props && props.length) {
            for (var pro of props) {
                if (pro.type == NodeTypes.DIRECTIVE) {
                    const name = pro.name
                    if (name == "if") {
                        tmpOut = this.parseIf(tmpOut, pro.exp as SimpleExpressionNode)
                    } else if (name == "for") {
                        tmpOut = this.parseFor(tmpOut, pro.exp as SimpleExpressionNode)
                    }
                }
            }

        }
        out.write(tmpOut.toString());
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