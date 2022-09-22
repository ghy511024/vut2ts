/**
 * create by ghy 2022/8/23 16:44
 * @desc
 */

import {BaseParse} from "./BaseParse";
import {ElementNode, TextNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

export class TextParse extends BaseParse {
    parse(out: OutStream,node: TextNode) {
        const content = node.content;
        out.write(content||"")
    }
}