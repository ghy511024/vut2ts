"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutStream = void 0;
const StringWriter_1 = require("./StringWriter");
const TAB_WIDTH = 2;
const SPACES = "                          ";
class OutStream {
    constructor() {
        this.indent = 0;
        this.vertual_indent = 0;
        this.line = 1;
        this.writer = new StringWriter_1.StringWriter();
    }
    pushIndent() {
        this.vertual_indent += TAB_WIDTH;
        if (this.vertual_indent >= 0 && this.vertual_indent < SPACES.length) {
            this.indent = this.vertual_indent;
        }
    }
    write(str) {
        this.writer.write(str);
    }
    writeIn() {
        this.writer.write(SPACES.substring(0, this.indent));
    }
    writeLn(s) {
        this.line++;
        this.writer.writeln(s);
    }
    writeIl(s) {
        this.line++;
        this.writer.write(SPACES.substring(0, this.indent));
        this.writer.writeln(s);
    }
    writeMultiLn(s) {
        let index = 0;
        while ((index = s.indexOf('\n', index)) > -1) {
            this.line++;
            index++;
        }
        this.writer.write(s);
    }
    toString() {
        return this.writer.toString();
    }
}
exports.OutStream = OutStream;
//# sourceMappingURL=OutStream.js.map