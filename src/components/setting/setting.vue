<!--设置-->
<template>
    <div class="setting">
        <n-button @click="()=>{active = !active}" style="font-size: 20px;" >
          <n-icon>
            <Settings/>
          </n-icon>
        </n-button>
        <n-drawer v-model:show="active"  placement="right">
          <template #default>
            <div class="setting-drawer">
              <h3>主题更换</h3>
              <h4>布局更换</h4>
              <n-space vertical>
                <n-select v-model:value="selectLayout" :value-field="'key'" :options="layoutList" />
              </n-space>
              <h4>主题色切换</h4>
              <n-button @click="themeClick" strong secondary>
                {{modelValue.themeColorValue == null ? "深色" : "浅色" }}
              </n-button>
            </div>
          </template>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
    import {Settings} from '@vicons/ionicons5';
    import {reactive, ref, watch , defineEmits, defineProps} from 'vue'
    import { setLocalData} from '@utils'
    import { layoutList,layoutMap } from './config'

    const props = defineProps({
        modelValue : {} as any
    })
    const active = ref(false)
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
            themeConfigs.layoutValue = layoutMap[newValue];
        }
    )
</script>

<style scoped>
    .setting {
        position: fixed;
        right: 0px;
        bottom: 60px;
    }
    .setting-drawer {
        padding: 0px 12px;
    }
</style>