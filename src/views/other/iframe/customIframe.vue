<template>
  <div class="custom-iframe-box">
    <n-form :model="customInfo" :rules="rules">
      <n-form-item label="请输入跳转URL"  path="jumpUrl">
        <n-input v-model:value="customInfo.jumpUrl"></n-input>
      </n-form-item>
      <n-form-item label="请输入跳转后自动改名的Title" path="title">
        <n-input  v-model:value="customInfo.title"></n-input>
      </n-form-item>
    </n-form>
    <n-button type="primary"  @click="jumpIframe">
      查询
    </n-button>
  </div>
</template>

<script setup lang="ts">
    import { reactive } from "vue";
    import { useStore } from '@pinia';
    import {iframeView} from "@views";
    const store  = useStore();
    const customInfo = reactive({
      jumpUrl:'https://juejin.cn/user/2172290706442423/posts',
      title:'作者juejin'
    })
    const rules = {
      jumpUrl:{
        required:true,
        trigger:['blur','change'],
        message:"请输入跳转URL"
      },
      title:{
        required: true,
        trigger:['blur','change'],
        message:"请输入跳转后自动改名的Title"
      }
    }
    const jumpIframe = () => {
      let info = {
            label: customInfo.title,
            parendKey:"iframe",
            component:iframeView,
            url:customInfo.jumpUrl,
            isClose:true,
      }
      store.tabPushUrl(info);
    }
</script>
<style scoped>
.custom-iframe-box{
  width: 700px;
  margin: 0px auto;
}
</style>