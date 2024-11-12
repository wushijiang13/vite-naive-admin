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
                当前版本：V10.5.0   部署时间：2024-11-12 18:47:26
              </span>
          </template>
          <div>
            <div class="table-box">
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
    <n-grid class="grid-box" x-gap="12" :cols="8">
      <n-grid-item v-for="item in matrixList" :span="1" @click="matrixExecute(item.key)">
        <n-card class="card-function">
          <n-space vertical :align="'center'">
            <n-icon :component="item.icon" :color="item.color" size="50" :depth="1" />
            {{item.name}}
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-grid class="grid-box" x-gap="12" :cols="8">
      <n-grid-item :span="4">
        <n-card>
          <template #header>
            信息
          </template>
          <template #header-extra>
              <span class="info">
                当前版本：V10.5.0   部署时间：2024-11-12 18:47:26
              </span>
          </template>
          <div>
            <div class="table-box">
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
      <n-grid-item :span="4">
        <n-card>
          <template #header>
            开源信息
          </template>
          <template #header-extra>
              <span class="info">
                爱我别走~
              </span>
          </template>
          <div>
            <div class="table-box">
              <n-grid x-gap="12" :cols="1">
                <n-gi v-for="item in codeFrameList">
                  <div class="open-code-box" >
                    <div class="open-code-box-left" @click="jumpUrl(item.url)">
                      <p>{{item.name}}</p>
                      <p>{{item.content}}</p>
                    </div>
                    <div class="open-code-box-right">
                      <img :src="item.src"/>
                    </div>
                  </div>
                </n-gi>
              </n-grid>
            </div>
          </div>
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
import { NButton,NSpace,useMessage } from 'naive-ui'
import { AllApplication, Theme, UploadTwo, PlayTwo, TableFile, FolderCode, Remind, BrowserChrome } from '@icon-park/vue-next'
import { useSettingStore } from '@pinia/setting'
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent,
  TooltipComponent,BarChart]);
let message = useMessage();
let visits = ref<HTMLElement | null>(null);
let empower = ref<HTMLElement | null>(null);
let columns = ref<Object[]>([]);
let data = ref<Object[]>([]);
let settingStore =  useSettingStore();
let matrixList = [
  {
    name:'随机换肤',
    key:'random',
    icon:AllApplication,
    color:'#87dc64',
  },
  {
    name:'主题配置',
    key:'theme',
    icon:Theme,
    color:'#59b5fb',
  },
  {
    name:"网站升级",
    key:'upgrade',
    icon:UploadTwo,
    color:'#ffd367',
  },
  {
    name:"Google",
    key:'google',
    icon:BrowserChrome,
    color:'#ffd367',
  },
  {
    name:'视频播放器',
    key:'video',
    icon:PlayTwo,
    color:'#ffba67'
  },
  {
    name:'表格',
    key:'table',
    icon:TableFile,
    color:'#48d6cd'
  },
  {
    name:'源码',
    key:'code',
    icon:FolderCode,
    color:'#ab6ee3'
  },
  {
    name:"公告",
    key:'announcement',
    icon:Remind,
    color:'#ff78b6'
  },
]
let codeFrameList = [
  {name:"vue-naive-admin",content:"一款绝佳的中后台前端开发管理框架",src:"/src/assets/logo.png",url:"https://github.com/wushijiang13/vite-naive-admin"},
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
      minWidth:100,
    },
    {
      key: 'version',
      colSpan: (rowData:object, rowIndex:number) => (rowIndex === 3 ? 3 : 1),
      render:(rowData:{version:string}, rowIndex: number)=>{
        if(rowIndex === 3){
          return h(NSpace,{},{default:()=>[
              h(NButton,{type:"info",size:"small"},{default:()=> "免费开源"}),
              h(NButton,{type:"warning", size:"small"},{default:()=>"持续维护"})
            ]})
        }
        return `${rowData.version}`
      },
      minWidth:100,
    },
    {
      key:'name2',
      className:'dis-key',
      align:'right',
      minWidth:100,
    },
    {
      key:"version2",
      minWidth:100,
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
/**
 * 矩阵模块执行
 */
function matrixExecute(key:String){
  switch (key) {
    case 'random':{

      break;
    }
    case 'theme':{
      settingStore.themeShowDrawer()
      break;
    }
    case 'upgrade':{
      break;
    }
    case 'google':{
      window.open("https://www.baidu.com")
      break;
    }
    case 'video':{
      break;
    }
    case 'table':{
      break;
    }
    case 'code':{
      settingStore.copySourceCode()
      break;
    }
    case 'announcement':{
      message.info(
          "敬请期待~",
          {
            keepAliveOnHover: true
          }
      )
      break;
    }
  }
}
function jumpUrl(url:string){
  window.open(url);
}
onMounted(()=>{
  visitsInit()
  empowerInit()
  tableInit()
  nextTick(()=>{
    (document.querySelector(".n-data-table-thead") as HTMLElement).style.display="none";
  })
})
</script>

<style scoped>
.overivew{
  color: var(--theme-color);
}
.grid-box{
  margin-top: var(--theme-top-spacing);
}
.card-function{
  cursor: pointer;
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
.table-box{
  width: 90%;
  margin: 0px auto;
  height: 230px;
}
.card-footer{
  height: 40px;
  text-align: center;
  display: flex;
  line-height: 40px;
  font-size: 14px;
  border-top: 1px solid #000000;
}
.open-code-box{
  background: linear-gradient(50deg, #1890ff, #77e19d);
  height: 100px;
  display: inline-flex;
  align-items: center;
  color:#fff;
  border-radius: 5px;
  padding: 0px 20px;
  cursor: pointer;
  transition: 0.6s;
}
.open-code-box:hover{
  transform: scale(1.05);
}
.open-code-box-right img{
  height: 60px;
}
</style>
<style>
.btn{
  font-size: 12px !important;
  margin-left: 10px !important;
}
.dis-key {
  background-color: var(--theme-back-color) !important;
}
.overivew .n-card > .n-card__content{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>