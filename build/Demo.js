"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fun = new Function("str", "data", `return (function (str, data) {var tmpData=data||{}; var tmp=""; with (tmpData) { try { tmp = eval(str); } catch (e) { console.warn(str +"not exits in data","\\n",new Error(e)); } } return tmp; } )(str, data);`);
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
exports.default = {
    expData: fun,
    setup(obj) {
        let data = {};
        if (typeof _tmp["data"] == "function") {
            data = _tmp["data"]();
        }
        let methods = {};
        if (typeof _tmp["methods"] == "object") {
            methods = _tmp["methods"];
        }
        let setupData = _tmp.setup(...arguments);
        Object.assign(this, data, setupData, methods);
    },
    toString() {
        let str = `  ${(() => {
            if (this.expData('isTrue', this)) {
                var str = "";
                let _tmpItem;
                if (this['item']) {
                    _tmpItem = this['item'];
                }
                this.expData('array', this).forEach(item => {
                    this['item'] = item;
                    str += `<div>${this.expData('item', this)}</div>`;
                });
                this['item'] = _tmpItem;
                return str;
            }
            else if (this.expData('isTrue', this)) {
                return `<div></div>`;
            }
            else
                (this.expData('isTrue', this));
            {
                return `<div>    666666666
  </div>`;
            }
            return '';
        })()}

  ${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item'];
            }
            this.expData('array', this).forEach(item => {
                this['item'] = item;
                str += `<div>123123</div>`;
            });
            this['item'] = _tmpItem;
            return str;
        })()}
  <div message="${this.expData('message', this)}">5555555555</div>
  <div class="${(this.expData('isTrue', this) ? 'name' : '') + ' ' + (this.expData('123', this) ? 'name2' : '') + ' ' + (this.expData('123', this) ? 'name2' : '') + ' ' + (this.expData('ghy=="123"', this) ? 'isghy' : '')}">ccc
  </div>
`;
        return str;
    }
};
//# sourceMappingURL=Demo.js.map