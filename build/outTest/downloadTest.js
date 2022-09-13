"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Download_1 = __importDefault(require("../input-vue/Download"));
const appinfo_1 = require("../bean/data/appinfo");
Download_1.default.setup({ isIOS: true }, appinfo_1.appInfo);
console.log(Download_1.default.toString());
//# sourceMappingURL=downloadTest.js.map