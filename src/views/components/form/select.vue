<template>
  <div>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="行政区划">
        <n-space>
          <div class="select-sl">
          <n-cascader
              v-model:value="value"
              clearable
              placeholder="请选择"
              :options="options"
              :check-strategy="'child'"
              :value-field="'code'"
              :label-field="'name'"
          />
          </div>
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="树选择">
        <n-space>
          <n-tree-select
              class="select-sl"
              multiple
              cascade
              checkable
              :max-tag-count="'responsive'"
              :check-strategy="checkTree"
              :options="options1"
              @update:value="handleUpdateValue"
          />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础用法">
        <n-space>
          <n-select class="select-sl"  v-model:value="value2" :options="options2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="有禁用选项">
        <n-space>
          <n-select class="select-sl" disabled v-model:value="value2" :options="options2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="可清空单选">
        <n-space>
          <n-select class="select-sl" clearable  v-model:value="value3" :options="options2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="基础多选">
        <n-space>
          <n-select class="select-sl" multiple  v-model:value="value4" :options="options2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions bordered label-placement="top" class="desc-box">
      <n-descriptions-item label="可搜索">
        <n-space>
          <n-select class="select-sl"  filterable  v-model:value="value5" :options="options2" />
        </n-space>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,Ref } from 'vue'
const value = ref(null)
const value2 = ref('1')
const value3 = ref('1')
const value4 = ref('1')
const value5 = ref('1')
const checkTree = ref('1')
const options:Ref<any[]> = ref([])
const options1 = ref([
  {
    label: 'Rubber Soul',
    key: 'Rubber Soul',
    children: [
      {
        label:
            "Everybody's Got Something to Hide Except Me and My Monkey",
        key: "Everybody's Got Something to Hide Except Me and My Monkey"
      },
      {
        label: 'Drive My Car',
        key: 'Drive My Car',
      },
      {
        label: 'Norwegian Wood',
        key: 'Norwegian Wood'
      },
      {
        label: "You Won't See",
        key: "You Won't See",
      },
      {
        label: 'Nowhere Man',
        key: 'Nowhere Man'
      },
      {
        label: 'Think For Yourself',
        key: 'Think For Yourself'
      },
      {
        label: 'The Word',
        key: 'The Word'
      },
      {
        label: 'Michelle',
        key: 'Michelle',
      },
      {
        label: 'What goes on',
        key: 'What goes on'
      },
      {
        label: 'Girl',
        key: 'Girl'
      },
      {
        label: "I'm looking through you",
        key: "I'm looking through you"
      },
      {
        label: 'In My Life',
        key: 'In My Life'
      },
      {
        label: 'Wait',
        key: 'Wait'
      }
    ]
  },
  {
    label: 'Let It Be',
    key: 'Let It Be Album',
    children: [
      {
        label: 'Two Of Us',
        key: 'Two Of Us'
      },
      {
        label: 'Dig A Pony',
        key: 'Dig A Pony'
      },
      {
        label: 'Across The Universe',
        key: 'Across The Universe',
        children: [
          {
            label: 'Dig It',
            key: 'Dig It'
          },
          {
            label: 'go',
            key: 'go'
          }
        ]
      }
    ]
  }
])
const options2 = ref([
  {
    label:'将近酒',
    value:"1",
  },
  {
    label:'出师表',
    value:"2",
  },
  {
    label:'诫子书',
    value:"3",
  },
])

const initCity  = () => {
  fetch('./city/pca-code.json').then(res=>res.json()).then((json:any[])=>{
    console.log(json);
    options.value = json;
  })
}

onMounted(()=>{
  initCity();
})

</script>
<style scoped>

</style>
