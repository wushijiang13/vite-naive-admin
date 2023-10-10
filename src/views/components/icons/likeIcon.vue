<template>
  <div class="like-icon">
    <add-pic theme="outline" size="20" />
      <n-space align="center">
        图标名称
        <n-input v-model:value="searchValue" @keydown.enter="searchIcon()"/>
        <n-button @click="searchIcon()">
          <template #icon>
            <n-icon :component="IconMap.Search">
            </n-icon>
          </template>
          查询
        </n-button>
        文字大小
        <n-input-number v-model:value="iconNumber" style="width: 90px" button-placement="both" :max="30" :min="12"></n-input-number>px
        <n-checkbox v-model:checked="isColorIcon">多彩图标</n-checkbox>
      </n-space>
      <div class="icon-show-box">
        <n-grid x-gap="12" y-gap="12" :cols="12">
          <n-gi v-for="(item,index) in iconList" :key="item">
            <div class="icon-gi-item">
              <div class="border-gi card-box-border" @click="copyCode(item)">
                  <n-icon :component="item" :size="iconNumber" :color="getColor()">
                  </n-icon>
                  <div class="icon-copy-box">
                    <div class="icon-copy">
                      点击复制
                    </div>
                  </div>
              </div>
              {{item.name}}
            </div>
          </n-gi>
        </n-grid>
        <n-space style="margin-top: 20px" align="center" justify="center">
          <n-pagination
              v-model:page="page"
              :item-count="pageCount"
              :page-sizes="[72,144,216,288]"
              :page-size="pageSize"
              size="medium"
              show-quick-jumper
              show-size-picker
              @update:page-size="updatePageSize"
              @update:page="updatePage"
          />
        </n-space>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref,Ref } from 'vue';
import * as IconMap from '@icon-park/vue-next/es/map'
import { cloneDeep } from 'lodash'
import { randomGenerateColor } from '@utils'
import copy from 'copy-text-to-clipboard';
import { useMessage } from 'naive-ui'

const message = useMessage();

let iconNumber = ref(20);
let isColorIcon = ref(false);
let searchValue = ref('');
let page:Ref<Number> = ref(1);
let pageCount:Ref<Number> = ref(Object.keys(IconMap).length);
let pageSize:Ref<Number> = ref(72);
let iconList:Ref<any[]> = ref([]);
let iconSourceList:Ref<any[]> = ref([]);
let iconSearchList:Ref<any[]> = ref([]);// 查询返回
let startIndex:Ref<Number> = ref(0);
let endIndex:Ref<Number>  = ref(0);

let generateData = (list:any) => {
  pageCount.value = list.value.length;
  startIndex.value = ((page.value-1)*pageSize.value);
  endIndex.value = ((page.value-1)*pageSize.value)+pageSize.value;
  iconList.value =  list.value.slice(startIndex.value,endIndex.value);
}

let updatePageSize = (size: Number) => {
  pageSize.value = size;
  page.value = 1;
  let list = iconSearchList.value.length > 0 ? iconSearchList : iconSourceList;
  generateData(list);
}

let updatePage = (pages: Number) => {
  page.value = pages;
  let list = iconSearchList.value.length > 0 ? iconSearchList : iconSourceList;
  generateData(list);
}

let searchIcon = () => {
  if(searchValue.value == ''){
    iconSearchList.value = [];
    generateData(iconSourceList);
    return;
  }
  page.value = 1;
  iconSearchList.value = iconSourceList.value.filter(item=>{
    return  item.name.includes(searchValue.value)
  })
  generateData(iconSearchList);
}

let getColor = () => {
 return  isColorIcon.value ?  randomGenerateColor() : '#000'
}

let copyCode = (item:any) => {
  try {
    let iconName = item.name.slice(5,item.name.length);
    let code = ` <${iconName} theme="outline" size="${iconNumber.value}" />`
    copy(code)
    message.success(`复制 ${code} 成功！`);
  }catch (err){
    message.error("复制失败！");
  }
}

let init = () => {
  const myIconMap:{[key:string]:any} = IconMap;
  for (const key in myIconMap) {
    iconList.value.push(myIconMap[key]);
  }
  iconSourceList.value = cloneDeep(iconList.value);
  updatePageSize(pageSize.value);
}

init();

</script>

<style scoped>
.like-icon{
  background-color: #ffffff;
  padding: 20px;
}
.icon-show-box{
  margin-top: 20px;
}
.icon-gi-item{
  text-align: center;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.border-gi{
  height: 70px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.icon-copy-box{
  height: 0px;
  transition: all 0.3s;
  width: 100%;
}
.icon-copy{
  transition: all 0.3s;
  position: absolute;
  bottom: -20px;
  width: 100%;
  color:#fff;
  background-color: var(--theme-color);
}
.border-gi:hover .icon-copy{
  bottom: 0px;
}
.border-gi:hover .icon-copy-box{
  height: 20px;
}
</style>