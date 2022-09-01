/**
 * create by ghy 2022/8/31 11:35
 * @desc
 */
export class StringWriter {
    lineSeparator = "\n";
    str: string

    constructor() {
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