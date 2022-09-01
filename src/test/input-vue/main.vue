<template>
  <div class="xixi" v-if="isTrue"></div>
  <div class="haha" v-else="isTrue">
    666666666
  </div>
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
