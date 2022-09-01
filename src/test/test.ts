/**
 * create by ghy 2022/8/23 17:10
 * @desc
 */

import {
    parse,
    compileScript,
    rewriteDefault,
    compileTemplate,
    compileStyle,

} from "@vue/compiler-sfc";

import * as fs from "fs";
import {TemplateGenerate} from "../TemplateGenertor";
import it from "node:test";
import * as path from "path";

(() => {
    // 相对于 npm script 的运行目录
    const file = fs.readFileSync(path.join(__dirname,"./input-vue/main.vue"));
    const {descriptor} = parse(file.toString());
    fs.writeFileSync('haha.json', JSON.stringify(descriptor.template.ast, null, 2))
    const generate = new TemplateGenerate(descriptor);
    let htmlStr = generate.main();
    fs.writeFileSync(path.join(__dirname,'/out-ts/Main.ts'), htmlStr)
    // console.log(htmlStr)
})()
