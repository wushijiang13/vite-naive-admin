<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="固定时间点">
        <n-space>
          <n-date-picker v-model:value="time" type="date" placeholder="选择时间"/>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="固定时间范围">
        <n-space>
          <n-time-picker v-model:value="startTime"  :hours="hours"	 placeholder="开始时间" format="h:mm a"/>
          <n-time-picker v-model:value="endTime" :hours="hours"  placeholder="结束时间" format="h:mm a"/>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="任意时间点">
        <n-space>
          <n-time-picker v-model:value="arbitrarilyTime"  placeholder="选择时间" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
  import {ref,Ref } from "vue";

  const time = ref()
  const startTime = ref()
  const endTime = ref()
  const arbitrarilyTime = ref(1803023)
  const hours:Ref<number[]> = ref([])

  for (let i = 8; i < 18; i++) {
      hours.value.push(i);
  }
</script>

<style scoped>

</style>