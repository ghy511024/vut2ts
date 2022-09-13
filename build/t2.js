"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_sfc_1 = require("@vue/compiler-sfc");
const fs = __importStar(require("fs"));
function start() {
    const file = fs.readFileSync("./src/main.vue");
    const { descriptor } = (0, compiler_sfc_1.parse)(file.toString());
    fs.writeFileSync('haha.json', JSON.stringify(descriptor.template.ast, null, 2));
    console.log("code", descriptor.template.ast);
    const codeList = [];
    const template = (0, compiler_sfc_1.compileTemplate)({
        source: descriptor.template.content,
        filename: "main.vue",
        id: "1",
    });
}
start();
//# sourceMappingURL=t2.js.map