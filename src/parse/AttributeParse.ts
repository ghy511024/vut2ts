import {BaseParse} from "./BaseParse";
import {AttributeNode, ElementNode, TemplateNode} from "@vue/compiler-core";
import {parseManager} from "./ParseManager";
import {OutStream} from "../writer/OutStream";

/**
 * create by ghy 2022/8/23 18:58
 * @desc 属性解析
 */

export class AttributeParse extends BaseParse {
    parse(out: OutStream, node: AttributeNode) {
        const name = node.name
        const type = node.type
        const value = node.value
        out.write(` ${name}='`)
        parseManager.getParseByType(value.type).parse(out, value)
        out.write(`'`)
    }

}