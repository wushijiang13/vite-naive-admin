<template>
  <div>
    <n-space class="nolayout-box" align="center">
      <n-button text @click="goHome">
        <template #icon>
          <n-icon>
            <ArrowLeft24Regular />
          </n-icon>
        </template>
        返回首页
      </n-button>
      <n-divider vertical />
      <span class="nolayout-title">无框</span>
    </n-space>

    <n-alert title="Success 类型" type="success">
      无框示例
    </n-alert>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ArrowLeft24Regular } from '@vicons/fluent'
  import { menuOption } from '@components/layout/config/layout.config'
  import { useStore } from '@pinia'

  const store:any = useStore();
  const goHome = () => {
    let overivew = (menuOption as any).value[0]
    store.menuAction(overivew.key,overivew);
  }
</script>
<style scoped>
.nolayout-box{
  margin: 20px 20px;
  margin-right: 0px;
}
.nolayout-title{
  font-size: 20px;
}
</style>