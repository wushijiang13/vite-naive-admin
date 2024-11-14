<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import { darkTheme } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutMap} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'
  import type {ThemeConfig} from '@types'
  import { useLoadingBar } from "naive-ui";
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const store:any = useStore();
  const loadingBar:any = useLoadingBar();
  const { locale } = useI18n();
  store.$patch({
    loadingBar:loadingBar,
  })

  let sourceConfig = _.cloneDeep(themeConfigDeep);
  let themeData:ThemeConfig = {
        layoutValue:layoutMap[(getLocalData('themeLayoutKey') ? getLocalData('themeLayoutKey') : sourceConfig.layoutValue)],
        themeColorValue:getLocalData('themeColor') ? getLocalData('themeColor') : sourceConfig.themeColorValue,
        themeLocale:getLocalData('themeLocale') ? getLocalData('themeLocale') : sourceConfig.themeLocale,
        themeDateLocale:getLocalData('themeDateLocale') ? getLocalData('themeDateLocale') : sourceConfig.themeDateLocale,
        themeOverrides:getLocalData('themeOverrides') ? getLocalData('themeOverrides') : sourceConfig.themeOverrides,
  }
  locale.value = getLocalData('locale') ? getLocalData('locale') : locale.value;
  
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

  const getTheme = computed(()=>{
    let theme = store.themeConfigs.themeColorValue ? 'dark' : 'white'
    return themeColorMap[theme];
  })

  
</script>
<template>
  <n-config-provider :class="store.themeConfigs.themeColorValue ? 'dark' : 'white'" :theme="getTheme" 
  :locale="store.themeConfigs.themeLocale" :date-locale="store.themeConfigs.themeDateLocale" :theme-overrides="store.themeConfigs.themeOverrides">
    <n-message-provider>
          <component :is="store.themeConfigs.layoutValue.value"></component>
    </n-message-provider>
    <setting v-model="store.themeConfigs"/>
    <n-global-style />
    <n-theme-editor/>
  </n-config-provider>
</template>
