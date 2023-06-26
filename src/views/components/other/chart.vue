<template>
  <n-grid x-gap="12" :cols="4" y-gap="12">
    <n-grid-item :span="1">
      <n-card >
        <template #header>
          折线图
        </template>
        <div>
          <div class="card-box" ref="lineChartDom"></div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card >
        <template #header>
          柱状图
        </template>
        <div>
          <div class="card-box" ref="columnChartDom"></div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          饼状图
        </template>
        <div>
          <div class="card-box" ref="cakeChartDom">

          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          散点图
        </template>
        <div>
          <div class="card-box" ref="scatterChartDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          k线图
        </template>
        <div>
          <div class="card-box" ref="kChartDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          雷达图
        </template>
        <div>
          <div class="card-box" ref="radarChartDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          矩形树图
        </template>
        <div>
          <div class="card-box" ref="treeMapDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          旭日图
        </template>
        <div>
          <div class="card-box" ref="sunburstDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          漏斗图
        </template>
        <div>
          <div class="card-box" ref="funneltDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          仪表图
        </template>
        <div>
          <div class="card-box" ref="gaugeDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card>
        <template #header>
          河流流向图
        </template>
        <div>
          <div class="card-box" ref="themeRiverDom">
          </div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
  import {ref,Ref,onMounted} from "vue";
  import * as echarts from 'echarts/core';
  import { GridComponent,TooltipComponent, LegendComponent,TitleComponent, ToolboxComponent,SingleAxisComponent } from 'echarts/components';
  import { LineChart,PieChart,ScatterChart,CandlestickChart,RadarChart,TreemapChart,SunburstChart,
    FunnelChart,GaugeChart,ThemeRiverChart,
  } from 'echarts/charts';
  import { UniversalTransition,LabelLayout } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';
  echarts.use([GridComponent, TooltipComponent,TitleComponent,LegendComponent,ToolboxComponent,SingleAxisComponent,
    TreemapChart,SunburstChart,FunnelChart,GaugeChart,ThemeRiverChart,
    PieChart,LineChart,ScatterChart,RadarChart,LabelLayout, CandlestickChart,CanvasRenderer, UniversalTransition]);

  let lineChartDom:Ref<HTMLElement|null|any> = ref(null);
  let columnChartDom:Ref<HTMLElement|null|any> = ref(null);
  let cakeChartDom:Ref<HTMLElement|null|any> = ref(null);
  let scatterChartDom:Ref<HTMLElement|null|any> = ref(null);
  let kChartDom:Ref<HTMLElement|null|any> = ref(null);
  let radarChartDom:Ref<HTMLElement|null|any> = ref(null);
  let treeMapDom:Ref<HTMLElement|null|any> = ref(null);
  let sunburstDom:Ref<HTMLElement|null|any> = ref(null);
  let funneltDom:Ref<HTMLElement|null|any> = ref(null);
  let gaugeDom:Ref<HTMLElement|null|any> = ref(null);
  let themeRiverDom:Ref<HTMLElement|null|any> = ref(null);
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid:{
      height:200,
      bottom:20,
      left:40,
      right:20
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  function initLineChart(){
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      grid:{
        height:200,
        bottom:20,
        left:40,
        right:20
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    let lineCharts = echarts.init(lineChartDom.value);
    option && lineCharts.setOption(option);
  }
  function initColumnarChart(){
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      grid:{
        height:200,
        bottom:20,
        left:40,
        right:20
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar'
        }
      ]
    };
    let columnarCharts = echarts.init(columnChartDom.value);
    option && columnarCharts.setOption(option);
  }
  /***
   * 饼状
   */
  function initCakeChart(){
    let cakeCharts = echarts.init(cakeChartDom.value);
    let option = {
      tooltip: {
        trigger: 'item'
      },
      grid:{
        height:300,
        bottom:20,
        left:20,
        right:20
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 10,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    option && cakeCharts.setOption(option);
  }
  /***
   * 散点
   */
  function initScatterChart(){
    let scatterCharts = echarts.init(scatterChartDom.value);
    let option = {
      xAxis: {},
      yAxis: {},
      grid:{
        height:160,
        bottom:20,
        left:40,
        right:20
      },
      series: [
        {
          symbolSize: 10,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ],
          type: 'scatter'
        }
      ]
    };
    option && scatterCharts.setOption(option);
  }
  /***
   * k线
   */
  function initKChart(){
    let kCharts = echarts.init(kChartDom.value);
    let option = {
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
      },
      yAxis: {},
      grid:{
        height:200,
        bottom:20,
        left:40,
        right:20
      },
      series: [
        {
          type: 'candlestick',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42]
          ]
        }
      ]
    };
    option && kCharts.setOption(option);
  }
  function initradarChart(){
    let radarCharts = echarts.init(radarChartDom.value);
    let option = {
      radar: {
        radius: '70%',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    };
    option && radarCharts.setOption(option);
  }
  function inittreeMapChart(){
    let treeMapCharts = echarts.init(treeMapDom.value);
    let option = {
      series: [
        {
          type: 'treemap',
          data: [
            {
              name: 'nodeA',
              value: 10,
              children: [
                {
                  name: 'nodeAa',
                  value: 4
                },
                {
                  name: 'nodeAb',
                  value: 6
                }
              ]
            },
            {
              name: 'nodeB',
              value: 20,
              children: [
                {
                  name: 'nodeBa',
                  value: 20,
                  children: [
                    {
                      name: 'nodeBa1',
                      value: 20
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    option && treeMapCharts.setOption(option);
  }
  function initSunburstChart(){
    let sunburstCharts = echarts.init(sunburstDom.value);
    let data = [
      {
        children: [
          {
            value: 15,
            children: [
              {
                value: 2
              },
              {
                value: 5,
                children: [
                  {
                    value: 2
                  }
                ]
              },
              {
                value: 4
              }
            ]
          },
          {
            value: 10,
            children: [
              {
                value: 5
              },
              {
                value: 1
              }
            ]
          }
        ]
      },
      {
        children: [
          {
            children: [
              {
                value: 1
              },
              {
                value: 2
              }
            ]
          }
        ]
      }
    ];
    let option = {
      series: {
        type: 'sunburst',
        // emphasis: {
        //     focus: 'ancestor'
        // },
        data: data,
        radius: [0, '100%'],
        label: {
          rotate: 'radial'
        }
      }
    };
    option && sunburstCharts.setOption(option);
  }
  function initFunneltChart(){
    let funneltCharts = echarts.init(funneltDom.value);
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '15%',
          top: 20,
          bottom: 20,
          width: '60%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '90%',
          sort: 'descending',
          gap: 2,
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' }
          ]
        }
      ]
    };
    option && funneltCharts.setOption(option);
  }
  function initGaugeChart(){
    let gaugeCharts = echarts.init(gaugeDom.value);
    let option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          radius:'100%',
          detail: {
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    };
    option && gaugeCharts.setOption(option);
  }
  function initThemeRiverChart(){
    let themeRiverCharts = echarts.init(themeRiverDom.value);
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        }
      },
      singleAxis: {
        top: 0,
        bottom: 30,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      series: [
        {
          type: 'themeRiver',
          radius:'100%',
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          data: [
            ['2015/11/08', 10, 'DQ'],
            ['2015/11/09', 15, 'DQ'],
            ['2015/11/10', 35, 'DQ'],
            ['2015/11/11', 38, 'DQ'],
            ['2015/11/12', 22, 'DQ'],
            ['2015/11/13', 16, 'DQ'],
            ['2015/11/14', 7, 'DQ'],
            ['2015/11/15', 2, 'DQ'],
            ['2015/11/16', 17, 'DQ'],
            ['2015/11/17', 33, 'DQ'],
            ['2015/11/18', 40, 'DQ'],
            ['2015/11/19', 32, 'DQ'],
            ['2015/11/20', 26, 'DQ'],
            ['2015/11/21', 35, 'DQ'],
            ['2015/11/22', 40, 'DQ'],
            ['2015/11/23', 32, 'DQ'],
            ['2015/11/24', 26, 'DQ'],
            ['2015/11/25', 22, 'DQ'],
            ['2015/11/26', 16, 'DQ'],
            ['2015/11/27', 22, 'DQ'],
            ['2015/11/28', 10, 'DQ'],
            ['2015/11/08', 35, 'TY'],
            ['2015/11/09', 36, 'TY'],
            ['2015/11/10', 37, 'TY'],
            ['2015/11/11', 22, 'TY'],
            ['2015/11/12', 24, 'TY'],
            ['2015/11/13', 26, 'TY'],
            ['2015/11/14', 34, 'TY'],
            ['2015/11/15', 21, 'TY'],
            ['2015/11/16', 18, 'TY'],
            ['2015/11/17', 45, 'TY'],
            ['2015/11/18', 32, 'TY'],
            ['2015/11/19', 35, 'TY'],
            ['2015/11/20', 30, 'TY'],
            ['2015/11/21', 28, 'TY'],
            ['2015/11/22', 27, 'TY'],
            ['2015/11/23', 26, 'TY'],
            ['2015/11/24', 15, 'TY'],
            ['2015/11/25', 30, 'TY'],
            ['2015/11/26', 35, 'TY'],
            ['2015/11/27', 42, 'TY'],
            ['2015/11/28', 42, 'TY'],
            ['2015/11/08', 21, 'SS'],
            ['2015/11/09', 25, 'SS'],
            ['2015/11/10', 27, 'SS'],
            ['2015/11/11', 23, 'SS'],
            ['2015/11/12', 24, 'SS'],
            ['2015/11/13', 21, 'SS'],
            ['2015/11/14', 35, 'SS'],
            ['2015/11/15', 39, 'SS'],
            ['2015/11/16', 40, 'SS'],
            ['2015/11/17', 36, 'SS'],
            ['2015/11/18', 33, 'SS'],
            ['2015/11/19', 43, 'SS'],
            ['2015/11/20', 40, 'SS'],
            ['2015/11/21', 34, 'SS'],
            ['2015/11/22', 28, 'SS'],
            ['2015/11/23', 26, 'SS'],
            ['2015/11/24', 37, 'SS'],
            ['2015/11/25', 41, 'SS'],
            ['2015/11/26', 46, 'SS'],
            ['2015/11/27', 47, 'SS'],
            ['2015/11/28', 41, 'SS'],
            ['2015/11/08', 10, 'QG'],
            ['2015/11/09', 15, 'QG'],
            ['2015/11/10', 35, 'QG'],
            ['2015/11/11', 38, 'QG'],
            ['2015/11/12', 22, 'QG'],
            ['2015/11/13', 16, 'QG'],
            ['2015/11/14', 7, 'QG'],
            ['2015/11/15', 2, 'QG'],
            ['2015/11/16', 17, 'QG'],
            ['2015/11/17', 33, 'QG'],
            ['2015/11/18', 40, 'QG'],
            ['2015/11/19', 32, 'QG'],
            ['2015/11/20', 26, 'QG'],
            ['2015/11/21', 35, 'QG'],
            ['2015/11/22', 40, 'QG'],
            ['2015/11/23', 32, 'QG'],
            ['2015/11/24', 26, 'QG'],
            ['2015/11/25', 22, 'QG'],
            ['2015/11/26', 16, 'QG'],
            ['2015/11/27', 22, 'QG'],
            ['2015/11/28', 10, 'QG'],
            ['2015/11/08', 10, 'SY'],
            ['2015/11/09', 15, 'SY'],
            ['2015/11/10', 35, 'SY'],
            ['2015/11/11', 38, 'SY'],
            ['2015/11/12', 22, 'SY'],
            ['2015/11/13', 16, 'SY'],
            ['2015/11/14', 7, 'SY'],
            ['2015/11/15', 2, 'SY'],
            ['2015/11/16', 17, 'SY'],
            ['2015/11/17', 33, 'SY'],
            ['2015/11/18', 40, 'SY'],
            ['2015/11/19', 32, 'SY'],
            ['2015/11/20', 26, 'SY'],
            ['2015/11/21', 35, 'SY'],
            ['2015/11/22', 4, 'SY'],
            ['2015/11/23', 32, 'SY'],
            ['2015/11/24', 26, 'SY'],
            ['2015/11/25', 22, 'SY'],
            ['2015/11/26', 16, 'SY'],
            ['2015/11/27', 22, 'SY'],
            ['2015/11/28', 10, 'SY'],
            ['2015/11/08', 10, 'DD'],
            ['2015/11/09', 15, 'DD'],
            ['2015/11/10', 35, 'DD'],
            ['2015/11/11', 38, 'DD'],
            ['2015/11/12', 22, 'DD'],
            ['2015/11/13', 16, 'DD'],
            ['2015/11/14', 7, 'DD'],
            ['2015/11/15', 2, 'DD'],
            ['2015/11/16', 17, 'DD'],
            ['2015/11/17', 33, 'DD'],
            ['2015/11/18', 4, 'DD'],
            ['2015/11/19', 32, 'DD'],
            ['2015/11/20', 26, 'DD'],
            ['2015/11/21', 35, 'DD'],
            ['2015/11/22', 40, 'DD'],
            ['2015/11/23', 32, 'DD'],
            ['2015/11/24', 26, 'DD'],
            ['2015/11/25', 22, 'DD'],
            ['2015/11/26', 16, 'DD'],
            ['2015/11/27', 22, 'DD'],
            ['2015/11/28', 10, 'DD']
          ]
        }
      ]
    };
    option && themeRiverCharts.setOption(option);
  }
  onMounted(()=>{
    initLineChart()//折线
    initColumnarChart();//柱状图
    initCakeChart();//饼状图
    initScatterChart();//散点图
    initKChart()//K线图
    initradarChart();//雷达图
    inittreeMapChart();//矩形树图
    initSunburstChart();//旭日图
    initFunneltChart();//漏斗图
    initGaugeChart();//仪表图
    initThemeRiverChart();//仪表图
  })
</script>

<style scoped>
.card-box{
  height: 200px;
}
</style>