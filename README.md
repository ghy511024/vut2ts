> vue template to es6 string

![](http://pic1.58cdn.com.cn/fangfe/wiki/n_v2cfe43d756caf49a5bc6f8b8198406ada.png)

### install
```shell
npm i @wb/vue2ts -g
```

### use
```shell
# single file
vue2ts ./src/demo.vue
# directory
vue2ts ./src
```

### demo

* 1 Demo.vue
```shell
 <template>
  <ul>
    <li v-for="item in houseList" class="houseItem" :class="{'xixi':item.id==123}">
      <h1 :houseId="item.id">{{ item.title }}</h1>
      <img v-if="item.img" :src="item.img">
    </li>
  </ul>
</template>

<script lang="ts">
export class House {
  img: string
  title: string
  id: number
}

export default {
  setup(ctx, houseList: House[]) {
    return {houseList};
  },
};
</script>

 ```
* 2 compile (Demo.vue => Demo.ts)
```shell
vue2ts ./demo.vue
```
* 3 Demo.ts

```ts
let fun = new Function("str", "data", `return (function (str, data) {var tmpData=data||{}; var tmp=""; with (tmpData) { try { tmp = eval(str); } catch (e) { console.warn(str +"not exits in data","\\n",new Error(e)); } } return tmp; } )(str, data);`)

export class House {
    img: string
    title: string
    id: number
}

const _tmp = {
    setup(ctx, houseList: House[]) {
        return {houseList};
    },
};

export default {
    expData: fun,
    setup(ctx, houseList: House[]) {
        let data = {}
        if (typeof _tmp["data"] == "function") {
            data = _tmp["data"]();
        }
        let methods = {}
        if (typeof _tmp["methods"] == "object") {
            methods = _tmp["methods"]
        }
        // @ts-ignore
        let setupData = _tmp.setup(...arguments);
        Object.assign(this, data, setupData, methods);
    },
    toString() {
        let str = `<ul>${(() => {
            var str = "";
            let _tmpItem;
            if (this['item']) {
                _tmpItem = this['item']
            }
            this.expData('houseList', this).forEach(item => {
                this['item'] = item;
                str += `<li class="${(this.expData('true', this) ? 'houseItem' : '') + ' ' + (this.expData('item.id==123', this) ? '"xixi"' : '')}"><h1 houseId="${this.expData('item.id', this)}">${this.expData('item.title', this)}</h1>
      ${(() => {
                    if (this.expData('item.img', this)) {
                        return `<img src="${this.expData('item.img', this)}"/>`
                    }
                    return ''
                })()}

    </li>` });
            this['item'] = _tmpItem;
            return str
        })()}
  </ul>
`
        return str
    }
};

```
* 4 use Demo.ts
```ts
// test.ts
import {House} from "./Demo";
import Demo2 from "./Demo";

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

```
output
```shell
<ul>
    <li class="houseItem xixi"><h1 houseId="123">hello word</h1>
        <img src="http://xxx.com/a.png"/>
    </li>
    <li class="houseItem"><h1 houseId="456">nice vue2ts</h1>
        <img src="http://xxx.com/b.png"/>
    </li>
</ul>
```

