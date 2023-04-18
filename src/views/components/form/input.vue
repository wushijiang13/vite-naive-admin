<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-input type="text" placeholder="请输入" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="禁用状态">
        <n-space>
          <n-input type="text" placeholder="请输入" disabled />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="可清空">
        <n-space>
          <n-input type="text" placeholder="请输入" clearable />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="密码框">
        <n-space>
          <n-input type="password" placeholder="请输入" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="带icon的输入框">
        <n-space>
          <n-input placeholder="搜索">
            <template #prefix>
              <n-icon :component="Search" />
            </template>
          </n-input>
          <n-input placeholder="搜索">
            <template #suffix>
              <n-icon :component="Search" />
            </template>
          </n-input>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="复合型输入框">
        <n-space>
          <n-input-group>
            <n-input-group-label>https://www.</n-input-group-label>
            <n-input :style="{ width: '33%' }" />
            <n-input-group-label>.com</n-input-group-label>
          </n-input-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="textarea">
        <n-space>
          <n-input type="textarea" maxlength="30" show-count />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@vicons/ionicons5'
</script>
