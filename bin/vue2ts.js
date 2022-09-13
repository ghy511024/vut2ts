#!/usr/bin/env node
'use strict';
const cwd = process.cwd();
const {Main} = require("../build/Main");
const main = new Main(cwd, process.argv[2], process.argv[2])
if (!process.argv[2]) {
    console.error("Error: 需要指定编译文件或者文件名，eg: vue2ts src")
} else {
    main.compile();
}
