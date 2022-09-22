"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
let fun = new Function("str", "data", `return (function (str, data) {var tmpData=data||{}; var tmp=""; with (tmpData) { try { tmp = eval(str); } catch (e) { console.warn(str +"not exits in data","\\n",new Error(e)); } } return tmp; } )(str, data);`);
class House {
}
exports.House = House;
const _tmp = {
    setup(ctx, houseList) {
        return { houseList };
    },
};
exports.default = {
    expData: fun,
    setup(ctx, houseList) {
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
        let str = `  <ul>    ${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item'];
            }
            this.expData('houseList', this).forEach(item => {
                this['item'] = item;
                str += `<li class="${((this.expData('true', this) ? 'houseItem' : '') + ' ' + (this.expData('item.id==123', this) ? 'xixi' : '') + ' ' + (this.expData('true', this) ? 'haha' : '')).replace(/(^\s+|\s+$)/g, '')}">      <h1 houseId="${this.expData('item.id', this)}">${this.expData('item.title', this)}</h1>
      ${(() => {
                    if (this.expData('item.img', this)) {
                        return `<img src="${this.expData('item.img', this)}"/>`;
                    }
                    return '';
                })()}

    </li>`;
            });
            this['item'] = _tmpItem;
            return str;
        })()}
  </ul>
`;
        return str;
    }
};
//# sourceMappingURL=Demo2.js.map