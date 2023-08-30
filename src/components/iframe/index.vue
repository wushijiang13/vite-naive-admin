<template>
  <div class="iframe">
    <iframe :src="props.url" class="iframe-box" frameborder="0" scrolling="no"/>
  </div>
</template>

<script setup lang="ts">
  import {defineProps} from "vue";

  let props:any = defineProps({
    url:{
      type:String,
      default:'',
    },
  })

</script>

<style scoped>
.iframe-box{
  width: 100%;
  height: 100vh;
}
</style>