<!--TB布局-->
<template>
    <div class="layout-teambition">
      <n-config-provider class="layout-config-provider-box" :locale="zhCN" :date-locale="dateZhCN">
        <div class="layout-navigation">
            <div class="logo">
              运营支撑平台
            </div>
            <div>
              <n-menu
                  :options="menuOption"
                  :default-value="menuValue"
                  :default-expanded-keys="['projectsAndScree','system']"
                  @update:value="menuAction"
              />
            </div>
          </div>
        <div class="layout-main">
              <div class="layout-inherit-flex-box">
                  <div class="layout-header">
                    <div class="bread-crumb">
                      <n-breadcrumb separator=">">
                        <n-breadcrumb-item v-for="item in bread">
                          {{item.label}}
                        </n-breadcrumb-item>
                      </n-breadcrumb>
                    </div>
                  </div>
              </div>
              <div class="laout-content">
                  <router-view/>
              </div>
          </div>
      </n-config-provider>
    </div>
</template>

<script setup lang="ts">
  import {menuOption,menuOptions} from '../config/layout.config';
  import {ref} from 'vue';
  import { useRouter } from "vue-router";
  import { zhCN, dateZhCN } from 'naive-ui'

  let bread = ref([]);
  let menuValue = ref("overviews");
  let router = useRouter();

  /**
   * 通过parendKey 生成二级面包屑
   * @param key
   * @param item
   */
  function menuAction(key: string, item: menuOptions){
    let result = [];
    if (item.hasOwnProperty("parendKey")) {
      result.push(menuOption.find(findItem=>{
        return item.parendKey == findItem.key;
      }))
      result.push(item);
    }else{
      result.push(item);
    }
    bread.value = result;
    router.push(key)
  }
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
      width: 280px;
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
    .laout-content{
      padding: 20px;
      padding-bottom: 0px;
    }
    .logo{
      font-size: 20px;
      line-height: 60px;
      display:block;
      text-align: center;
      font-weight: 600;
    }
    .bread-crumb{
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
</style>