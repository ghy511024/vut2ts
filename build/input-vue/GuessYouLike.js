"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
`);
const _tmp = {
    data() {
        return {};
    },
    methods: {
        isLine2(item) {
            if (this.cateId == 15) {
            }
            return false;
        }
    },
    setup(ctx, houseList) {
        return {
            houseList: houseList,
            cateId: ctx["cateId"]
        };
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
        let str = `  ${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item'];
            }
            this.expData('houseList', this).forEach(item => {
                this['item'] = item;
                str += `<li>    <a class='link' href="${this.expData('item.url', this)}" onclick="${this.expData('"clickLog(\""+item.clickLog+"\")"', this)}">      <div class='pic' bg-src="${this.expData('item.picUrl', this)}">        <div class='icon-wrap'>          ${(() => {
                    if (this.expData('item.quanJing', this)) {
                        return `<i><i class='icon-vr-gif'></i></i>`;
                    }
                    return '';
                })()}

          ${(() => {
                    if (this.expData('item.shiPin', this)) {
                        return `<i></i>`;
                    }
                    return '';
                })()}

        </div>
        ${(() => {
                    if (this.expData('item.shiKan', this)) {
                        return `<i></i>`;
                    }
                    return '';
                })()}

      </div>

      <div class='desc'>        <p class="${(this.expData('true', this) ? 'title' : '') + ' ' + (this.expData('isLine2(item)', this) ? '"title-line2"' : '')}">${this.expData('item.title', this)}</p>
        <p class='place'>${this.expData('item.address', this)}</p>
        ${(() => {
                    if (this.expData('item.type=="3"', this)) {
                        return `<p>${this.expData('item.address', this)}</p>`;
                    }
                    else {
                        return `<p>          ${(() => {
                            if (this.expData('item.anXuan', this)) {
                                return `<span>安选</span>`;
                            }
                            return '';
                        })()}

          ${(() => {
                            if (this.expData('item.shiPai', this)) {
                                return `<span>                 <span class='anxuan'>安选</span><span class='photo'>实拍</span>
          </span>`;
                            }
                            return '';
                        })()}

          ${(() => {
                            var str = "";
                            let _tmpItem;
                            if (this['tag']) {
                                _tmpItem = this['tag'];
                            }
                            this.expData('item.tagsV2', this).forEach(tag => {
                                this['tag'] = tag;
                                str += `<span>                       ${this.expData('tag.title', this)}
          </span>`;
                            });
                            this['tag'] = _tmpItem;
                            return str;
                        })()}
        </p>`;
                    }
                    return '';
                })()}

        <p class='price'>          <b>${this.expData('item.priceVO.num', this)}</b>${this.expData('item.priceVO.num!="面议"?item.priceVO.unit:""', this)}
          <span class='area'>${this.expData('item.mianJi', this)}㎡</span>
        </p>
      </div>
    </a>
  </li>`;
            });
            this['item'] = _tmpItem;
            return str;
        })()}
  <div name="${this.expData('xxx', this)}"></div>
`;
        return str;
    }
};
//# sourceMappingURL=GuessYouLike.js.map