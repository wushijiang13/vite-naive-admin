<template>
  <div>
    <iframes :url="urls"></iframes>
  </div>
</template>

<script setup lang="ts">
  import {  ref } from 'vue';
  import iframes from '@components/iframe/index.vue';

  let urls = ref('https://www.bilibili.com/');
</script>
<style scoped>

</style>