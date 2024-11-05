<!--常规布局-->
<template>
    <div class="layout-conventional">
        <div class="layout-header">
          <div class="layout-left-box">
            <img class="logo" src="/src/assets/logo.png"/>
            <span>
             Vite-Naive-Admin
          </span>
          </div>
          <layoutRightBtnGroup/>
        </div>
        <div class="layout-main">
            <div class="layout-navigation">
                <n-layout has-sider  class="layout-navigation-box">
                    <n-layout-sider
                        bordered
                        collapse-mode="width"
                        :collapsed-width="64"
                        :width="240"
                        :collapsed="isCollapsed">
                        <n-menu
                            :collapsed="isCollapsed"
                            :options="menuOption"
                            v-model:value="store.menuValue"
                            @update:value="store.menuAction"
                            :render-icon="renderIcon"
                            :render-label="labelRender"
                            collapsed-icon-size="18"
                            collapsed-width="60"
                            ref="menuRef"
                        />
                    </n-layout-sider>
                    <n-layout>
                        <div class="laout-content">
                          <layoutTab @tabChange='tabChange' :tabsPadding="20">
                            <template #tab-prefix>
                              <div class="tab-prefix-box">
                                <n-button text class="layout-stow" @click="menuStow">
                                  <n-icon size="20" :component="
                                  isCollapsed ? LayoutSidebarLeftExpand : LayoutSidebarLeftCollapse"/>
                                </n-button>
                              </div>
                            </template>
                          </layoutTab>
                        </div>
                    </n-layout>
                </n-layout>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {h, onMounted, ref} from 'vue'
    import {MenuOption, NIcon, NMenu} from 'naive-ui'
    import { LayoutSidebarLeftCollapse,LayoutSidebarLeftExpand } from '@vicons/tabler'
    import { menuOption,updateExpandIcon } from '../config/layout.config';
    import { useStore } from "@pinia";
    import { useRouterStore } from "@pinia/routerFlat";
    import { useRoute,useRouter} from "vue-router";
    import layoutRightBtnGroup from '@components/layout-right-btn-group/index.vue'
    const store = useStore();
    const routerStore = useRouterStore();
    const route = useRoute();
    const router = useRouter();
    let menuRef = ref<InstanceType<typeof NMenu> | null>(null);

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

    let isCollapsed = ref(false);
    /**
     * 控制menu是否抽屉展开
     */
    function menuStow(){
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
    .layout-inherit-flex-box{
        display: flex;
    }
    .layout-navigation-box{
      height: calc(100vh - 66px);
      overflow: auto;
    }
    .layout-conventional{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
      height: 60px; 
      box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 20px;
    }
    .layout-left-box{
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 200;
    }
    .layout-main{
        margin-top: 3px;
    }
    .laout-content{      
        background-color: var(--theme-layout-background-coolr);
    }
    .layout-navigation{
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        padding-left: 5px;
        height: calc(100vh - 65px) ;
        overflow: auto;
    }
    .tab-prefix-box{
      line-height: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      margin-left: 14px;
    }
</style>