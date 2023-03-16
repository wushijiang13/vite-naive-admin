<template>
  <div class="layout-tab-close">
    <n-dropdown trigger="hover" :options="options" @select="dropDownSelect">
      <n-button text class="tab-operate-icon">
        <template #icon>
          <n-icon  :component="BorderAll" size="20"/>
        </template>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, h , Ref } from 'vue';
import { useStore } from "@pinia";
import { BorderAll,Refresh } from '@vicons/tabler'
import { CloseSharp } from '@vicons/ionicons5'
import { ArrowLeft12Regular,ArrowRight16Regular } from '@vicons/fluent'
import {NIcon,DropdownOption} from "naive-ui";

const store = useStore();
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

const renderIcon = (component:any) => {
  return h(NIcon,{component})
}
</script>
<style scoped>
.tab-operate-icon{
  transition: .3s linear;
}
.tab-operate-icon:hover{
  transform: rotateZ(90deg);
}
</style>