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
      <n-drawer :default-width="302" resizable v-model:show="settingStore.active"  placement="right">
          <template #default>
            <div class="setting-drawer">
              <h3>主题更换</h3>
              <ul class="setting-fun-box">
                <li>
                  <p>布局更换</p>
                  <div>
                    <n-select v-model:value="selectLayout" :value-field="'key'" :options="layoutList" />
                  </div>
                </li>
                <li>
                  <p>主题色切换</p>
                  <div>
                    <n-switch v-model:value="modelValue.themeColorValue" :rail-style="railStyle">
                      <template #checked-icon>
                        <SunOne theme="filled" size="14" fill="#ffe538"/>
                        <!-- <sun-one  size="28" /> -->
                      </template>
                      <template #unchecked-icon>
                        <moon theme="outline" size="14" />
                      </template>
                      <template #checked>
                        太阳
                      </template>
                      <template #unchecked>
                        月亮
                      </template>
                    </n-switch> 
                  </div>
                </li> 
                <li>
                  <p>配色</p>
                  <div>
                    <n-color-picker class="color-picker-box" size="small" :swatches="swatchesList"
                    v-model:value="themeColor"
                    @update:value="themeColorUpdate"  >
                      <template #label>
                        <down theme="outline" size="12" />
                      </template>
                    </n-color-picker>
                  </div>
                </li>
              </ul>
              <div>
                
              </div>
            </div>
          </template>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
    import { Theme,CopyOne,SunOne,Moon,Down } from '@icon-park/vue-next'
    import {reactive, ref, watch , defineEmits, defineProps, CSSProperties, onMounted} from 'vue'
    import { setLocalData } from '@utils'
    import { layoutList,layoutMap } from './config'
    import { useSettingStore } from '@pinia/setting'

    const props:any = defineProps({
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
    let themeConfigs:any = reactive(props.modelValue);
    let selectLayout = ref(themeConfigs.layoutValue.key);
    let themeColor = ref('#18a058');
    let swatchesList = ref([
      '#18A058',
      '#2080F0',
      '#F0A020',
      'rgba(208, 48, 80, 1)',
    ])
    window.onbeforeunload = ()=>{
        setLocalData("themeLayoutKey",themeConfigs.layoutValue.key)
        setLocalData("themeColor",themeConfigs.themeColorValue)
    }

    const railStyle = ({focused,checked}: { focused: boolean, checked: boolean }) => {
      let style: CSSProperties = {};
      if(checked){
        style.background = '#ffe538';
      }else{
        style.background = '#ada4a4';
      }
      return style
    }

    const themeColorUpdate = (value:string) => {
      themeConfigs.themeOverrides = {
        common: {
          primaryColor: value,
          primaryColorHover: value,
          primaryColorSuppl: value,
        },
      }
      //设置主题色变量
      document.body.style.setProperty('--theme-active-color', value);
      setLocalData('themeOverrides', themeConfigs.themeOverrides)
    }
    onMounted(()=>{
      themeColor.value = themeConfigs.themeOverrides.common.primaryColor;
      document.body.style.setProperty('--theme-active-color', themeConfigs.themeOverrides.common.primaryColor);
    })
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
      background-color: var(--theme-back-color);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-left: 1px solid var(--theme-layout-background-coolr);
      border-bottom: 1px solid var(--theme-layout-background-coolr);
      border-top: 1px solid var(--theme-layout-background-coolr);
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
    .setting-fun-box{
      list-style: none;
      margin: 0px;
      padding: 0px;
    }
    .setting-fun-box li{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .color-picker-box{
      width: 30px;
    }
</style>