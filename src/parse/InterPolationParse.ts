/**
 * create by ghy 2022/8/23 17:33
 * @desc
 */
import {BaseParse} from "./BaseParse";
import {ElementNode, InterpolationNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

export class InterPolationParse extends BaseParse {
    parse(out: OutStream, node: InterpolationNode) {
        let content = node.content;
        let c_type = content.type
        let child_array = []
        out.write("${")
        parseManager.getParseByType(c_type).parse(out, content)
        out.write("}")
    }
}