<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space vertical>
          <div class="slider-box">
            默认<br/>
            <n-slider  :step="1" />
          </div>
          <div class="slider-box">
            自定义初始值<br/>
            <n-slider v-model:value="initValue"  :step="1" />
          </div>
          <div class="slider-box">
            隐藏 Tooltip<br/>
            <n-slider v-model:value="hiddenValue" :tooltip="false" :step="1" />
          </div>
          <div class="slider-box">
            格式化 Tooltip<br/>
            <n-slider v-model:value="formatValue" :format-tooltip="formatTooltip"   :step="1" />
          </div>
          <div class="slider-box">
            禁用<br/>
            <n-slider v-model:value="disabledValue" disabled :step="1" />
          </div>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="离散值">
        <n-space vertical>
          <div class="slider-box">
            不显示间断点<br/>
            <n-slider v-model:value="noShowStep"  :step="10" />
          </div>
          <div class="slider-box">
            显示间断点<br/>
            <n-slider v-model:value="showStep" :marks="marks"  :step="marks" />
          </div>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="带有输入框">
        <n-space vertical>
          <div class="slider-box justify-around">
            <n-slider v-model:value="inputStep"  :step="1" />
            <n-input-number v-model:value="inputStep" style=" width: 300px; margin-left: 50px" />
          </div>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="范围选择">
        <n-space vertical>
          <div class="slider-box">
            <n-slider v-model:value="rangeStep" range :step="1" />
          </div>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { ref,Ref } from 'vue';
  const initValue = ref(40)
  const hiddenValue = ref(20)
  const disabledValue = ref(20)
  const noShowStep = ref(20)
  const formatValue = ref(0)
  const showStep = ref(0)
  const inputStep = ref(0)
  const rangeStep = ref([20,30])
  const marks:Ref<any> = ref({})
  for (let i = 0; i <= 10; i++) {
    let key = i*10;
    marks.value[key] = key;
  }
  const formatTooltip = (value:number) =>{
    return `百分之${value}`
  }
</script>

<style scoped>
.slider-box {
  width: 100%;

}
.justify-around{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>