import {BaseParse} from "./BaseParse";
import {ElementNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

/**
 * create by ghy 2022/8/23 17:59
 * @desc 注释解析
 */
export class CommentParse extends BaseParse {
    parse(out: OutStream,node: ElementNode) {
        return ``
    }
}