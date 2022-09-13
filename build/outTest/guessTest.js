"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuessYouLike_1 = __importDefault(require("../out-ts/GuessYouLike"));
const houseData_1 = require("../bean/houseData");
GuessYouLike_1.default.setup({ cateId: 14 }, houseData_1.houseList);
console.log("xxx:", GuessYouLike_1.default.toString());
//# sourceMappingURL=guessTest.js.map