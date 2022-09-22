/**
 * create by ghy 2022/8/23 16:44
 * @desc
 */

import {AttributeNode, DirectiveNode, ElementNode, ExpressionNode, TemplateChildNode} from "@vue/compiler-core";
import {OutStream} from "../writer/OutStream";

export abstract class BaseParse {
    parse(out: OutStream, node: TemplateChildNode | ExpressionNode | AttributeNode | DirectiveNode) {
    }
}