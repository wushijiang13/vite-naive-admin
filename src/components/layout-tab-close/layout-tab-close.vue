<template>
  <div class="layout-tab-close">
    <n-dropdown trigger="hover" :placement="'bottom-end'" class="tab-drop"  :options="options" @select="dropDownSelect">
      <n-icon class="tab-operate-icon" :component="BorderAll" size="20"/>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import {ref, h, Ref} from 'vue';
import { useStore } from "@pinia";
import { BorderAll,Refresh } from '@vicons/tabler'
import { CloseSharp } from '@vicons/ionicons5'
import { ArrowLeft12Regular,ArrowRight16Regular } from '@vicons/fluent'
import {NIcon,DropdownOption} from "naive-ui";
import { useLoadingBar } from 'naive-ui'

const store = useStore();
const loadingBar = useLoadingBar();
const options:Ref<DropdownOption[]> = ref([
  {
    label:'刷新',
    key:'refresh',
    icon:()=>renderIcon(Refresh),
  },
  {
    label:'关闭其他',
    key:'closeOther',
    icon:()=>renderIcon(CloseSharp),
  },
  {
    label:'关闭左侧',
    key:'closeLeft',
    icon:()=>renderIcon(ArrowLeft12Regular),
  },
  {
    label:'关闭右侧',
    key:'closeRight',
    icon:()=>renderIcon(ArrowRight16Regular),
  },
  {
    label:'关闭全部',
    key:'closeAll',
    icon:()=>renderIcon(CloseSharp)
  }
])

const dropDownSelect = (key: string | number, option: DropdownOption) => {
  let tabKey = store.tabPageActive;
  switch(key){
    case 'refresh':{
      loadingRefresh()
      break;
    }
    case 'closeOther':{
      store.TabPageListClear('other',tabKey);
      break;
    }
    case 'closeLeft':{
      store.TabPageListClear('left',tabKey);
      break;
    }
    case 'closeRight':{
      store.TabPageListClear('right',tabKey);
      break;
    }
    case 'closeAll':{
      store.TabPageListInit();
      store.$patch({
        tabPageActive:store.tabPageList[0].key
      })
      break;
    }
  }
}

/**
 * 刷新组件loading组件加载
 */
const loadingRefresh = async () => {
  await loadingBar.start();
  await store.refreshPageComponents();
  loadingBar.finish();
}

const renderIcon = (component:any) => {
  return h(NIcon,{component})
}

</script>
<style>
.tab-operate-icon{
  cursor: pointer;
  transition: .3s linear;
}
.tab-operate-icon:hover{
  color: #18a058;
  transform: rotateZ(90deg);
}
</style>