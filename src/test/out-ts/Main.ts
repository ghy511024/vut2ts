let fun = new Function("str", "data", `
return (function (str, data) {
var tmpData=data||{}
        var tmp="";
            with (tmpData) {
                try {
                    tmp = eval(str);
                } catch (e) {
                    console.warn(str +"not exits in data",data,"\\n",new Error(e));
                }
            }
            return  tmp
        }
    )(str, data);
`)
const _tmp= {
  name: "Main",
  setup(obj) {
    return {
      isTrue: obj["isTrue"],
      array: obj["array"],
      message: obj["message"]
    };
  },
};

export default {
    ghyFun: fun,
    setup(obj) {
        // @ts-ignore
        let data = _tmp.setup(...arguments);
        Object.assign(this, data);
    },
    toString() {
        let str = `  ${(()=>{if(this.ghyFun('isTrue',this)){return `<div class='xixi'></div>`
}return ''})()}
  <div class='haha'>    666666666
  </div>
`
        return str
    }
};
