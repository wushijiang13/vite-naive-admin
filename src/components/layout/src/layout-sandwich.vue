<!--三明治布局-->
<template>
    <div class="layout-sandwich">
        <div class="layout-header">
            <div class="logo">
              <img class="logo" src="/src/assets/logo.png"/>
              <span>Vite-Naive-Admin</span>
            </div>
            <layoutRightBtnGroup/>
        </div>
        <div class="layout-main">
            <div class="laout-content">
              <keep-alive :exclude="store.excludePage" :max="10">
                <router-view v-if=" store.refresh" />
              </keep-alive>
            </div>
        </div>
        <div class="layout-bottom">
            <div class="layout-navigation">
              <n-menu
                  :mode="'horizontal'"
                  :options="menuOption"
                  v-model:value="store.menuValue"
                  @update:value="store.menuAction"
                  :render-icon="renderIcon"
                  :render-label="labelRender"
                  collapsed-icon-size="18"
                  collapsed-width="60"
                  ref="menuRef"
              />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {h, onMounted, ref} from 'vue'
    import {MenuOption, NIcon, NMenu} from 'naive-ui'
    import { useStore } from '@pinia'
    import { useRouterStore } from "@pinia/routerFlat";
    import { useRouter,useRoute } from "vue-router";
    import {menuOption } from '../config/layout.config';
    import layoutRightBtnGroup from '@components/layout-right-btn-group/index.vue'

    const store = useStore();
    const routerStore = useRouterStore();
    const router = useRouter();
    const route:any = useRoute();
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
    .layout-sandwich{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
        height: 60px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        padding: 0px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .layout-main{
        height: calc(100vh - 126px);
        overflow: auto;
        margin-top: 3px;
    }
    .laout-content{
        padding: 20px;
        background-color: var(--theme-layout-background-coolr);
    }
    .layout-bottom{
        height: 60px;
        box-shadow: 0px 1px 15px 5px rgb(57 66 60 / 20%);
    }
    .layout-navigation{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logo{
      line-height: 60px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 200;
      height: 60px;
    }
</style>