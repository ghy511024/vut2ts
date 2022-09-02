<template>
  <li v-for="item in houseList" class="item" :logr="item.logr">
    <a class="link" :href="item.url" :onclick="'clickLog(\''+item.clickLog+'\')'">
      <div class="pic" :bg-src="item.picUrl">
        <div class="icon-wrap">
          <i v-if="item.quanJing" class="icon-vr-wrap"><i class="icon-vr-gif"></i></i>
          <i v-if="item.shiPin" class="icon-vedio"></i>
        </div>
        <i v-if="item.shiKan" style="background-image:url(https://wos.58cdn.com.cn/cDazYxWcDHJ/picasso/54h2c23n.png)"
           class="icon-shikan"></i>
      </div>

      <div class="desc">
        <p class="title" :class="{'title-line2':cateId==15&&(!item.tagsV2||item.tagsV2.length==0)}">{{ item.title }}</p>
        <p class="place">{{ item.address }}</p>
        <p v-if="item.type=='3'" class="plant-address">{{ item.address }}</p>
        <p v-if="item.type!='3'" class="tips">
          <span v-if="item.anXuan" class="tag anxuan">安选</span>
          <span v-if="item.shiPai" class="tag anxuan-photograph">
                            <span class="anxuan">安选</span>
                            <span class="photo">实拍</span>
          </span>
          <span class="tag" v-for="tag in item.tagsV2"
                :style="{color:tag.textColor,  'border-color':tag.borderColor, 'background-color':tag.bgColor}"
          >
                       {{ tag.title }}
          </span>
        </p>

        <p class=" price">
          <b>{{ item.priceVO.num }}</b>{{ item.priceVO.num != '面议' ? item.priceVO.unit : '' }}
          <span class="area">{{ item.mianJi }}㎡</span>
        </p>
      </div>
    </a>
  </li>
</template>

<script lang="ts">
import {House} from "../bean/House"

let x: number = 123;
export default {
  setup(ctx: {
    cateId: number
  }, houseList: House[]) {
    return {
      houseList: houseList,
      cateId: ctx["cateId"]
    };
  },
};
</script>