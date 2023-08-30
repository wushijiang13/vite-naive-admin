<template>
  <div>
    <n-grid x-gap="12" y-gap="12" :cols="3">
      <n-gi>
        <n-descriptions bordered label-placement="top" class="desc-box">
          <n-descriptions-item label="动态标题">
            <n-space>
              <n-button @click="updateTitle('啊哈哈哈')">标题更改为啊哈哈哈</n-button>
              <n-button @click="updateTitle('Vite-Naive-Admin')">还原为默认标题</n-button>
            </n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-gi>
      <n-gi>
        <n-descriptions bordered label-placement="top" class="desc-box">
          <n-descriptions-item label="动态徽章">
            <n-space>
              <n-button @click="addBadgeNum">徽章+1</n-button>
              <n-button @click="clearBadyeNum">徽章清零</n-button>
              <n-button @click="hiddenBadgeNum">移除徽章</n-button>
            </n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-gi>
      <n-gi>
        <n-descriptions bordered label-placement="top" class="desc-box">
          <n-descriptions-item label="动态图标">
            <n-space>
              <n-button @click="updateIcon()">修改图标</n-button>
            </n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-gi>
      <n-gi>
        <n-descriptions bordered label-placement="top" class="desc-box">
          <n-descriptions-item label="动态高亮菜单">
            <n-space>
              <n-button @click="updateMenuAction('notice')">修改高亮菜单至通知组件</n-button>
              <n-button @click="updateMenuAction('dynamicMeta')">还原默认高亮菜单</n-button>
            </n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-gi>
    </n-grid>

  </div>
</template>

<script setup lang="ts">
  import { useStore } from "@pinia";
  import {useMessage} from "naive-ui";

  const message = useMessage();
  const store = useStore();
  const updateTitle = (title:string) => {
    document.title = title;
  }
  const updateIcon = () => {
    message.info('待完善');
  }
  const resetTitle = () => {
    document.title = import.meta.env.VITE_TITLE;
  }
  const addBadgeNum = () => {
    store.$patch({
      badgeValue:store.badgeValue+1,
    })
  }
  const clearBadyeNum = () => {
    store.$patch({
      badgeValue: 1
    })
  }
  const hiddenBadgeNum = () => {
    store.$patch({
      badgeValue: 0
    })
  }
  const updateMenuAction = (key:string) => {
    store.$patch({
      menuValue:key,
    })
  }
</script>

<style scoped>
</style>