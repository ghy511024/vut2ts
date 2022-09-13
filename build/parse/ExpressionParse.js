"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParse = void 0;
const BaseParse_1 = require("./BaseParse");
class ExpressionParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        let content = node.content;
        content = content.replace(/\'/g, '"');
        content = content.replace(/[\r\n\s]/g, '');
        if (node.isStatic) {
            out.write(`${content}`);
        }
        else {
            out.write(`this.expData('${content}',this)`);
        }
    }
}
exports.ExpressionParse = ExpressionParse;
//# sourceMappingURL=ExpressionParse.js.map