<template>
  <div class="print-box">
    <n-space>
      <n-button type="primary" @click="printImage">打印图片</n-button>
      <n-button type="primary" @click="printHTML">打印表格</n-button>
      <n-button type="primary" @click="customPrintModal">自定义打印</n-button>
    </n-space>
    <img ref="imgRef" class="img-box"
        src="https://img0.baidu.com/it/u=2728763594,387445797&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"/>
    <n-data-table
        :columns="columns"
        :data="data"
        id="data-table-ref"
    />
    <n-modal
        v-model:show="showModal"
        preset="card"
        title="自定义打印"
        style="width: 360px">
        <n-input
            v-model:value="customValue"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="请输入自定义打印内容"
        />
        <template #footer>
          <n-space :justify="'end'">
            <n-button  @click="closeModal">取消</n-button>
            <n-button type="primary" @click="customPrint">打印</n-button>
          </n-space>
        </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import printJS from "print-js";
import { ref } from 'vue';
const imgRef:any = ref(null);
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]
const data = ref([
  {name:"谁言人族无大帝",age:"999",address:'缥缈'},
  {name:"谁言人族无大帝",age:"999",address:'缥缈'},
  {name:"谁言人族无大帝",age:"999",address:'缥缈'},
  {name:"谁言人族无大帝",age:"999",address:'缥缈'},
  {name:"谁言人族无大帝",age:"999",address:'缥缈'},
])
const showModal = ref(false);
const customValue = ref('<h1>vite-naive-admin</h1><h2>https://github.com/wushijiang13/vite-naive-admin</h2>');

const printImage = () => {
  printJS(imgRef.value.src,'image')
}
const printHTML = () => {
  printJS({printable:'data-table-ref',targetStyles:['*'],type:'html',documentTitle:'vite-naive-admin'})
}
const customPrintModal = () => {
  showModal.value = true;
}
const customPrint = () => {
  showModal.value = false;
  printJS({printable:customValue.value,type:'raw-html',documentTitle:'vite-naive-admin'})
}
const closeModal = () => {
  showModal.value = false;
}

</script>

<style scoped>
.print-box{
  width: 500px;
}
.img-box{
  width: 100%;
  margin-top: 10px;
}
#data-table-ref{
  margin-top: 10px;
}
@media print {
  .n-scrollbar-container {
    overflow: hidden !important;
  }
}
</style>