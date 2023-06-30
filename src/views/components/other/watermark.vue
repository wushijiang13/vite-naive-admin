<template>
  <n-watermark
      v-if="show"
      :content="content"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="284"
      :height="284"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
  />
  <n-space align="center">
    <n-switch v-model:value="show" />
    <n-button type="primary" @click="addCustomWater">添加自定义水印</n-button>
  </n-space>
  <n-modal
      v-model:show="showModal"
      preset="card"
      title="自定义水印"
      style="width: 360px">
    <n-input
        v-model:value="customValue"
        placeholder="请输入自定义水印内容"
    />
    <template #footer>
      <n-space :justify="'end'">
        <n-button  @click="closeModal">取消</n-button>
        <n-button type="primary" @click="customWater">打印</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import { cloneDeep } from 'lodash'
  const show = ref(false);
  const content = ref('vite-naive-admin');
  const showModal = ref(false);
  const customValue = ref('');

  const addCustomWater = () => {
    showModal.value = true;
  }
  const closeModal = () => {
    customValue.value = '';
    showModal.value = false;
  }
  const customWater = () => {
    showModal.value = false;
    content.value = cloneDeep(customValue.value);
    customValue.value = '';
  }
</script>

<style scoped>

</style>