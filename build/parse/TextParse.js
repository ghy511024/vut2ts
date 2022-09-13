"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextParse = void 0;
const BaseParse_1 = require("./BaseParse");
class TextParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        const content = node.content;
        out.write(content || "");
    }
}
exports.TextParse = TextParse;
//# sourceMappingURL=TextParse.js.map