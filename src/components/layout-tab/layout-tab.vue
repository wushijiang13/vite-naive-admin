<template>
  <div class="layout-tab">
    <n-tabs
        v-model:value="store.tabPageActive"
        @update:value="tabChange"
        type="card"
        closable
        :animated="false"
        @close="handleClose"
        :tabs-padding="props.tabsPadding"
    >
      <n-tab-pane
          v-for="page in store.tabPageList"
          :key="page.key"
          :tab="page.label"
          :name="page.key"
          display-directive="show:lazy"
          :closable="store.tabPageActive == page.key && page.isClose"
      >
        <div class="tab-pane-box" :style="props.paneStyle" >
          <keep-alive :exclude="store.excludePage" :max="10">
            <component v-if=" store.refresh && store.tabPageActive == page.key" :is="page.component"></component>
          </keep-alive>
        </div>
        <template #tab>
          <div class="tab-box">
            <n-icon v-if="page.icon" size="16" :component="page.icon"/>
            <span class="tab-span">{{page.label}}</span>
          </div>
        </template>
      </n-tab-pane>
      <template #suffix>
        <div class="suffix-box" :style="props.suffixStyle">
          <layoutTabClose/>
        </div>
      </template>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, defineEmits,defineProps } from 'vue';
import { useStore } from "@pinia";
import layoutTabClose from '@components/layout-tab-close/layout-tab-close.vue'
import { useLoadingBar } from 'naive-ui'
import {router} from "@/config/router/router";
const store = useStore();
const emits = defineEmits(['tabChange'])
const props = defineProps(['tabsPadding','paneStyle','suffixStyle'])
const loadingBar= useLoadingBar();

const handleClose = (name: string | number) => {
  let tabPageList = store.tabPageList;
  store.TabPageListDelete(name);
  store.$patch({
    tabPageActive:tabPageList[tabPageList.length-1].key
  })
}
/**
 * tab点击同步路由
 * @param value
 */
const tabChange = (value: string | number) => {
  store.$patch({
    menuValue:store.tabPageActive,
  })
  emits('tabChange')
  router.push({name:(value as string)});
}

</script>
<style scoped>
.tab-pane-box {
  padding: 0px 20px 20px 20px;
}
.tab-box{
  height: 26px;
  display: flex;
  align-items: center;
  line-height: 26px;
}
.tab-span{
  margin-left: 5px;
}
</style>
<style>
.layout-tab .n-tabs-nav,.layout-tab .v-x-scroll, .layout-tab .n-tabs-nav-scroll-content{
  height: 60px;
}
.layout-tab .n-tabs-nav-scroll-content,.layout-tab .n-tabs-nav{
  display: flex;
  align-items: end;
}
.layout-tab .n-tabs-wrapper{
  height: 46px;
}
.suffix-box{
  margin-right: 20px;
  line-height: 46px;
}
</style>