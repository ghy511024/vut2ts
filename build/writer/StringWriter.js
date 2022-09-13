"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringWriter = void 0;
class StringWriter {
    constructor() {
        this.lineSeparator = "\n";
        this.str = "";
    }
    writeln(x) {
        if (x != null) {
            this.write(x);
        }
        this.write(this.lineSeparator);
    }
    write(s) {
        if (s == null) {
            s = "";
        }
        this.str += s;
    }
    toString() {
        return this.str;
    }
}
exports.StringWriter = StringWriter;
//# sourceMappingURL=StringWriter.js.map