<template>
    <div class="overivew">
      <n-grid x-gap="12" :cols="4">
        <n-grid-item :span="1">
          <n-card >
            <template #header>
              访问量
            </template>
            <template #header-extra>
              <span class="day">日</span>
            </template>
            <div>
            <div class="visits" ref="visits"></div>
            </div>
            <template #footer>
              <div class="card-footer">
                日均访问量: 31,332
              </div>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item :span="1">
          <n-card >
            <template #header>
              授权树
            </template>
            <template #header-extra>
              <span class="week">周</span>
            </template>
            <div>
              <div class="empower" ref="empower"></div>
            </div>
            <template #footer>
              <div class="card-footer">
                授权数: 12,041
              </div>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item :span="2">
          <n-card>
            <template #header>
              信息
            </template>
            <template #header-extra>
              <span class="info">
                当前版本：V10.5.0   部署时间：2023-02-22 18:47:26
              </span>
            </template>
            <div>
              <div class="empower">
                <n-data-table
                    size="small"
                    :single-line="false"
                    :columns="columns"
                    :data="data"
                />
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>

      <n-grid class="grid-2" x-gap="12" :cols="8">
        <n-grid-item v-for="item in matrixList" :span="1">
          <n-card title="访问量">
            <template #footer>
              {{item.name}}
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { LineChart,BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {ref, onMounted, nextTick, h} from 'vue';
import { NButton } from 'naive-ui'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent,
  TooltipComponent,BarChart]);
let visits = ref<HTMLElement | null>(null);
let empower = ref<HTMLElement | null>(null);
let columns = ref<Object[]>([]);
let data = ref<Object[]>([]);
let matrixList = [
  {
    name:'随机换肤',
    icon:"",
  },
  {
    name:'主题配置',
    icon:'',
  },
  {
    name:"网站升级",
    icon:'',
  },
  {
    name:"百度一下",
    icon:'',
  },
  {
    name:'视频播放器',
    icon:''
  },
  {
    name:'表格',
    icon:''
  },
  {
    name:'源码',
    icon:''
  },
  {
    name:"公告",
    icon:''
  }
]

/**
 * 访问量
 */
function visitsInit(){
  let option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2.21', '2.22', '2.23', '2.24', '2.25', '2.26', '2.27']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid:{
      height:130,
      bottom:20,
      left:40,
      right:20
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  };
  let myChart = echarts.init((visits.value as HTMLElement));
  option && myChart.setOption(option);
}
/*
*授权数
 */
function empowerInit(){
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid:{
      height:130,
      bottom:20,
      left:40,
      right:20
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  let myChart = echarts.init((empower.value as HTMLElement));
  option && myChart.setOption(option);
}
/**
 *信息表格
 */
function tableInit(){
  columns.value = [
    {
      key: 'name',
      className:'dis-key',
      align:'right',
      width:170,
    },
    {
      key: 'version',
      colSpan: (rowData:object, rowIndex:number) => (rowIndex === 3 ? 3 : 1),
      render:(rowData:{version:string}, rowIndex: number)=>{
        if(rowIndex === 3){
          return [h(NButton,{type:"info",class:'btn',size:"small"},{default:()=> "免费开源"}),
            h(NButton,{type:"warning", class:'btn',size:"small"},{default:()=>"持续维护"})]
        }
        return `${rowData.version}`
      },
      width:170,
    },
    {
      key:'name2',
      className:'dis-key',
      align:'right',
      width:170,
    },
    {
      key:"version2",
      width:170,
    }
  ]
  data.value = [
    {
      "name":'vue',
      "version":'^3.2.47',
      "name2":'unplugin-auto-import',
      "version2":'^0.14.2',
    },
    {
      "name":'pinia',
      "version":'^2.0.30',
      "name2":'unplugin-auto-import',
      "version2":'^0.14.2',
    },
    {
      "name":'typescript',
      "version":'^4.9.5',
      "name2":'unplugin-auto-import',
      "version2":'^0.14.2',
    },
    {
      "name":'授权渠道',
      "version":'^4.9.5',
    }
  ];
}


onMounted(()=>{
  visitsInit()
  empowerInit()
  tableInit();
  nextTick(()=>{
    (document.querySelector(".n-data-table-thead") as HTMLElement).style.display="none";
  })
})

</script>

<style scoped>
.overivew{
}
.grid-2{
  margin-top: var(--theme-top-spacing);
}
.day{
  background-color:#edf8e9 ;
  color: #29d27a;
  padding: 2px 10px;
}
.week{
  background-color:#fdf5ea;
  color: #feca70;
  padding: 2px 10px;
}
.info{
  background-color:#d1e9ff;
  color: #1890ff;
  padding: 2px 10px;
  font-size: 13px;
}
.visits,.empower{
  min-height: 170px;
}
.card-footer{
  height: 40px;
  text-align: center;
  display: flex;
  line-height: 40px;
  font-size: 14px;
  border-top: 1px solid #000000;
}


</style>
<style>
.btn{
  font-size: 12px !important;
  margin-left: 10px !important;
}
.dis-key {
  background-color: #f6f6f6 !important;
}
</style>