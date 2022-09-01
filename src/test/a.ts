/**
 * create by ghy 2022/8/31 15:53
 * @desc
 */
const array = [1, 2, 3, 4];
const isTrue = true;
const s = `${(()=>{if(isTrue){return `<div class='if-else if'><img src='sdf.jpg' alt=''></img></div>`
}})()}${(()=>{
    var str = "";array.forEach((item,index)=>{
        str += `<div class='for'>item</div>`
    }); return str})()}
<div class='message'>message</div>`
console.log(s)