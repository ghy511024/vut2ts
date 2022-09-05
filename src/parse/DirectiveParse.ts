import {BaseParse} from "./BaseParse";
import {
    AttributeNode, CompoundExpressionNode, ConstantTypes,
    DirectiveNode,
    ElementNode,
    ExpressionNode, NodeTypes,
    SimpleExpressionNode,
    TemplateNode
} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

/**
 * create by ghy 2022/8/23 18:58
 * @desc 属性解析
 */
export class DirectiveParse extends BaseParse {
    parse(out: OutStream, node: DirectiveNode) {
        const name = node.name
        const type = node.type
        let str
        if (name == "if") {
            // 已在外层处理
        } else if (name == "for") {
            // 已在外层处理
        } else if (name == "bind") {
            this.parseBind(out, node)
        }
        return str;
    }

    parseBind(out: OutStream, node: DirectiveNode) {
        out.write(` `)
        parseManager.getParseByType(node.arg.type).parse(out, node.arg as SimpleExpressionNode)
        out.write(`="\${`)
        let content = node.exp["content"]
        content = content.replace(/[\r\n\s]/g, '')
        if (/^{[\S\s]*?\}/.test(content)) {
            content = content.replace(/[\{\}]/g, "")
            const array = content.split(",")
            for (var i = 0; i < array.length; i++) {
                let item = array[i];
                let rt = (item as string).split(":");
                if (rt.length == 2) {
                    if (i >= 1) {
                        out.write(`+' '+`)
                    }
                    let expNodeKey = {content: rt[0], isStatic: true}
                    let expNodeValue = {content: rt[1], isStatic: false}
                     out.write(`(`)
                    parseManager.getParseByType(node.exp.type).parse(out, expNodeValue as SimpleExpressionNode)
                    out.write(`?'`)
                    parseManager.getParseByType(node.exp.type).parse(out, expNodeKey as SimpleExpressionNode)
                    out.write(`':'')`)
                }
            }
        } else {
            parseManager.getParseByType(node.exp.type).parse(out, node.exp as SimpleExpressionNode)
        }
        out.write(`}"`)
    }

}