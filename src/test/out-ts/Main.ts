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
            ghy: '123',
            array: obj["array"],
            message: obj["message"]
        };
    },
};

export default {
    ghyFun: fun,
    setup(obj) {
        let data = {}
        if (typeof _tmp["data"] == "function") {
            data = _tmp["data"]();
        }
        // @ts-ignore
        let setupData = _tmp.setup(...arguments);
        Object.assign(this, data, setupData);
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
                    str += `<div>${this.ghyFun('item', this)}</div>`
                });
                this['item'] = _tmpItem;
                return str;
            } else if (this.ghyFun('isTrue', this)) {
                return `<div></div>`
            } else (this.ghyFun('isTrue', this))
            {
                return `<div>    666666666
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
  <div message="${this.ghyFun('message', this)}">5555555555</div>
  <div class="${(this.ghyFun('isTrue', this) ? 'name' : '') + ' ' + (this.ghyFun('123', this) ? 'name2' : '') + ' ' + (this.ghyFun('123', this) ? 'name2' : '') + ' ' + (this.ghyFun('ghy=="123"', this) ? 'isghy' : '')}">ccc
  </div>
`
        return str
    }
};
