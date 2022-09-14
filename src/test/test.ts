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
import {TemplateGenerate} from "../genertor/TemplateGenertor";
import it from "node:test";
import * as path from "path";

const option = {
    main: {
        file: "./input-vue/main.vue",
        out: "./out-ts/Main.ts",
    },

};

(() => {
    // 相对于 npm script 的运行目录
    const file = fs.readFileSync(path.join(option.main.file));
    const {descriptor} = parse(file.toString());
    fs.writeFileSync('haha.json', JSON.stringify(descriptor.template.ast, null, 2))
    const generate = new TemplateGenerate(descriptor);
    let htmlStr = generate.main();
    fs.writeFileSync(path.join(option.main.out), htmlStr)
    // console.log(htmlStr)
})()
