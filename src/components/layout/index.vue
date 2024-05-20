<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import { darkTheme ,  zhCN, dateZhCN } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutMap} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'
  import type {ThemeConfig} from '@types'
  import { useLoadingBar } from "naive-ui";

  const store = useStore();
  const loadingBar = useLoadingBar();
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
  const themeColorMap ={
    "dark":darkTheme,
    "white":null
  }
</script>
<template>
  <n-config-provider :class="store.themeConfigs.themeColorValue === 'dark' ? 'dark' : 'white'" :theme="themeColorMap[store.themeConfigs.themeColorValue]" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
          <component  :is="store.themeConfigs.layoutValue.value"></component>
    </n-message-provider>
    <setting v-model="store.themeConfigs"/>
    <n-global-style />
    <n-theme-editor/>
  </n-config-provider>
</template>
