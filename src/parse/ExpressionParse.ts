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
        out.write(`this.ghyFun('${content}',this)`)
    }
}