<!--TB布局-->
<template>
    <div class="layout-teambition">
      <n-config-provider class="layout-config-provider-box" :locale="zhCN" :date-locale="dateZhCN">
        <div class="layout-navigation">
          <n-space vertical>
            <n-layout has-sider>
              <n-layout-sider
                  bordered
                  collapse-mode="width"
                  :collapsed-width="64"
                  :width="240"
                  :collapsed="isCollapsed"
              >
                <div class="logo">
                  <n-icon size="30"><LogoVue/></n-icon>
                  <transition>
                    <span v-show="!isCollapsed">运营支撑平台</span>
                  </transition>
                </div>
                <div>
                  <n-menu
                      :collapsed="isCollapsed"
                      :options="menuOption"
                      v-model:value="menuValue"
                      :default-expanded-keys="['projectsAndScree','system']"
                      @update:value="menuAction"
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
                    <n-button text class="layout-stow" @click="menuStow">
                      <n-icon size="18" :component="
                        isCollapsed ? LayoutSidebarLeftExpand : LayoutSidebarLeftCollapse"/>
                    </n-button>
                    <div class="bread-crumb">
                      <n-breadcrumb separator=">">
                        <n-breadcrumb-item v-for="item in bread">
                          {{item.label}}
                        </n-breadcrumb-item>
                      </n-breadcrumb>
                    </div>
                  </div>
              </div>
              <div>
                <layoutTab />
              </div>
          </div>
      </n-config-provider>
    </div>
</template>

<script setup lang="ts">
  import { menuOption,flatList } from '../config/layout.config';
  import { menuOptions } from "@utils/bread";
  import { recursionBread } from '@utils/bread'
  import {ref, h, onMounted} from 'vue';
  import type { Ref } from 'vue';
  import { useRouter,useRoute } from "vue-router";
  import { zhCN, dateZhCN,NIcon} from 'naive-ui'
  import type {MenuOption} from 'naive-ui'
  import { useStore } from "@pinia";
  import { LayoutSidebarLeftCollapse,LayoutSidebarLeftExpand } from '@vicons/tabler'
  import { LogoVue } from '@vicons/ionicons5'
  import layoutTab from '@components/layout-tab/layout-tab.vue'

  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  let bread:Ref<menuOptions[]> = ref([]);
  let menuRef = ref(null);
  let menuValue = ref("overviews");
  let isCollapsed = ref(false);

  function renderIcon(option: MenuOption){
    return option["icon"] ? h(NIcon,{component:option["icon"],size:'18'}) : '';
  }

  /**
   * 通过parendKey 生成二级面包屑
   * @param key
   * @param item
   */
  function menuAction(key: string, item: menuOptions){
    let breads = [];
    store.TabPageListPush(item);
    store.$patch({
      tabPageActive:item.key,
    })
    recursionBread(key,item,flatList,breads);
    bread.value = breads;
    router.push({name:key})
  }
  /**
   * 控制menu是否抽屉展开
   */
  function menuStow(){
    isCollapsed.value = !isCollapsed.value;
  }
  /**
   * 是否展开列表
   */
  function menuExpand(key){
    menuRef.value?.showOption(key)
  }

  /**
   * 初始化，包含面包屑初始化
   * menu 导航默认选中
   */
  function init(){
    let targetItem = flatList.find(item=>{
      return item.key == route.name ? item : null;
    })
    menuValue.value = route.name;
    menuAction(route.name,targetItem);
    menuExpand(targetItem.key);
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
    .layout-inherit-flex-box{
      display: flex;
    }
    .layout-teambition{
      display: flex;
    }
    .layout-navigation{
      box-shadow: 0 0px 5px 1px rgb(57 66 60 / 20%);
      height: 100vh;
      overflow: auto;
      margin-right: 2px;
    }
    .layout-main{
      flex: 1;
      flex-direction: column;
    }
    .layout-header{
      flex:1;
      height: 60px;
      line-height: 60px;
      box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
      display: inline-flex;
    }
    .layout-stow{
      margin-left: 20px;
    }
    .logo{
      font-size: 20px;
      line-height: 60px;
      height: 60px;
      text-align: center;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bread-crumb{
      margin-left: 12px;
      display: flex;
      align-items: center;
    }
    .v-enter-active{
      transition-delay: 0.1s;
    }
    .v-enter-from{
      opacity: 0;
    }
</style>