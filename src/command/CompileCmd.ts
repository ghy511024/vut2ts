import fs from "fs";
import path from "path";
import {parse} from "@vue/compiler-sfc";
import {TemplateGenerate} from "../TemplateGenertor";

/**
 * create by ghy 2022/9/9 17:36
 * @desc
 */
export class Compile {

    /**
     * @param sourceFile vue 源文件文件名
     * @param outFile 输出ts 文件
     * */
    compile(sourceFile: string, outFile: string) {
        const file = fs.readFileSync(sourceFile);
        const {descriptor} = parse(file.toString());
        const generate = new TemplateGenerate(descriptor);
        let htmlStr = generate.main();
        fs.writeFileSync(outFile, htmlStr)
    }

    

}