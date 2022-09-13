"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseManager = exports.ParseManager = void 0;
const ElementParse_1 = require("./ElementParse");
const TextParse_1 = require("./TextParse");
const InterPolationParse_1 = require("./InterPolationParse");
const ExpressionParse_1 = require("./ExpressionParse");
const CommentParse_1 = require("./CommentParse");
const AttributeParse_1 = require("./AttributeParse");
const DirectiveParse_1 = require("./DirectiveParse");
class ParseManager {
    constructor() {
        this.elementParse = new ElementParse_1.ElementParse();
        this.textParse = new TextParse_1.TextParse();
        this.interPolationParse = new InterPolationParse_1.InterPolationParse();
        this.expressionParse = new ExpressionParse_1.ExpressionParse();
        this.commentParse = new CommentParse_1.CommentParse();
        this.attributeParse = new AttributeParse_1.AttributeParse();
        this.directiveParse = new DirectiveParse_1.DirectiveParse();
    }
    getParseByType(typeId) {
        switch (typeId) {
            case 1:
                return this.elementParse;
                break;
            case 2:
                return this.textParse;
                break;
            case 5:
                return this.interPolationParse;
                break;
            case 4:
                return this.expressionParse;
                break;
            case 3:
                return this.commentParse;
                break;
            case 6:
                return this.attributeParse;
                break;
            case 7:
                return this.directiveParse;
                break;
            default:
                console.error("unknown type", typeId);
                break;
        }
    }
}
exports.ParseManager = ParseManager;
exports.parseManager = new ParseManager();
//# sourceMappingURL=ParseManager.js.map