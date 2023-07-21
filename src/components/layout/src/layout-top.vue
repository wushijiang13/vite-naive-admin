<!--房间布局-->
<template>
    <div class="layout-top">
        <div class="layout-header">
            <n-icon size="30"><LogoVue/></n-icon>
            <span>
                运营支撑后台
            </span>
            <n-menu
              :options="menuOption"
              v-model:value="store.menuValue"
              :default-expanded-keys="['projectsAndScree','system']"
              @update:value="menuAction"
              :render-icon="renderIcon"
              :render-label="labelRender"
              mode="horizontal"
              collapsed-icon-size="18"
              collapsed-width="60"
              ref="menuRef"
          />
        </div>
        <div class="layout-main">
          <layoutTab  @tabChange='tabChange' :tabsPadding="70" :paneStyle="{padding:'0px 70px 70px 70px'}" :suffixStyle="{marginRight:'70px'}"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {flatObject, menuOption} from '../config/layout.config';
import { LogoVue } from '@vicons/ionicons5'
import { useStore } from "@pinia";
import {useRoute, useRouter} from "vue-router";
import {MenuOption, NIcon} from "naive-ui";
import {h, onMounted} from "vue";
import type { menuOptions } from '@types'

const store = useStore();
const router = useRouter();
const route = useRoute();

const menuAction = (key:string,targetItem:menuOptions) => {
  store.generateBread(key,targetItem);
  store.$patch({
    menuValue:key,
  })
  router.push({name:key})
}

function renderIcon(option: MenuOption){
  return option["icon"] ? h(NIcon,{component:option["icon"],size:'18'}) : '';
}

function labelRender (option: MenuOption){
  return h('div',{class:'.inblock'},{default:()=>{
      return [
        h('span',{},{default:()=>option.label}),
        option['renderCompoent'] ?  h(NIcon,{component:option["renderCompoent"],size:'18'}) : undefined
      ]
    }})
}

/**
 * tab 选中页反正改变
 */
function tabChange(){
  //通知父级tab 已更新
  store.generateBread(store.menuValue,flatObject[store.menuValue]);
}
/**
 * 初始化，包含面包屑初始化
 * menu 导航默认选中
 */
function init(){
  //不管从哪个页面进来概览都要排到第一个
  store.TabPageListInit();
  menuAction((route.name as string),flatObject[(route.name as string)]);
}

onMounted(()=>{
  init();
})
</script>

<style scoped>
    .layout-inherit-flex-box{
        display: flex;
    }
    .layout-top{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
        height: 70px;
        padding: 0px 70px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        background-color: #fff;
    }
    .layout-main{
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        min-height: 100vh;
    }
</style>