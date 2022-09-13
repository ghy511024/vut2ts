"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const TemplateGenertor_1 = require("./TemplateGenertor");
const File_1 = require("./bean/File");
class Main {
    constructor(cwd, file, outRoot) {
        this.cwd = cwd;
        this.file = file || "";
        this.outRoot = outRoot;
    }
    compileOne(sourceFile, outFile) {
        const file = fs_1.default.readFileSync(sourceFile);
        const { descriptor } = (0, compiler_sfc_1.parse)(file.toString());
        const generate = new TemplateGenertor_1.TemplateGenerate(descriptor);
        let htmlStr = generate.main();
        fs_1.default.writeFileSync(outFile, htmlStr);
    }
    compile() {
        let _f = this.file;
        if (!fs_1.default.existsSync(_f)) {
            _f = path_1.default.join(this.cwd, this.file);
        }
        if (fs_1.default.existsSync(_f)) {
            let files = this.getFile(_f);
            files.forEach((file) => {
                const outFileName = file.fileName.replace(/\.vue$/, '.ts');
                this.compileOne(path_1.default.join(this.cwd, file.fullPath), path_1.default.join(this.cwd, file.fileDir, outFileName));
            });
        }
    }
    getFile(filePath) {
        let files = [];
        this.scanFile(filePath, (file) => {
            files.push(file);
        });
        return files;
    }
    scanFile(dir, callBack) {
        fs_1.default.readdirSync(dir).forEach((file) => {
            if (!/node_modules/.test(file)) {
                var pathname = path_1.default.join(dir, file);
                if (fs_1.default.statSync(pathname).isDirectory()) {
                    this.scanFile(pathname, callBack);
                }
                else {
                    if (/\.vue$/.test(file)) {
                        const tmpFile = new File_1.File();
                        tmpFile.fileDir = dir;
                        tmpFile.fileName = file;
                        tmpFile.fullPath = pathname;
                        callBack(tmpFile);
                    }
                }
            }
        });
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map