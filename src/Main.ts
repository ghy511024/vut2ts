import fs from "fs";
import path from "path";
import {parse} from "@vue/compiler-sfc";
import {TemplateGenerate} from "./genertor/TemplateGenertor";
import {File} from "./bean/File";

/**
 * create by ghy 2022/9/13 10:31
 * @desc 1
 */
export class Main {
    cwd: string
    file: string
    outRoot: string

    constructor(cwd: string, file: string, outRoot: string) {
        this.cwd = cwd;
        this.file = file || "";
        this.outRoot = outRoot;
    }


    compileOne(sourceFile: string, outFile: string) {
        const file = fs.readFileSync(sourceFile);
        const {descriptor} = parse(file.toString());
        const generate = new TemplateGenerate(descriptor);
        let htmlStr = generate.main();
        fs.writeFileSync(outFile, htmlStr)
        console.log("compile", sourceFile, "success")
    }

    compile() {
        let _f = this.file
        if (!fs.existsSync(_f)) {
            _f = path.join(this.cwd, this.file);
        }

        if (fs.existsSync(_f)) {
            let files = this.getFile(this.file)
            files.forEach((file: File) => {
                const outFileName = file.fileName.replace(/\.vue$/, '.ts')
                this.compileOne(file.fullPath, path.join(file.fileDir, outFileName))
            })
        } else {
            throw new Error("file not exits: " + _f);
        }
    }

    getFile(filePath) {
        let files = [];
        this.scanFile(filePath, (file) => {
            files.push(file);
        })
        return files;

    }

    scanFile(dir, callBack: (file: File) => void) {
        if (fs.statSync(dir).isDirectory()) {

            fs.readdirSync(dir).forEach((file) => {
                if (!/node_modules/.test(file)) {
                    // console.log('dir:', dir)
                    var pathname = path.join(dir, file);
                    if (fs.statSync(pathname).isDirectory()) {
                        this.scanFile(pathname, callBack);
                    } else {
                        if (/\.vue$/.test(file)) {
                            const tmpFile = new File();
                            tmpFile.fileDir = path.join(this.cwd, dir);
                            tmpFile.fileName = file;
                            tmpFile.fullPath = path.join(this.cwd, pathname);
                            callBack(tmpFile);
                        }
                    }
                }
            });
        } else {
            const tmpFile = new File();
            const fullPath = path.join(this.cwd, dir)
            const fileName = dir.slice(dir.lastIndexOf('/') + 1, dir.length);
            tmpFile.fileDir = path.dirname(fullPath);
            tmpFile.fileName = fileName;
            tmpFile.fullPath = fullPath;
            callBack(tmpFile);
        }
    }
}