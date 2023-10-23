<template>
  <div class="export-execl">
    <div class="export-head-box">
      <n-space align="center">
        文件名：
        <n-input v-model:value="fileName" placeholder="请输出要导出文件的名称"/>
        文件类型：
        <n-select v-model:value="fileType" style="width: 150px"  :options="fileTypeList"/>
        <n-button type="primary" @click="exportExecl">导出Execl</n-button>
      </n-space>
    </div>
    <div class="export-table">
      <n-data-table
          :columns="tableHeaderData"
          :data="tableData"
          :pagination="pagination"
          :bordered="true"
          :single-line="false"
          @update:checked-row-keys="updateChecked"
      />
      {{checkedRowKeys}}
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {utils, writeFile} from "xlsx";
  let fileName = ref('');
  let fileType = ref('xlsx');
  let checkedRowKeys = ref([]);
  const fileTypeList = [{
    label:'xlsx',
    value:'xlsx'
  },{
    label:'csv',
    value:'csv'
  },{
    label:'txt',
    value:'txt'
  }];

  let tableHeaderData = ref([
    {
      type: 'selection',
      align:"center"
    },
    {
      title:"序号",
      key:'key',
      align:"center"
    },
    {
      title:"标题",
      key:'title',
      align:"center"
    },
    {
      title:"作者",
      key:'author',
      align:"center"
    },
    {
      title:"访问量",
      key:'visits',
      align:"center"
    },
    {
      title:"时间",
      key:'date',
      align:"center"
    },
  ])
  let tableData = ref([
    {key:"1",title:'Hxbpwow',author:'崔生',visits:'434',date:'2020-02-12 12:02:22'},
    {key:"2",title:'Ivmocrk Olyqjgd',author:'崔生',visits:'7543',date:'2020-02-12 12:02:22'},
    {key:"3",title:'fdafda',author:'崔生',visits:'3216',date:'2020-02-12 12:02:22'},
    {key:"4",title:'gfdshgf',author:'崔生',visits:'98756',date:'2020-02-12 12:02:22'},
    {key:"5",title:'bvsfdag',author:'崔生',visits:'7655',date:'2020-02-12 12:02:22'},
    {key:"6",title:'tryfdgs',author:'崔生',visits:'6677',date:'2020-02-12 12:02:22'},
    {key:"7",title:'jhgjgf',author:'崔生',visits:'4465',date:'2020-02-12 12:02:22'},
    {key:"8",title:'fdsarrr',author:'崔生',visits:'4322',date:'2020-02-12 12:02:22'},
    {key:"9",title:'uytdfgs',author:'崔生',visits:'9774',date:'2020-02-12 12:02:22'},
    {key:"10",title:'hgfdfdbv',author:'崔生',visits:'8645',date:'2020-02-12 12:02:22'},
  ])

  let exportExecl = () => {
    let selectData = tableData.value.filter((item:any)=>{
      return checkedRowKeys.value.includes(item.key);
    })
    let worksheet =  utils.json_to_sheet(selectData);
    let workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let filename  = fileName.value == '' ? '导出数据测试' : fileName.value;
    //compression: true 对基于ZIP的格式使用ZIP压缩
    writeFile(workbook,`${filename}.${fileType.value}`, { compression: true })
  }

  let updateChecked = (rowKey:any) => {
    checkedRowKeys.value = rowKey;
  }
</script>

<style scoped>
.export-execl{
  background-color: #fff;
}
.export-head-box{
  padding-top: 14px;
  margin-left: 14px;
}
.export-table{
  padding: 14px;
}
</style>