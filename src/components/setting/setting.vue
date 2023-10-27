<!--设置-->
<template>
    <div class="setting">
      <n-space vertical>
        <n-button v-for="item in settingListData"
                  @click="item.click"
                  block
                  class="set-btn"
                  strong
                  :color="item.bgColor">
          <template #default>
            <n-space vertical>
              <n-icon size="16" :color="item.color" :component="item.icon" />
              <div :style="{color:item.color}">{{item.title}}</div>
            </n-space>
          </template>
        </n-button>
      </n-space>
      <n-drawer v-model:show="settingStore.active"  placement="right">
          <template #default>
            <div class="setting-drawer">
              <h3>主题更换</h3>
              <n-form  label-placement="left">
                <n-form-item label="布局更换">
                  <n-select v-model:value="selectLayout" :value-field="'key'" :options="layoutList" />
                </n-form-item>
                <n-form-item label="主题色切换">
                  <n-button @click="themeClick" strong secondary>
                    {{modelValue.themeColorValue == null ? "深色" : "浅色" }}
                  </n-button>
                </n-form-item>
                <n-form-item label="主题色切换">
                  <n-button @click="themeClick" strong secondary>
                    {{modelValue.themeColorValue == null ? "深色" : "浅色" }}
                  </n-button>
                </n-form-item>
              </n-form>
            </div>
          </template>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
    import { Theme,CopyOne } from '@icon-park/vue-next'
    import {reactive, ref, watch , defineEmits, defineProps} from 'vue'
    import { setLocalData } from '@utils'
    import { layoutList,layoutMap } from './config'
    import { useSettingStore } from '@pinia/setting'

    const props = defineProps({
        modelValue : {} as any
    })
    const settingStore = useSettingStore();
    const emits = defineEmits(['update:modelValue'])
    const settingListData = [
      {
        title:"主题配置",
        icon:Theme,
        color:'#18a058',
        bgColor:'#d6eee3',
        click:settingStore.themeShowDrawer
      },
      {
        title:"拷贝源码",
        icon:CopyOne,
        color:'#2080f0',
        bgColor:'#cbdffa',
        click:settingStore.copySourceCode
      }
    ]
    let themeConfigs = reactive(props.modelValue);
    let selectLayout = ref(themeConfigs.layoutValue.key);

    /**
     * 主题切换
     */
    const themeClick =  () => {
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
      margin: auto;
      width: 76px;
      height: 146px;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-left: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      border-top: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 4;
    }
    .setting-drawer {
      padding: 0px 12px;
    }
    .set-btn {
      height: 60px;
      width: 60px;
      font-size: 12px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
</style>