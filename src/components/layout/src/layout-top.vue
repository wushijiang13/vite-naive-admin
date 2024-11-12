<!--房间布局-->
<template>
    <div class="layout-top">
        <div class="layout-header">
          <div class="layout-header-left-box">
            <img class="logo" src="/src/assets/logo.png"/>
            <span>
               ite-Naive-Admin
            </span>
            <n-menu
                :options="menuOption"
                v-model:value="store.menuValue"
                :default-expanded-keys="['projectsAndScree','system']"
                @update:value="store.menuAction"
                :render-icon="renderIcon"
                :render-label="labelRender"
                mode="horizontal"
                collapsed-icon-size="18"
                collapsed-width="60"
                ref="menuRef"
            />
          </div>
          <layoutRightBtnGroup/>
        </div>
        <div class="layout-main">
          <layoutTab  @tabChange='tabChange' :tabsPadding="70" :paneStyle="{padding:'0px 70px 70px 70px'}" :suffixStyle="{marginRight:'70px'}"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { menuOption} from '../config/layout.config';
import { useStore } from "@pinia";
import {useRouterStore} from "@pinia/routerFlat";
import {useRoute, useRouter} from "vue-router";
import {MenuOption, NIcon} from "naive-ui";
import {h, onMounted} from "vue";
import layoutRightBtnGroup from '@components/layout-right-btn-group/index.vue'

const store = useStore();
const routerStore = useRouterStore();
const router = useRouter();
const route = useRoute();

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
  store.generateBread(store.menuValue,routerStore.flatObject[store.menuValue]);
}
/**
 * 初始化，包含面包屑初始化
 * menu 导航默认选中
 */
function init(){
  //不管从哪个页面进来概览都要排到第一个
  store.TabPageListInit();
  store.menuAction((route.name as string),routerStore.flatObject[(route.name as string)]);
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
        overflow: hidden;
    }
    .layout-header{
        height: 70px;
        padding: 0px 70px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 200;
    }
    .layout-header-left-box{
      height: 70px;
      display: flex;
      align-items: center;
    }
    .layout-header-left-box span{
      display: inline-block;
      width: 250px;
    }
    .layout-main{
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        /* min-height: 100vh; */
        overflow: hidden;
        background-color: var(--theme-layout-background-coolr);
    }
</style>