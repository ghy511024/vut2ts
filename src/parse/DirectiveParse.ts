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
 * @desc 属性解析 此文件用不着，在节点层处理了
 */
export class DirectiveParse extends BaseParse {
    parse(out: OutStream, node: DirectiveNode) {
        const name = node.name
        const type = node.type
        let str
        if (name == "if") {
            str = this.parseIf(out, node.exp as SimpleExpressionNode);
        } else if (name == "for") {
            str = this.parseFor(out, node.exp as SimpleExpressionNode);
        }
        return str;
    }

    parseIf(out: OutStream, exp: SimpleExpressionNode) {

        let tmpOut = new OutStream();
        tmpOut.write(`\${(()=>{if(`)
        let type = exp.type;
        parseManager.getParseByType(type).parse(tmpOut, exp)
        tmpOut.write("){")
        tmpOut.writeLn("return ")
        tmpOut.writeLn(out.toString());
        tmpOut.write('}})()}');
        out = tmpOut;
    }

    parseFor(out: OutStream, exp: SimpleExpressionNode) {
        let type = exp.type; // 4
        let content = exp.content; // (item,index) in array
        let array = content.split(" in ");
        exp.content = array[1]
        let tmpOut = new OutStream();
        tmpOut.write(`\${(()=>{ 
        var str = "";`)
        parseManager.getParseByType(type).parse(tmpOut, exp);
        tmpOut.writeLn(`.forEach(${array[0]}=>{)`)
        tmpOut.writeLn(out.toString())
        tmpOut.writeLn("}; return str})()}");

        out = tmpOut;
        console.log(out.toString())
    }

}