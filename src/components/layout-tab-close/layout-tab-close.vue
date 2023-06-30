<template>
  <div class="layout-tab-close">
    <div>
      <slot name="external"></slot>
    </div>
    <n-dropdown
        v-bind="props.config"
        :placement="'bottom-end'"
        class="tab-drop"
        :options="options"
        @select="dropDownSelect">
      <slot name="content">
        <n-icon  class="tab-operate-icon" :component="BorderAll" size="20"/>
      </slot>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import {ref, h, Ref,defineProps,defineEmits} from 'vue';
import { useStore } from "@pinia";
import { BorderAll,Refresh } from '@vicons/tabler'
import { CloseSharp } from '@vicons/ionicons5'
import { ArrowLeft12Regular,ArrowRight16Regular } from '@vicons/fluent'
import {NIcon,DropdownOption} from "naive-ui";

const store = useStore();
const props = defineProps(['config','isShowContent']);
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
    label:'关闭当前',
    key:'closeCurrent',
    icon:()=>renderIcon(CloseSharp)
  },
  {
    label:'关闭全部',
    key:'closeAll',
    icon:()=>renderIcon(CloseSharp)
  },
])

const dropDownSelect = (key: string | number) => {
  store.dropDownSelect(key)
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