<template>
  <div>
    <n-button @click="resetGridSort" type="error">重置顺序</n-button>
    <div class="grid">
      <div class="icon-item" v-for="item in iconList">
        <div class="item-box">
          <n-icon :component="item.value" :size="46" :color="randomHexColor()"/>
          <p>按住拖拽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import {
    AddSquare24Regular,AlertSnooze24Filled,AnimalCat24Regular,AppGeneric24Filled,
    Apps24Regular,AppsAddIn24Filled,ArchiveMultiple24Regular,ArrowCircleDown24Regular,
    ArrowCircleLeft24Regular,ArrowExpand24Regular,ArrowNext24Filled,ArrowSyncCircle24Regular,
    Attach24Regular,Balloon24Regular,Battery424Regular,Beaker24Regular,Bed24Regular,Bluetooth24Filled,
    BookLetter24Regular,Bookmark24Regular,BorderAll24Regular,Bot24Regular,Box24Regular,Braces24Filled,
    BranchFork24Regular,Briefcase24Regular,BrightnessHigh24Regular,Bug24Regular,CalendarEdit24Regular,
    Call24Regular,Cellular5G24Regular,Chat24Regular,CheckboxChecked24Regular,ChevronCircleUp24Regular,
    CircleHalfFill24Filled,Clock24Regular,ClosedCaption24Regular,Cloud24Regular,CodeCircle20Regular,
    Communication24Regular
  } from '@vicons/fluent'
  import Muuri from 'muuri';

  let iconList:any = ref([
    AddSquare24Regular,AlertSnooze24Filled,AnimalCat24Regular,AppGeneric24Filled,
    Apps24Regular,AppsAddIn24Filled,ArchiveMultiple24Regular,ArrowCircleDown24Regular,
    ArrowCircleLeft24Regular,ArrowExpand24Regular,ArrowNext24Filled,ArrowSyncCircle24Regular,
    Attach24Regular,Balloon24Regular,Battery424Regular,Beaker24Regular,Bed24Regular,Bluetooth24Filled,
    BookLetter24Regular,Bookmark24Regular,BorderAll24Regular,Bot24Regular,Box24Regular,Braces24Filled,
    BranchFork24Regular,Briefcase24Regular,BrightnessHigh24Regular,Bug24Regular,CalendarEdit24Regular,
    Call24Regular,Cellular5G24Regular,Chat24Regular,CheckboxChecked24Regular,ChevronCircleUp24Regular,
    CircleHalfFill24Filled,Clock24Regular,ClosedCaption24Regular,Cloud24Regular,CodeCircle20Regular,
    Communication24Regular
  ])
  iconList.value = iconList.value.map((item,index)=>{
    return {
      id:index+1,
      value:item
    }
  })
  let grid:any = ref({});

  function randomHexColor() {
    //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16);
    //生成ffffff以内16进制数
    while (hex.length < 6) {
      //while循环判断hex位数，少于6位前面加0凑够6位
      hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
  }

  onMounted(()=>{
    grid.value  = new Muuri('.grid',{
      dragEnabled: true,
      layoutOnInit: true,
      layout: {
        fillGaps: true,
        horizontal: false,
        rounding:true,
      },
      visibleStyles: {
        opacity: '1',
        transform: 'scale(1)'
      },
      hiddenStyles: {
        opacity: '0',
        transform: 'scale(0.5)'
      },
      sortData:{
        id:function (item:any){
          return item._id
        }
      }
    });
  })

  const resetGridSort = () => {
    grid.value.sort('id');
  }
</script>
<style scoped>
.icon-item{
  border: 1px  solid #e4e7ed;
  height: 126px;
  width: 185px;
  cursor: all-scroll;
  user-select: none;
  position: absolute;
  margin: 8px;
  /*background-color: #fff;*/
}
.item-box{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.grid{
  position: relative;
  margin-top: 10px;
}
</style>