<!--TB布局-->
<template>
    <div class="layout-teambition">
      <n-config-provider class="layout-config-provider-box" :locale="zhCN" :date-locale="dateZhCN">
        <div class="layout-navigation">
          <n-space vertical>
            <n-layout has-sider class="layout-navigation-box">
              <n-layout-sider
                  bordered
                  collapse-mode="width"
                  :collapsed-width="64"
                  :width="240"
                  :collapsed="isCollapsed">
                <div class="logo-box">
                  <img class="logo" src="/src/assets/logo.png"/>
                  <transition>
                    <span v-show="!isCollapsed">ite-Naive-Admin</span>
                  </transition>
                </div>
                <div>
                  <n-menu
                      :collapsed="isCollapsed"
                      :options="menuOption"
                      v-model:value="store.menuValue"
                      @update:value="store.menuAction"
                      :render-label="labelRender"
                      :render-icon="renderIcon"
                      collapsed-icon-size="18"
                      collapsed-width="60"
                      ref="menuRef"
                  />
                </div>
              </n-layout-sider>
            </n-layout>
          </n-space>
          </div>
        <div class="layout-main">
              <div class="layout-inherit-flex-box">
                  <div class="layout-header">
                    <div class="bread-crumb">
                      <n-button text class="layout-stow" @click="menuStow">
                        <n-icon size="18" :component="
                        isCollapsed ? LayoutSidebarLeftExpand : LayoutSidebarLeftCollapse"/>
                      </n-button>
                      <n-breadcrumb separator=">">
                        <n-breadcrumb-item v-for="item in store.bread">
                          {{item.label}}
                        </n-breadcrumb-item>
                      </n-breadcrumb>
                    </div>
                    <div class="user-box">
                      <layoutRightBtnGroup/>
                    </div>
                  </div>
              </div>
              <div class="layout-content">
                <layoutTab @tabChange='tabChange' :tabsPadding="20"/>
              </div>
          </div>
      </n-config-provider>
    </div>
</template>

<script setup lang="ts">
  import { menuOption } from '../config/layout.config';
  import { ref, h, onMounted } from 'vue';
  import { useRouter,useRoute} from "vue-router";
  import { zhCN, dateZhCN , NIcon, NMenu} from 'naive-ui'
  import type {MenuOption} from 'naive-ui'
  import { useRouterStore } from "@pinia/routerFlat";
  import { useStore } from "@pinia";
  import { LayoutSidebarLeftCollapse,LayoutSidebarLeftExpand } from '@vicons/tabler'
  import layoutTab from '@components/layout-tab/layout-tab.vue'
  import layoutRightBtnGroup from '@components/layout-right-btn-group/index.vue'

  const router = useRouter();
  const route:any = useRoute();
  const store = useStore();
  const routerStore = useRouterStore();
  let menuRef = ref<InstanceType<typeof NMenu> | null>(null);
  let isCollapsed = ref(false);

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
   * 控制menu是否抽屉展开
   */
  function menuStow(){
    isCollapsed.value = !isCollapsed.value;
  }

  /**
   * 点击用户信息操作icon
   */
  function userOperateClick(){
    isCollapsed.value = !isCollapsed.value;
  }



  /**
   * tab 选中页反正改变
   */
  function tabChange(){
    //通知父级tab 已更新
    menuExpand();
    store.generateBread(store.menuValue,routerStore.flatObject[store.menuValue]);
  }
  /**
   * 是否展开列表
   */
  function menuExpand(){
    menuRef.value?.showOption(store.menuValue)
  }

  function findMenuAction(key:string){
    store.menuAction(key,routerStore.flatObject[key]);
    menuExpand();
  }

  /**
   * 初始化，包含面包屑初始化
   * menu 导航默认选中
   */
  function init(){
    //不管从哪个页面进来概览都要排到第一个
    store.TabPageListInit();
    findMenuAction(route.name)
  }

  onMounted(()=>{
    init();
  })
</script>

<style scoped>
    .layout-config-provider-box{
      width: 100vw;
      display: flex;
    }
    .layout-inherit-flex-box,.layout-teambition{
      display: flex;
      overflow: hidden;
    }
    .layout-navigation{
      box-shadow: 0 0px 5px 1px rgb(57 66 60 / 20%);
      margin-right: 2px;
    }
    .layout-navigation-box{
      height: 100vh;
      overflow: auto;
    }
    .layout-main{
      flex: 1;
      flex-direction: column;
      min-height: 100vh;
    }
    .layout-content{
      background-color: var(--theme-layout-background-coolr);
    }
    .layout-header{
      flex:1;
      height: 60px;
      line-height: 60px;
      box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
      display: inline-flex;
      justify-content: space-between;
      margin-bottom: 2px
    }
    .layout-stow{
      margin-left: 20px;
    }
    .logo-box{
      font-size: 20px;
      line-height: 60px;
      height: 60px;
      text-align: center;
      font-weight: 200;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bread-crumb{
      margin-left: 12px;
      display: flex;
      align-items: center;
    }
    .user-box{
      margin-right: 20px;
    }
    .v-enter-active{
      transition-delay: 0.1s;
    }
    .v-enter-from{
      opacity: 0;
    }
</style>