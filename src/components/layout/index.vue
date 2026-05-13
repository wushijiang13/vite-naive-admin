<script setup lang="ts">
  import setting from '../setting/setting.vue'
  import globalSearch from '../global-search/index.vue'
  import lockScreen from '../lock-screen/index.vue'
  import { darkTheme } from 'naive-ui'
  import _ from 'lodash'
  import {themeConfigDeep,layoutMap} from '@/components/setting/config';
  import { setLocalData, getLocalData} from '@utils'
  import {useStore} from '@pinia'
  import type {ThemeConfig} from '@types'
  import { useLoadingBar } from "naive-ui";
  import { computed, ref, provide } from 'vue'
  import { useI18n } from 'vue-i18n'

  const store:any = useStore();
  const loadingBar:any = useLoadingBar();
  const { locale } = useI18n();
  store.$patch({
    loadingBar:loadingBar,
  })

  let sourceConfig = _.cloneDeep(themeConfigDeep);
  const storedLayoutKey = getLocalData('themeLayoutKey');
  const layoutValue = storedLayoutKey && layoutMap[storedLayoutKey] ? layoutMap[storedLayoutKey] : sourceConfig.layoutValue;
  let themeData:ThemeConfig = {
        layoutValue,
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
    setLocalData("themeLayoutKey",store.themeConfigs.layoutValue?.key)
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

  const globalSearchRef = ref<any>(null)
  provide('openGlobalSearch', () => globalSearchRef.value?.openSearch())

  const lockScreenRef = ref<any>(null)
  provide('lockScreen', () => {
    setLocalData('isLocked', true)
    lockScreenRef.value?.lock()
  })

  
</script>
<template>
  <n-config-provider :class="store.themeConfigs.themeColorValue ? 'dark' : 'white'" :theme="getTheme" 
  :locale="store.themeConfigs.themeLocale" :date-locale="store.themeConfigs.themeDateLocale" :theme-overrides="store.themeConfigs.themeOverrides">
    <n-message-provider>
          <component :is="store.themeConfigs.layoutValue.value"></component>
    </n-message-provider>
    <setting v-model="store.themeConfigs"/>
    <globalSearch ref="globalSearchRef"/>
    <lockScreen ref="lockScreenRef"/>
    <n-global-style />
    <n-theme-editor/>
  </n-config-provider>
</template>
