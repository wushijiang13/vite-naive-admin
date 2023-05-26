<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="日期和时间点">
        <n-space>
          <n-date-picker v-model:value="time" type="datetime" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="选择日期范围">
        <n-space>
          <n-date-picker v-model:value="rangeTime" type="datetimerange" placeholder="选择时间范围" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="图标">
        <n-space>
          <n-date-picker type="datetimerange">
            <template #separator>
              <n-icon :size="16" :component="TrendingUpSharp" />
            </template>
            <template #date-icon>
              <n-icon :size="16" :component="RocketOutline" />
            </template>
          </n-date-picker>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import {
  TrendingUpSharp,
  RocketOutline,
} from '@vicons/ionicons5'
  import { AccessTimeFilled } from '@vicons/material'
  import {ref,Ref } from "vue";

  const time = ref(new Date())
  const time1 = ref(new Date())
  const yearTime = ref()
  const quarterTime = ref()
  const rangeTime = ref()
  const monthTime = ref()
  const shortcuts =  {
    '亲爱的生日': 1631203200000,
        '派对日': 1629216000000,
        '昨天': () => new Date().getTime() - 24 * 60 * 60 * 1000
  }
  const startTime = ref()
  const endTime = ref()
  const arbitrarilyTime = ref(1803023)
  const hours:Ref<number[]> = ref([])
  const option = ref([
    {
      label:'08:00',
      value:"08:00",
    },
    {
      label:'08:30',
      value:'08:30',
    },
    {
      label:'09:00',
      value:"09:00"
    },
    {
      label:'09:30',
      value:"09:30"
    },
    {
      label:"10:00",
      value:"10:00"
    }
  ])
  for (let i = 8; i < 18; i++) {
      hours.value.push(i);
  }
</script>

<style scoped>

</style>