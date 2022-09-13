#!/usr/bin/env node
'use strict';
const cwd = process.cwd();
const {Main} = require("../build/Main");
const main = new Main(cwd, process.argv[2], process.argv[2])
main.compile();