<template>
    <div class="screen">
      <wTable
        :config="config"
        @customClickOk="customClickOk"
        @customClickCancel="customClickCancel"
        @filterClickOK="filterClickOK"
        @filterClickCancel="filterClickCancel"
        @downClick="downClick"
        @refreshClick="refreshClick"
        @searchTagChange="searchTagChange"
        @searchClearClick="searchClearClick"
        @searchTagClose="searchTagClose">
        <template v-slot:table-btn="{msg}">
          <div>
            左侧插槽
          </div>
        </template>
        <template v-slot:table-select-slot="{msg}">
          <div>
            右侧扩充插槽
          </div>
        </template>
      </wTable>
    </div>
</template>

<script setup lang="ts">
    import wTable from '@/components/table/index.vue'
    import {reactive, ref, h } from 'vue';
    import { NSwitch } from 'naive-ui'
    const checkedRowKeysRef = ref([])
    let active = ref(false);
    function createCols () {
      return [
        {
          type: 'selection',
          options: [
            'all',
            'none',
            {
              label: '选中前 2 行',
              key: 'f2',
              onSelect: (pageData) => {
                checkedRowKeysRef.value = pageData
                    .map((row) => row.key)
                    .slice(0, 2)
              }
            }
          ],
          disabled (row) {
            return row.name === 'Edward King 3'
          },
        },
        {
          title: '开启/关闭',
          key: 'switch',
          render(){
            return h(
                NSwitch,
                {
                  modelValue:active,
                },
                {  }
            )
          },
        },
        {
          title: 'Name',
          key: 'name',
          ellipsis:true,
        },
        {
          title: 'physicsAttack',
          key: 'physicsAttack',
          ellipsis:true,
          fixed:true,
        },
        {
          title: 'magicAttack',
          key: 'magicAttack',
          ellipsis:true,
          fixed:true,
        },
        {
          title: 'defend',
          key: 'defend',
          ellipsis:true,
          fixed:false,
        },
        {
          title: 'speed',
          key: 'speed',
          ellipsis:true,
          fixed:false,
        }
      ]
    }
    function createData () {
      return Array.apply(null, { length: 50 }).map((_, i) => {

        return {
          key: i,
          name: `name_${i}`,
          physicsAttack: `physicsAttack_${i}`,
          magicAttack: `magicAttack_${i}`,
          defend: `defend_${i}`,
          speed: `speed_${i}`
        }
      })
    }
    const data = ref(createData());
    const columns= ref(createCols());
    const pagination= ref({
      pageSize: 10,
      showQuickJumper:true,
      pageSizes:[10, 20, 30, 40],
      showSizePicker:true,
    })
    const selectData=[
      {
        label: "不限",
        value: 'song0',
      },
      {
        label: '很多',
        value: 'song1'
      },
      {
        label: '很多多',
        value: 'song2'
      },
    ]
    const config = reactive({
      tableOption:{
        "data":data,
        'columns':columns,
        'single-line':false,
        'pagination':pagination
      },
      moduleColOptions:{
        down:{
          isShow:true,
          code:"down",
        },
        refresh:{
          isShow:true,
          code:"refresh",
        },
        filter:{
          isShow:true,
          code:"filter",
        },
        custom:{
          isShow:true,
          code:'custom',
        }
      },
      selectOptions:[
        {
          options:{
            label:'计划',
            value:'',
            type:"text",
            placeholder:"计划ID或者关键字",
          },
          defaultValue:{
            value: '',
          },
        },
        {
          options:{
            label:'推广id',
            value:'song0',
            type:"select",
            options:selectData,
            placeholder:"请选择推广id",
          },
          defaultValue:{
            label: "不限",
            value: 'song0',
          },
        },
        {
          options:{
            label:'订单时间',
            value:null,
            type:"datetime",
            placeholder:"请选择订单时间",
          },
          defaultValue:{
            value: null,
          },
        },
        {
          options:{
            label:'创意名称',
            value:'',
            type:"text",
            placeholder:"创意ID或者关键字",
          },
          defaultValue:{
            value: '',
          },
        },
      ],
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
    const customClickCancel = (option) => {
      console.log("自定义列点击关闭",option);
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
</script>

<style scoped>
.screen{
}
</style>