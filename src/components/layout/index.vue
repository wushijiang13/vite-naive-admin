<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import { darkTheme ,  zhCN, dateZhCN } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutMap} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'
  import type {ThemeConfig} from '@types'

  const store = useStore();
  const themeData:ThemeConfig = !getLocalData('themeLayoutKey') ?  _.cloneDeep(themeConfigDeep) :
      {layoutValue:layoutMap[getLocalData('themeLayoutKey')],themeColorValue:getLocalData('themeColor')};
  store.$patch({
    themeConfigs:themeData,
  })
  if (!getLocalData('themeLayoutKey')) {
    setLocalData("themeLayoutKey",store.themeConfigs.layoutValue.key)
    setLocalData("themeColor",store.themeConfigs.themeColorValue)
  }
  const themeColorMap ={
    "dark":darkTheme,
    "white":null
  }
</script>
<template>
  <n-config-provider  :theme="themeColorMap[store.themeConfigs.themeColorValue]" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <component :is="store.themeConfigs.layoutValue.value"></component>
      <setting v-model="store.themeConfigs"/>
      <n-global-style />
      <n-theme-editor/>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
