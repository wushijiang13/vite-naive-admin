<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-rate />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="辅助文字">
        <n-space>
          <n-rate v-model:value="value" />
          {{secondaryMap[value]}}
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="只读">
        <n-space>
          <n-rate readonly :default-value="3"/>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import {ref,Ref } from "vue";

const value:Ref<Number> = ref(0);
const secondaryMap  = {
  0:"非常差",
  1:"差",
  2:"一般",
  3:"棒",
  4:"超级棒",
  5:"完美",
}

</script>

<style scoped>

</style>