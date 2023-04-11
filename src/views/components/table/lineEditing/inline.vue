<template>
  <div class="synthesis">
      <div class="main">
        <wTable
            :config="config"
            @customClickOk="customClickOk"
            @filterClickOK="filterClickOK"
            @filterClickCancel="filterClickCancel"
            @downClick="downClick"
            @refreshClick="refreshClick"
            @searchTagChange="searchTagChange"
            @searchClearClick="searchClearClick"
            @searchTagClose="searchTagClose"
            @searchInputChange="searchInputChange"
        >
        </wTable>
        <bulkOperations
            :data="blukData"
            :options="blukModuleOption"
            @deleteClickOk="deleteClickOk"
            @closeClick="closeClick"
        />
      </div>
  </div>
</template>

<script setup>
import wTable from '@/components/table/index.vue'
import bulkOperations from '@/components/bulk-operations/index.vue'
import {reactive, ref } from 'vue';
import {
  data,
  columns,
  checkedRowKeysRef,
  active,
  pagination,
  selectData,
  checkedRowKeys,
  config
} from './use/useTable'

const blukData = ref([]);
const blukModuleOption = reactive({
  delete:{
    key:'delete',
    code:'delete',
  }
})

/**
 * 自定义列选择完成
 */
const customClickOk = (status) => {
  console.log("自定义列选择完成",status);
}
/**
 * tag 发生修改后
 */
const searchTagChange = (item,selectOptions) => {
  console.log("搜索tag发生改变后",item, selectOptions);
}
/**
 * 清空
 * @param selectOptions
 */
const searchClearClick = (selectOptions) => {
  console.log("清空",selectOptions);
}
/**
 * tag 某一个的清空回调
 * @param selectOptions
 */
const searchTagClose = (selectOptions) => {
  console.log("tag单个关闭",selectOptions);
}
const filterClickOK = (selectOptions) => {
  console.log("筛选点击确认",selectOptions);
}
const filterClickCancel = (selectOptions) => {
  console.log("筛选点击关闭",selectOptions);
}
const downClick = () => {
  console.log("点击下载");
}
const refreshClick = () => {
  console.log("点击刷新");
}
const searchInputChange = (value,selectOptions) => {
  console.log("搜索后执行",value,selectOptions);
}

/**
 * 执行批量删除操作 delete
 * @param data
 */
const deleteClickOk = (data) => {
  console.log("执行批量删除",data);
}
/**
 * 关闭批量模块 close
 * @param data
 */
const closeClick = (data) => {
  console.log("关闭批量模块",data);
}

</script>
