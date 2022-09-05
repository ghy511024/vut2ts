<template>
  <div class="xixi" v-if="isTrue" v-for="item in array">{{ item }}</div>
  <div class="haha" v-else-if="isTrue"></div>
  <div class="hehe" v-else="isTrue">
    666666666
  </div>
  <div v-for="item in array">123123</div>
  <div :message="message">5555555555</div>
  <div :class="{
    name:isTrue,
    name2:123,
    name2:123,
    isghy:ghy=='123',
  }">ccc
  </div>
</template>

<script lang="ts">
export default {
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
</script>
