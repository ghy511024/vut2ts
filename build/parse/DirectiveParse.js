"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectiveParse = void 0;
const BaseParse_1 = require("./BaseParse");
const ParseManager_1 = require("./ParseManager");
class DirectiveParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        const name = node.name;
        const type = node.type;
        let str;
        if (name == "if") {
        }
        else if (name == "for") {
        }
        else if (name == "bind") {
            this.parseBind(out, node);
        }
        return str;
    }
    parseBind(out, node) {
        out.write(` `);
        ParseManager_1.parseManager.getParseByType(node.arg.type).parse(out, node.arg);
        out.write(`="\${`);
        let content = node.exp["content"];
        content = content.replace(/[\r\n\s]/g, '');
        if (/^{[\S\s]*?\}/.test(content)) {
            out.write(`(`);
            content = content.replace(/[\{\}]/g, "");
            const array = content.split(",");
            for (var i = 0; i < array.length; i++) {
                let item = array[i];
                let rt = item.split(":");
                if (rt.length == 2) {
                    if (i >= 1) {
                        out.write(`+' '+`);
                    }
                    let key = rt[0].replace(/("|')/g, "");
                    let expNodeKey = { content: key, isStatic: true };
                    let expNodeValue = { content: rt[1], isStatic: false };
                    out.write(`(`);
                    ParseManager_1.parseManager.getParseByType(node.exp.type).parse(out, expNodeValue);
                    out.write(`?'`);
                    ParseManager_1.parseManager.getParseByType(node.exp.type).parse(out, expNodeKey);
                    out.write(`':'')`);
                }
            }
            out.write(`).replace(/(^\\s+|\\s+$)/g,'')`);
        }
        else {
            ParseManager_1.parseManager.getParseByType(node.exp.type).parse(out, node.exp);
        }
        out.write(`}"`);
    }
}
exports.DirectiveParse = DirectiveParse;
//# sourceMappingURL=DirectiveParse.js.map