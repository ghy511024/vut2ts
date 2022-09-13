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
    const id = Date.now().toString();
    const scopeId = `data-v-${id}`;
    const script = (0, compiler_sfc_1.compileScript)(descriptor, { id: scopeId });
    const codeList = [];
    codeList.push((0, compiler_sfc_1.rewriteDefault)(script.content, "__sfc_main__"));
    codeList.push(`__sfc_main__.__scopeId='${scopeId}'`);
    const template = (0, compiler_sfc_1.compileTemplate)({
        source: descriptor.template.content,
        filename: "main.vue",
        id: scopeId,
    });
    codeList.push(template.code);
    codeList.push(`__sfc_main__.render=render`);
    codeList.push(`export default __sfc_main__`);
    for (const styleBlock of descriptor.styles) {
        const styleCode = (0, compiler_sfc_1.compileStyle)({
            source: styleBlock.content,
            id,
            filename: "main.vue",
            scoped: styleBlock.scoped,
        });
        const styleDOM = `
      var el = document.createElement('style')
      el.innerHTML =  \`${styleCode.code}\`
      document.body.append(el);
    `;
        codeList.push(styleDOM);
    }
    const code = codeList.join("\n");
    console.log(code);
}
start();
//# sourceMappingURL=t1.js.map