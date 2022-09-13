/**
 * create by ghy 2022/8/23 16:40
 * @desc
 */
import {NodeTypes} from "@vue/compiler-core";
import {BaseParse} from "./BaseParse";
import {ElementParse} from "./ElementParse";
import {TextParse} from "./TextParse";
import {InterPolationParse} from "./InterPolationParse";
import {ExpressionParse} from "./ExpressionParse";
import {CommentParse} from "./CommentParse";
import {AttributeParse} from "./AttributeParse";
import {DirectiveParse} from "./DirectiveParse";


export class ParseManager {
    private elementParse: ElementParse
    private textParse: TextParse
    private interPolationParse: InterPolationParse
    private expressionParse: ExpressionParse
    private commentParse: CommentParse
    private attributeParse: AttributeParse
    private directiveParse: DirectiveParse

    constructor() {
        this.elementParse = new ElementParse();
        this.textParse = new TextParse();
        this.interPolationParse = new InterPolationParse();
        this.expressionParse = new ExpressionParse();
        this.commentParse = new CommentParse();
        this.attributeParse = new AttributeParse();
        this.directiveParse = new DirectiveParse();
    }

    getParseByType(typeId: NodeTypes): BaseParse {
        switch (typeId) {
            case NodeTypes.ELEMENT:
                return this.elementParse;
                break;
            case NodeTypes.TEXT:
                return this.textParse;
                break;
            case NodeTypes.INTERPOLATION:
                return this.interPolationParse;
                break;
            case NodeTypes.SIMPLE_EXPRESSION:
                return this.expressionParse;
                break;
            case NodeTypes.COMMENT:
                return this.commentParse;
                break;
            case NodeTypes.ATTRIBUTE:
                return this.attributeParse;
                break;
            case NodeTypes.DIRECTIVE:
                return this.directiveParse;
                break;
            default:
                console.error("unknown type", typeId)
                break;
        }
    }
}

export const parseManager = new ParseManager()