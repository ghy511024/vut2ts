import {AttributeNode, DirectiveNode, ElementNode, ExpressionNode, TemplateChildNode} from "@vue/compiler-core";
import {OutStream} from "../writer/OutStream";

/**
 * create by ghy 2022/8/23 16:44
 * @desc
 */
export abstract class BaseParse {
    parse(out: OutStream, node: TemplateChildNode | ExpressionNode | AttributeNode | DirectiveNode) {
    }
}