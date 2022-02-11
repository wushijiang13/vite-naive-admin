<script setup lang="ts">
    import setting from '@/components/setting/setting.vue'
    import { setLocalData, getLocalData} from '@utils/utils'
    import {themeConfigDeep,layoutList} from '@/components/setting/config';
    import { darkTheme ,  zhCN, dateZhCN } from 'naive-ui'
    import _ from 'lodash'
    import { reactive } from 'vue';

    const themeData = !getLocalData('themeLayoutKey') ?  _.cloneDeep(themeConfigDeep) :
        {layoutValue:layoutList[getLocalData('themeLayoutKey')],themeColorValue:getLocalData('themeColor')};
    let themeConfigs = reactive(themeData);
    if (!getLocalData('themeLayoutKey')) {
        setLocalData("themeLayoutKey",themeConfigs.layoutValue.key)
        setLocalData("themeColor",themeConfigs.themeColorValue)
    }
    const themeColorMap ={
        "dark":darkTheme,
        "white":null
    }
</script>

<template>
    <n-config-provider :theme="themeColorMap[themeConfigs.themeColorValue]" :locale="zhCN" :date-locale="dateZhCN">
        <component :is="themeConfigs.layoutValue.value"></component>
        <setting v-model="themeConfigs"/>
        <n-global-style />
        <n-theme-editor/>
    </n-config-provider>
</template>

<style>

</style>
