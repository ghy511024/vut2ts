import {BaseParse} from "./BaseParse";
import {ExpressionNode, InterpolationNode, SimpleExpressionNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

/**
 * create by ghy 2022/8/23 17:47
 * @desc
 */
export class ExpressionParse extends BaseParse {
    parse(out: OutStream, node: SimpleExpressionNode) {
        let content = node.content;
        content = content.replace(/\'/g, '"')
        content = content.replace(/[\r\n\s]/g, '')
        if (node.isStatic) {
            out.write(`${content}`)
        } else {
            out.write(`this.expData('${content}',this)`)
        }

    }
}