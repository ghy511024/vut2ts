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
import {House} from "../bean/House"

const _tmp = {
    setup(ctx: {
        cateId: number
    }, houseList: House[]) {
        return {
            houseList: houseList,
            cateId: ctx["cateId"]
        };
    },
};

export default {
    ghyFun: fun,
    setup(ctx: {
        cateId: number
    }, houseList: House[]) {
        // @ts-ignore
        let data = _tmp.setup(...arguments);
        Object.assign(this, data);
    },
    toString() {
        let str = `  ${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item']
            }
            this.ghyFun('houseList', this).forEach(item => {
                this['item'] = item;
                str += `<li class='item'>    <a class='link'>      <div class='pic'>        <div class='icon-wrap'>          ${(() => {
                    if (this.ghyFun('item.quanJing', this)) {
                        return `<i class='icon-vr-wrap'><i class='icon-vr-gif'></i></i>`
                    }
                    return ''
                })()}
          ${(() => {
                    if (this.ghyFun('item.shiPin', this)) {
                        return `<i class='icon-vedio'></i>`
                    }
                    return ''
                })()}
        </div>
        ${(() => {
                    if (this.ghyFun('item.shiKan', this)) {
                        return `<i style='background-image:url(https://wos.58cdn.com.cn/cDazYxWcDHJ/picasso/54h2c23n.png)' class='icon-shikan'></i>`
                    }
                    return ''
                })()}
      </div>

      <div class='desc'>        <p class='title'>${this.ghyFun('item.title', this)}</p>
        <p class='place'>${this.ghyFun('item.address', this)}</p>
        ${(() => {
                    if (this.ghyFun('item.type=="3"', this)) {
                        return `<p class='plant-address'>${this.ghyFun('item.address', this)}</p>`
                    }
                    return ''
                })()}
        ${(() => {
                    if (this.ghyFun('item.type!="3"', this)) {
                        return `<p class='tips'>          ${(() => {
                            if (this.ghyFun('item.anXuan', this)) {
                                return `<span class='tag anxuan'>安选</span>`
                            }
                            return ''
                        })()}
          ${(() => {
                            if (this.ghyFun('item.shiPai', this)) {
                                return `<span class='tag anxuan-photograph'>                            <span class='anxuan'>安选</span>
                            <span class='photo'>实拍</span>
          </span>`
                            }
                            return ''
                        })()}
          ${(() => {
                            var str = "";
                            let _tmpItem;
                            if (this['tag']) {
                                _tmpItem = this['tag']
                            }
                            this.ghyFun('item.tagsV2', this).forEach(tag => {
                                this['tag'] = tag;
                                str += `<span class='tag'>                       ${this.ghyFun('tag.title', this)}
          </span>`
                            });
                            this['tag'] = _tmpItem;
                            return str
                        })()}

        </p>`
                    }
                    return ''
                })()}

        <p class='price'>          <b>${this.ghyFun('item.priceVO.num', this)}</b>${this.ghyFun('item.priceVO.num != "面议" ? item.priceVO.unit : ""', this)}
          <span class='area'>${this.ghyFun('item.mianJi', this)}㎡</span>
        </p>
      </div>
    </a>
  </li>`
            });
            this['item'] = _tmpItem;
            return str
        })()}

`
        return str
    }
};
