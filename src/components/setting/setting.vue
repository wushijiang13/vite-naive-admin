<!--设置-->
<template>
    <div class="setting">
        <n-popover trigger="click">
            <template #trigger>
                <n-button type="success" style="font-size: 20px;" >
                    <n-icon>
                        <Settings/>
                    </n-icon>
                </n-button>
            </template>
            <div class="setting-popover">
                <h3>主题更换</h3>
                <h4>布局更换</h4>
                <n-space vertical>
                  <n-radio-group
                            v-model:value="selectLayout"
                            name="radiobuttongroup1">
                    <n-grid x-gap="12" :cols="2">
                        <n-gi
                                v-for="layout in layoutList"
                                :key="layout.key">
                            <n-radio-button
                                    :key="layout.key"
                                    :value="layout.key">
                                {{ layout.label }}
                            </n-radio-button>
                        </n-gi>
                    </n-grid>
                    </n-radio-group>
                </n-space>
                <h4>主题色切换</h4>
                <n-button @click="themeClick" strong secondary>
                    {{modelValue.themeColorValue == null ? "深色" : "浅色" }}
                </n-button>
            </div>
        </n-popover>
    </div>
</template>

<script setup lang="ts">
    import {Settings} from '@vicons/ionicons5';
    import {reactive, ref, watch , defineEmits, defineProps} from 'vue'
    import { setLocalData} from '@utils'
    import { layoutList } from './config'

    const props = defineProps({
        modelValue : Object
    })
    const emits = defineEmits(['update:modelValue'])


    let themeConfigs = reactive(props.modelValue);
    let selectLayout = ref(themeConfigs.layoutValue.key);

    /**
     * 主题切换
     */
    const  themeClick =  () => {
        themeConfigs.themeColorValue = themeConfigs.themeColorValue == "dark" ? "white" : "dark"
    }

    window.onbeforeunload = ()=>{
        setLocalData("themeLayoutKey",themeConfigs.layoutValue.key)
        setLocalData("themeColor",themeConfigs.themeColorValue)
    }

    watch(
        () => selectLayout.value,
        (newValue) => {
            themeConfigs.layoutValue = layoutList[newValue];
            console.log(themeConfigs.layoutValue);
        }
    )
</script>

<style scoped>
    .setting {
        position: fixed;
        right: 40px;
        bottom: 90px;
    }
    .setting-popover {
        width: 200px;
    }
</style>