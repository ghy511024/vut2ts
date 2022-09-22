<template>
  <ul>
    <li v-for="item in houseList" class="houseItem" :class="{'xixi':item.id==123,haha:true}">
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
