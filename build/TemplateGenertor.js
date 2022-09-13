"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateGenerate = void 0;
const ParseManager_1 = require("./parse/ParseManager");
const OutStream_1 = require("./writer/OutStream");
class TemplateGenerate {
    constructor(sfc) {
        this.ast = sfc.template.ast;
        this.scriptSFC = sfc.script;
        this.out = new OutStream_1.OutStream();
    }
    main() {
        this.writeFun();
        this.parseTsSource();
        this.writeMain();
        return this.out.toString();
    }
    getTemplateStr() {
        let ast = this.ast;
        if (!ast) {
            return "";
        }
        let array = [];
        const out = new OutStream_1.OutStream();
        ParseManager_1.parseManager.getParseByType(ast.type).parse(out, ast);
        return out.toString();
    }
    parseTsSource() {
        let str = this.scriptSFC.content;
        let setupParam;
        str.replace(/setup\(([\s\S]*?)\)/, (ALL, $1) => {
            this.setupParam = $1;
            return "";
        });
        str = str.replace(/export\s+default\s/gi, "const _tmp= ");
        this.out.write(str);
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
\`)`;
        this.out.write(str);
    }
    writeMain() {
        const templateStr = this.getTemplateStr();
        const str = `
export default {
    expData: fun,
    setup(${this.setupParam ? this.setupParam : "ctx"}) {
        let data = {}
        if (typeof _tmp["data"]=="function"){
            data = _tmp["data"]();
        } 
        let methods = {}
        if (typeof _tmp["methods"]=="object"){
            methods = _tmp["methods"]
        } 
        // @ts-ignore
        let setupData = _tmp.setup(...arguments);
        Object.assign(this, data, setupData, methods);
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
exports.TemplateGenerate = TemplateGenerate;
//# sourceMappingURL=TemplateGenertor.js.map