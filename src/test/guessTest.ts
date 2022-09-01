/**
 * create by ghy 2022/9/1 11:56
 * @desc
 */

import {
    parse,

} from "@vue/compiler-sfc";

import * as fs from "fs";
import {TemplateGenerate} from "../TemplateGenertor";
import it from "node:test";
import * as path from "path";

(() => {
    // 相对于 npm script 的运行目录
    const file = fs.readFileSync(path.join(__dirname,"./input-vue/GuessYouLike.vue"));
    const {descriptor} = parse(file.toString());
    const generate = new TemplateGenerate(descriptor);
    let htmlStr = generate.main();
    fs.writeFileSync(path.join(__dirname,'/out-ts/GuessYouLike.ts'), htmlStr)
    // console.log(htmlStr)
})()