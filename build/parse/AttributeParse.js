"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeParse = void 0;
const BaseParse_1 = require("./BaseParse");
const ParseManager_1 = require("./ParseManager");
class AttributeParse extends BaseParse_1.BaseParse {
    parse(out, node) {
        const name = node.name;
        const type = node.type;
        const value = node.value;
        out.write(` ${name}='`);
        ParseManager_1.parseManager.getParseByType(value.type).parse(out, value);
        out.write(`'`);
    }
}
exports.AttributeParse = AttributeParse;
//# sourceMappingURL=AttributeParse.js.map