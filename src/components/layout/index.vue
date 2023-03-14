<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import { reactive } from 'vue';
  import { darkTheme ,  zhCN, dateZhCN } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutList} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'

  const store = useStore();
  const themeData = !getLocalData('themeLayoutKey') ?  _.cloneDeep(themeConfigDeep) :
      {layoutValue:layoutList[getLocalData('themeLayoutKey')],themeColorValue:getLocalData('themeColor')};
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
    <component :is="store.themeConfigs.layoutValue.value"></component>
    <setting v-model="store.themeConfigs"/>
    <n-global-style />
    <n-theme-editor/>
  </n-config-provider>
</template>
