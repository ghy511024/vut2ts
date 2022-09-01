/**
 * create by ghy 2022/8/23 15:30
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

function start() {
    // 相对于 npm script 的运行目录
    const file = fs.readFileSync("./src/main.vue");

    // 用 @vue/compiler-sfc 进行解析，解析出 SFC 的每个块
    const {descriptor} = parse(file.toString());
    // console.log(descriptor);
    fs.writeFileSync('haha.json', JSON.stringify(descriptor.template.ast, null, 2))
    console.log("code", descriptor.template.ast)

    const codeList = [];


    // 编译模板，转换成 render 函数
    const template = compileTemplate({
        source: descriptor.template!.content,
        filename: "main.vue", // 用于错误提示
        id: "1",
    });

    // console.log("code", template.code)
    // codeList.push(template.code);
}

start();