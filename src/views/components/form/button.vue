<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-button>Default</n-button>
          <n-button type="tertiary">
            Tertiary
          </n-button>
          <n-button type="primary">
            Primary
          </n-button>
          <n-button type="info">
            Info
          </n-button>
          <n-button type="success">
            Success
          </n-button>
          <n-button type="warning">
            Warning
          </n-button>
          <n-button type="error">
            Error
          </n-button>
          <n-button strong secondary>
            Default
          </n-button>
          <n-button strong secondary type="tertiary">
            Tertiary
          </n-button>
          <n-button strong secondary type="primary">
            Primary
          </n-button>
          <n-button strong secondary type="info">
            Info
          </n-button>
          <n-button strong secondary type="success">
            Success
          </n-button>
          <n-button strong secondary type="warning">
            Warning
          </n-button>
          <n-button strong secondary type="error">
            Error
          </n-button>
          <n-button strong secondary round>
            Default
          </n-button>
          <n-button strong secondary round type="primary">
            Primary
          </n-button>
          <n-button strong secondary round type="info">
            Info
          </n-button>
          <n-button strong secondary round type="success">
            Success
          </n-button>
          <n-button strong secondary round type="warning">
            Warning
          </n-button>
          <n-button strong secondary round type="error">
            Error
          </n-button>
          <n-button strong secondary circle>
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="primary">
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="success">
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="warning">
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon><cash-icon /></n-icon>
            </template>
          </n-button>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="禁用状态">
        <n-space>
          <n-button disabled>Default</n-button>
          <n-button type="tertiary" disabled>
            Tertiary
          </n-button>
          <n-button type="primary" disabled>
            Primary
          </n-button>
          <n-button type="info" disabled>
            Info
          </n-button>
          <n-button type="success" disabled>
            Success
          </n-button>
          <n-button type="warning" disabled>
            Warning
          </n-button>
          <n-button type="error" disabled>
            Error
          </n-button>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="文字按钮">
        <n-space>
          <n-button text>Default</n-button>
          <n-button type="tertiary" text>
            Tertiary
          </n-button>
          <n-button type="primary" text>
            Primary
          </n-button>
          <n-button type="info" text>
            Info
          </n-button>
          <n-button type="success" text>
            Success
          </n-button>
          <n-button type="warning" text>
            Warning
          </n-button>
          <n-button type="error" text>
            Error
          </n-button>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="图标按钮">
        <n-space>
          <n-button>
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Default
          </n-button>
          <n-button type="tertiary">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Tertiary
          </n-button>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Primary
          </n-button>
          <n-button type="info">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Info
          </n-button>
          <n-button type="success">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Success
          </n-button>
          <n-button type="warning">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Warning
          </n-button>
          <n-button type="error">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            Error
          </n-button>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="按钮组">
        <n-space>
          <n-button-group>
            <n-button ghost>
              <template #icon>
                <n-icon><ArrowCircleLeft32Regular /></n-icon>
              </template>
              上一页
            </n-button>
            <n-button ghost>
              <template #icon>
                <n-icon><ArrowCircleRight32Regular /></n-icon>
              </template>
              下一页
            </n-button>
          </n-button-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="不同尺寸">
        <n-space>
          <n-button size="tiny">tiny</n-button>
          <n-button size="small">small</n-button>
          <n-button size="medium">medium</n-button>
          <n-button size="large">large</n-button>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { ArrowCircleLeft32Regular, ArrowCircleRight32Regular } from '@vicons/fluent'
</script>
