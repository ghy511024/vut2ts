import fs from "fs";
import path from "path";
import {parse} from "@vue/compiler-sfc";
import {TemplateGenerate} from "./TemplateGenertor";
import {File} from "./bean/File";

/**
 * create by ghy 2022/9/13 10:31
 * @desc
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
    }

    compile() {
        let _f = this.file
        if (!fs.existsSync(_f)) {
            _f = path.join(this.cwd, this.file);
        }
        if (fs.existsSync(_f)) {
            let files = this.getFile(_f)
            files.forEach((file: File) => {
                // console.log("haha", file.fullPath)
                const outFileName = file.fileName.replace(/\.vue$/, '.ts')
                this.compileOne(path.join(this.cwd, file.fullPath), path.join(this.cwd, file.fileDir, outFileName))
            })
        }

    }

    getFile(filePath) {
        let files = [];
        this.scanFile(filePath, (file) => {
            files.push(file);
            // console.log("file", JSON.stringify(file))
        })
        return files;

    }

    scanFile(dir, callBack: (file: File) => void) {
        fs.readdirSync(dir).forEach((file) => {
            if (!/node_modules/.test(file)) {
                // console.log('dir:', dir)
                var pathname = path.join(dir, file);
                if (fs.statSync(pathname).isDirectory()) {
                    this.scanFile(pathname, callBack);
                } else {
                    if (/\.vue$/.test(file)) {
                        const tmpFile = new File();
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