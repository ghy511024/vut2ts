<template>
  <div class="xixi" v-if="isTrue" v-for="item in array">{{ item }}</div>
  <div class="haha" v-else-if="isTrue"></div>
  <div class="hehe" v-else="isTrue">
    666666666
  </div>
  <div v-for="item in array">123123</div>
  <div>5555555555</div>
</template>

<script lang="ts">
export default {
  name: "Main",
  setup(obj) {
    return {
      isTrue: obj["isTrue"],
      array: obj["array"],
      message: obj["message"]
    };
  },
};
</script>
