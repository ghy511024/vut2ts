"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Demo2_1 = __importDefault(require("../input-vue/Demo2"));
const data = [
    {
        img: "http://xxx.com/a.png",
        title: "hello word",
        id: 123
    },
    {
        img: "http://xxx.com/b.png",
        title: "nice vue2ts",
        id: 456
    }
];
Demo2_1.default.setup(null, data);
let str = Demo2_1.default.toString();
console.log(str);
//# sourceMappingURL=demo2Test.js.map