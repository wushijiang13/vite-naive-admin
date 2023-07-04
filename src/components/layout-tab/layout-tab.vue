<template>
  <div class="layout-tab">
    <n-tabs
        v-model:value="store.tabPageActive"
        @update:value="tabChange"
        type="card"
        closable
        :animated="false"
        @close="handleClose"
        :tabs-padding="props.tabsPadding">
      <n-tab-pane
          v-for="(page,index) in store.tabPageList"
          :key="page.key"
          :tab="page.label"
          :name="page.key"
          display-directive="show:lazy"
          :closable="store.tabPageActive == page.key && page.isClose">
        <div class="tab-pane-box" :style="props.paneStyle" >
          <keep-alive :exclude="store.excludePage" :max="10">
            <component v-if=" store.refresh && store.tabPageActive == page.key" :is="page.component"></component>
          </keep-alive>
        </div>
        <template #tab>
          <div>
            <layoutTabClose :config="closeConfigList[index]" :isShowContent="false">
              <template #external>
                <div class="tab-box" @contextmenu="layoutContextMenu(index)">
                  <n-icon v-if="page.icon" size="16" :component="page.icon"/>
                  <span class="tab-span">{{page.label}}</span>
                </div>
              </template>
            </layoutTabClose>
          </div>
        </template>
      </n-tab-pane>
      <template #suffix>
        <slot name="tab-suffix"></slot>
        <div class="suffix-box" :style="props.suffixStyle">
          <layoutTabClose/>
        </div>
      </template>
      <template #prefix>
        <slot name="tab-prefix"></slot>
      </template>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, defineEmits, defineProps, watchEffect } from 'vue';
import { useStore } from "@pinia";
import layoutTabClose from '@components/layout-tab-close/layout-tab-close.vue'
import { useLoadingBar } from 'naive-ui'
import {router} from "@/config/router/router";
const store = useStore();
const emits = defineEmits(['tabChange'])
const props = defineProps(['tabsPadding','paneStyle','suffixStyle'])
const loadingBar= useLoadingBar();
const closeConfigList:any = ref([]);

watchEffect(()=>{
  closeConfigList.value = store.tabPageList.map((item,index:number)=>{
    return {
      x:0,
      y:0,
      show:false,
      trigger:'manual',
      onSelect:(key)=>{
        store.dropDownSelect(key);
        closeConfigList.value[index].show = false;
      },
      onClickoutside:()=>{
        //因为插槽嵌套问题，导致clickout 触发会高于select 所以需要把设置隐藏弄到队列最后执行
        let stop =  setTimeout(()=>{
          closeConfigList.value[index].show = false;
          clearTimeout(stop);
        },0)
      }
    }
  })
})


const handleClose = (name: string | number) => {
  let tabPageList = store.tabPageList;
  store.TabPageListDelete(name);
  store.$patch({
    tabPageActive:tabPageList[tabPageList.length-1].key
  })
  store.getKeyActiveMenu();
}
/**
 * tab点击同步路由
 * @param value
 */
const tabChange = (value:string) => {
  emits('tabChange')
  store.$patch({
    tabPageActive:value,
  })
  store.getKeyActiveMenu();
}

const layoutContextMenu = (index:number) => {
  let e:MouseEvent|any = window.event;
  e.preventDefault();
  closeConfigList.value[index].show = false;
  nextTick(()=>{
    closeConfigList.value[index].x = e.clientX;
    closeConfigList.value[index].y = e.clientY;
    closeConfigList.value[index].show = true;
  })
}
</script>
<style scoped>
.tab-pane-box {
  padding: 0px 20px 20px 20px;
  overflow: auto;
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