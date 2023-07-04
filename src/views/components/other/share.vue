<template>
  <n-space align="center">
    <span>URL</span>
    <n-input :value="urlValue"/>
    <n-button type="primary" @click="copyUrl">拷贝URL</n-button>
    <n-popover trigger="hover" placement="bottom-start">
      <template #trigger>
        <n-button>生成二维码</n-button>
      </template>
      <vueQr :text="urlValue" :size="150" :margin="5" :logoSrc="logo" logoScale="0.4"></vueQr>
    </n-popover>
  </n-space>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import logo from '@/assets/logo.png'
  import vueQr from "vue-qr/src/packages/vue-qr.vue";
  import copy from 'copy-text-to-clipboard';
  import { useMessage } from 'naive-ui'
  const urlValue = ref('https://wushijiang.cn/vite-naive-admin');
  const message = useMessage();
  /**
   * 拷贝URL
   */
  const copyUrl = () => {
    try{
      copy(urlValue.value);
      message.success("分享成功！");
    }catch (err){
      message.error('分享失败！');
    }

  }
</script>