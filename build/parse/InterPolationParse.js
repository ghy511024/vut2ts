"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterPolationParse = void 0;
const BaseParse_1 = require("./BaseParse");
const ParseManager_1 = require("./ParseManager");
class InterPolationParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        let content = node.content;
        let c_type = content.type;
        let child_array = [];
        out.write("${");
        ParseManager_1.parseManager.getParseByType(c_type).parse(out, content);
        out.write("}");
    }
}
exports.InterPolationParse = InterPolationParse;
//# sourceMappingURL=InterPolationParse.js.map