/**
 * create by ghy 2022/9/22 14:10
 * @desc
 */
import {House} from "../input-vue/Demo2";
import Demo2 from "../input-vue/Demo2";

const data: House[] = [
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
]
Demo2.setup(null, data);
let str = Demo2.toString();
console.log(str)