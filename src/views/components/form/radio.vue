<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-radio-group v-model:value="checkedValue" name="radiogroup">
            <n-radio
                value="value1"
                name="basic-demo">
              选项1
            </n-radio>
            <n-radio
                value="value2"
                name="basic-demo">
              选项2
            </n-radio>
          </n-radio-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="禁用状态">
        <n-space>
          <n-radio-group v-model:value="checkedValue2" disabled name="radiogroup2">
            <n-radio
                value="value1"
                name="basic-demo">
              选项1
            </n-radio>
            <n-radio
                value="value2"
                name="basic-demo">
              选项2
            </n-radio>
          </n-radio-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="单选框组">
        <n-space>
          <n-radio-group v-model:value="checkedValue3" name="radiogroup3">
            <n-radio
                value="value1"
                name="basic-demo">
              选项1
            </n-radio>
            <n-radio
                value="value2"
                name="basic-demo">
              选项2
            </n-radio>
            <n-radio
                value="value3"
                name="basic-demo">
              选项3
            </n-radio>
          </n-radio-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="按钮样式">
        <n-space>
          <n-radio-group v-model:value="checkedValue4" name="radiogroup4">
            <n-radio-button
                value="value1"
                name="basic-demo">
              选项1
            </n-radio-button>
            <n-radio-button
                value="value2"
                name="basic-demo">
              选项2
            </n-radio-button>
            <n-radio-button
                value="value3"
                name="basic-demo">
              选项3
            </n-radio-button>
          </n-radio-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="不同尺寸">
        <n-space vertical>
          <n-radio-group v-model:value="checkedValue5" name="radiogroup5"  size="small">
            <n-radio-button
                value="value1"
                name="basic-demo">
              选项1
            </n-radio-button>
            <n-radio-button
                value="value2"
                name="basic-demo">
              选项2
            </n-radio-button>
            <n-radio-button
                value="value3"
                name="basic-demo">
              选项3
            </n-radio-button>
          </n-radio-group>
          <n-radio-group v-model:value="checkedValue6" name="radiogroup6"  size="medium">
            <n-radio-button
                value="value1"
                name="basic-demo">
              选项1
            </n-radio-button>
            <n-radio-button
                value="value2"
                name="basic-demo">
              选项2
            </n-radio-button>
            <n-radio-button
                value="value3"
                name="basic-demo">
              选项3
            </n-radio-button>
          </n-radio-group>
          <n-radio-group v-model:value="checkedValue7" name="radiogroup7"  size="large">
            <n-radio-button
                value="value1"
                name="basic-demo">
              选项1
            </n-radio-button>
            <n-radio-button
                value="value2"
                name="basic-demo">
              选项2
            </n-radio-button>
            <n-radio-button
                value="value3"
                name="basic-demo">
              选项3
            </n-radio-button>
          </n-radio-group>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const checkedValue = ref('value1');
  const checkedValue2 = ref('value1');
  const checkedValue3 = ref('value1');
  const checkedValue4 = ref('value1');
  const checkedValue5 = ref('value1');
  const checkedValue6 = ref('value1');
  const checkedValue7 = ref('value1');
</script>

<style scoped>

</style>