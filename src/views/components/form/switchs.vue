<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-switch v-model:value="active" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="文字描述">
        <n-space>
          文字描述<n-switch v-model:value="active" />文字描述
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="禁用状态">
        <n-space>
          <n-switch v-model:value="active" disabled>
          </n-switch>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="内容">
        <n-space>
          <n-switch v-model:value="active">
            <template #checked>
              隐约雷鸣 阴霾天空
            </template>
            <template #unchecked>
              但盼风雨来 能留你在此
            </template>
          </n-switch>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="形状">
        <n-space>
          <n-switch :round="false" />
          <n-switch />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="形状">
        <n-space>
          <n-switch v-model:value="active" size="medium">
            <template #icon>
              🤔
            </template>
          </n-switch>
          <n-switch v-model:value="active" size="large">
            <template #checked-icon>
              <n-icon :component="ArrowForwardOutline" />
            </template>
            <template #unchecked-icon>
              <n-icon :component="ArrowBackOutline" />
            </template>
          </n-switch>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { ArrowBackOutline, ArrowForwardOutline } from '@vicons/ionicons5'
  import { ref } from 'vue';
  const active = ref(null)
</script>

<style scoped>

</style>