<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import { darkTheme ,  zhCN, dateZhCN } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutMap} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'
  import type {ThemeConfig} from '@types'
  import { useLoadingBar } from "naive-ui";
  import { computed } from 'vue'
  const store = useStore();
  const loadingBar:any = useLoadingBar();
  store.$patch({
    loadingBar:loadingBar,
  })

  const themeData:ThemeConfig = !getLocalData('themeLayoutKey') ?  _.cloneDeep(themeConfigDeep) :
      {layoutValue:layoutMap[getLocalData('themeLayoutKey')],themeColorValue:getLocalData('themeColor')};
  store.$patch({
    themeConfigs:themeData,
  })
  if (!getLocalData('themeLayoutKey')) {
    setLocalData("themeLayoutKey",store.themeConfigs.layoutValue.key)
    setLocalData("themeColor",store.themeConfigs.themeColorValue)
  }
  const themeColorMap:any ={
    "dark":darkTheme,
    "white":null
  }

  const getTheme =  computed(()=>{
    let theme =store.themeConfigs.themeColorValue ? 'dark' : 'white'
    return themeColorMap[theme];
  })

  
</script>
<template>
  <n-config-provider :class="store.themeConfigs.themeColorValue ? 'dark' : 'white'" :theme="getTheme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
          <component  :is="store.themeConfigs.layoutValue.value"></component>
    </n-message-provider>
    <setting v-model="store.themeConfigs"/>
    <n-global-style />
    <n-theme-editor/>
  </n-config-provider>
</template>
