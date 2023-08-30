<template>
  <div>
    <iframes :url="urls"></iframes>
  </div>
</template>

<script setup lang="ts">
  import { ref,Ref,watchEffect} from 'vue';
  import { useRoute } from "vue-router";
  import iframes from '@components/iframe/index.vue';
  const route = useRoute();
  let urls:Ref<String> = ref('');

  watchEffect(()=>{
    urls.value = route.query.url;
  })

</script>
<style scoped>

</style>