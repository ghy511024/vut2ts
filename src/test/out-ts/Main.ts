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
const _tmp = {
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
        let str = `  ${(() => {
            if (this.ghyFun('isTrue', this)) {
                var str = "";
                let _tmpItem;
                if (this['item']) {
                    _tmpItem = this['item']
                }
                this.ghyFun('array', this).forEach(item => {
                    this['item'] = item;
                    str += `<div class='xixi'>${this.ghyFun('item', this)}</div>`
                });
                this['item'] = _tmpItem;
                return str;
            } else if (this.ghyFun('isTrue', this)) {
                return `<div class='haha'></div>`
            } else (this.ghyFun('isTrue', this))
            {
                return `<div class='hehe'>    666666666
  </div>`
            }
            return ''
        })()}

  ${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item']
            }
            this.ghyFun('array', this).forEach(item => {
                this['item'] = item;
                str += `<div>123123</div>`
            });
            this['item'] = _tmpItem;

            return str
        })()}
  <div>5555555555</div>
`
        return str
    }
};
