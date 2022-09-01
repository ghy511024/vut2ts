import {ElementNode, NodeTypes, TemplateChildNode, TemplateNode} from "@vue/compiler-core";
import {parseManager} from "./parse/ParseManager";
import {OutStream} from "./writer/OutStream";
import {SFCDescriptor, SFCScriptBlock} from "@vue/compiler-sfc";

/**
 * create by ghy 2022/8/23 16:18
 * @desc
 */
export class TemplateGenerate {
    ast: ElementNode
    scriptSFC: SFCScriptBlock
    out: OutStream
    setupParam: string

    constructor(sfc: SFCDescriptor) {
        this.ast = sfc.template.ast;
        this.scriptSFC = sfc.script;
        this.out = new OutStream();
    }

    main() {
        this.writeFun();
        this.parseTsSource();
        this.writeMain();
        return this.out.toString();
    }

    getTemplateStr() {
        let ast = this.ast
        if (!ast) {
            return ""
        }
        let array = []
        const out = new OutStream();
        if (ast.children) {
            for (let child of ast.children) {
                parseManager.getParseByType(child.type).parse(out, child)
            }
        }
        return out.toString();
    }

    parseTsSource() {
        let str = this.scriptSFC.content;
        let setupParam
        str.replace(/setup\(([\s\S]*?)\)/, (ALL, $1) => {
            this.setupParam = $1;
            return ""
        })
        str = str.replace(/export\s+default\s/gi, "const _tmp= ")
        this.out.write(str)
    }

    parseTemplate() {

    }

    writeFun() {
        const str = `let fun = new Function("str", "data", \`
return (function (str, data) {
var tmpData=data||{}
        var tmp="";
            with (tmpData) {
                try {
                    tmp = eval(str);
                } catch (e) {
                    console.warn(str +"not exits in data",data,"\\\\n",new Error(e));
                }
            }
            return  tmp
        }
    )(str, data);
\`)`
        this.out.write(str);
    }

    writeMain() {
        const templateStr = this.getTemplateStr();
        const str = `
export default {
    ghyFun: fun,
    setup(${this.setupParam ? this.setupParam : "ctx"}) {
        // @ts-ignore
        let data = _tmp.setup(...arguments);
        Object.assign(this, data);
    },
    toString() {
        let str = \`${templateStr}\`
        return str
    }
};
`;
        this.out.write(str);
    }


}