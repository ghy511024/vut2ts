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

const option = {
    main: {
        file: "./input-vue/main.vue",
        out: "./out-ts/Main.ts",
    },
    download: {
        file: "E:\\develop\\workespace\\58git_site\\58_web_js\\sydc-m-site\\src\\components-wuba\\DownloadAppCard\\template\\DownloadTemp.vue",
        out: "E:\\develop\\workespace\\58git_site\\58_web_js\\sydc-m-site\\src\\components-wuba\\DownloadAppCard\\template\\DownloadTemp.ts",
    },
    ajkDownload: {
        file: "E:\\develop\\workespace\\58git_site\\ajk_web_js\\m-ajk-business\\src\\component\\download\\template\\DownloadBanner.vue",
        out: "E:\\develop\\workespace\\58git_site\\ajk_web_js\\m-ajk-business\\src\\component\\download\\template\\DownloadBanner.ts",
    }

};

(() => {
    // 相对于 npm script 的运行目录
    const file = fs.readFileSync(path.join(option.ajkDownload.file));
    const {descriptor} = parse(file.toString());
    fs.writeFileSync('haha.json', JSON.stringify(descriptor.template.ast, null, 2))
    const generate = new TemplateGenerate(descriptor);
    let htmlStr = generate.main();
    fs.writeFileSync(path.join(option.ajkDownload.out), htmlStr)
    // console.log(htmlStr)
})()
