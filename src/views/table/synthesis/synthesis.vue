<template>
  <div class="synthesis">
      <div class="head">
        <div class="search-option">
          <n-grid x-gap="12" :y-gap="18" :cols="6">
            <n-gi v-for="item in searchShowMods">
              标题 <n-input v-model:value="value" type="text" style="width: 82%;margin-left: 10px" placeholder="基本的 Input" />
            </n-gi>
            <n-gi>
              <n-grid x-gap="12" :y-gap="8" :cols="3">
                <n-gi>
                  <n-button type="primary" color="#8a2be2">
                    <template #icon>
                      <Search/>
                    </template>
                    查询
                  </n-button>
                </n-gi>
                <n-gi>
                  <n-button type="primary" color="#8a2be2" @click="setSearchBox ">
                    <template #icon>
                      <ChevronUp v-if="isSearchShow"/>
                      <ChevronDown v-else/>
                    </template>
                    合并
                  </n-button>
                </n-gi>
              </n-grid>
            </n-gi>
          </n-grid>
        </div>
      </div>
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
import { Search } from '@vicons/carbon'
import { ChevronUp,ChevronDown } from '@vicons/ionicons5'
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
const searchMods = Array.apply(null,{length:8});
const searchShowMods = ref(searchMods);

//展示区域默认展示
const isSearchShow = ref(true);

/**
 * 设置合并
 */
function setSearchBox(){
  isSearchShow.value = !isSearchShow.value;
  searchShowMods.value = isSearchShow.value ? searchMods : searchMods.slice(0,2);
}
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

<style scoped>

</style>