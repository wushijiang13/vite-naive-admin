<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-input-number v-model:value="value" clearable />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="禁用状态">
        <n-space>
          <n-input-number v-model:value="value1" disabled />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="步数">
        <n-space>
          <n-input-number v-model:value="value2" clearable :step="2"  />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="精度">
        <n-space>
          <n-input-number v-model:value="value3" clearable :precision="2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="按钮位置">
        <n-space>
          <n-input-number v-model:value="value4" clearable button-placement="both" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@vicons/ionicons5'
import { ref } from 'vue';

const value = ref(1);
const value1 = ref(1);
const value2 = ref(1);
const value3 = ref(1);
const value4 = ref(1);
</script>
