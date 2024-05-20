<template>
  <div>
    <div class="table-header">
      <div class="table-btn">
        <n-input v-if="moduleColOptions.search.isShow && moduleColOptions.search.code"
                 round :placeholder="moduleColOptions.search.placeholder"
                 v-model:value="moduleColOptions.search.value"
                 @focus="searchInputFocus"
                 @blur="searchSubmit"
                 @keydown.enter="searchSubmit">
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
          <slot name="table-btn"></slot>
      </div>
      <div class="table-select">
        <div class="table-select-slot">
          <slot name="table-select-slot"></slot>
        </div>
        <!--  等到写完的时候再加 用于是否展示原有筛选功能  v-if="isReserveFilter"-->
        <div class="table-select-box">
          <!--  等到写完的时候再加 用于外部判断权限  v-if="$permissions(downCode) && 是否需要这个功能"-->
            <n-button v-if="moduleColOptions.down.isShow && moduleColOptions.down.code" size="large" @click="moduleClick('down')" strong secondary circle>
              <template #icon>
                <n-icon><Download/></n-icon>
              </template>
            </n-button>
            <n-button v-if="moduleColOptions.filter.isShow && moduleColOptions.filter.code" @click="openDrawer('filter')"  size="large" strong secondary circle>
              <template #icon>
                <n-icon><Filter/></n-icon>
              </template>
            </n-button>
            <n-button v-if="moduleColOptions.custom.isShow && moduleColOptions.custom.code" @click="openDrawer('custom')" size="large" strong secondary circle>
            <template #icon>
              <n-icon><TextColumnTwoLeft24Filled/></n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </div>
    <div class="table-filter-box" v-if="searchTagList.length">
      <n-space :align="'center'">
        <n-tag v-for="item in searchTagList" type="info" class="tag-box" closable @close="searchTagClose(item)">
          <template #default>
            <n-space :align="'center'">
              {{item.options.label}}
              <n-input
                  v-if="['text','password','textarea'].includes(item.options.type)"
                  v-bind="item.options"
                  v-model:value="item.options.value"
                  size="small"
                  @focus="searchTagInputFocus(item)"
                  @blur="searchTagInputBlur(item)"
              />
              <n-select
                  v-if="item.options.type == 'select'"
                  v-bind="item.options"
                  v-model:value="item.options.value"
                  size="small"
                  @update:value="searchTagChange(item)"
              />
              <n-date-picker
                  v-if="['date','datetime','daterange','datetimerange','month','year','quarter'].includes(item.options.type)"
                  v-model:value="item.options.value"
                  v-bind="item.options"
                  size="small"
                  @update:value="searchTagChange(item)"
              />
            </n-space>
          </template>
        </n-tag>
        <n-button text @click="searchClearClick">
          清空
        </n-button>
      </n-space>
    </div>
    <div class="table-box">
      <n-data-table
          v-bind="tableOption"
          v-model:checked-row-keys="tableOption.checkedRowKeys"
      />
      <div class="table-bottom" :class="isFixedBottom ? 'table-fixed-bottom':'table-normal-bottom'">
          <n-pagination
              v-bind="paginationOption"
              v-model:page="paginationOption.page"
              v-model:page-size="paginationOption.pageSize">
            <template #suffix="{  itemCount }">
              共计 {{  itemCount }} 条
            </template>
          </n-pagination>
          <n-button
              v-if="moduleColOptions.add.isShow && moduleColOptions.add.code"
              @click="moduleClick('add')"
              size="large" strong secondary circle>
            <template #icon>
              <n-icon><Add24Filled/></n-icon>
            </template>
          </n-button>
        </div>
      <div v-show="isFixedBottom" class="table-bottom-placeholder"/>
    </div>
    <!--  抽屉  -->
    <n-drawer
        v-model:show="drawerOption.active"
        :width="400"
        :close-on-esc="false"
        :mask-closable="false">
      <n-drawer-content :title="drawerOption.title">
          <template v-slot:header="msg">
            <div class="drawer-header-box">
              <div>
              {{drawerOption.title}}
              <n-button
                  v-show="drawerOption.status == 'custom'"
                  @click="drawerOperate(drawerOption.status+'ClickReset')"
                  text
                  size="large"
                  strong
                  secondary
                  circle
                  style="vertical-align: text-top;">
                <template #icon>
                  <n-icon><ArrowReset24Filled/></n-icon>
                </template>
              </n-button>
              </div>
              <div>
                <n-button @click="drawerOperate(drawerOption.status+'ClickCancel')">
                  {{drawerOption.cancel}}
                </n-button>
                <n-button @click="drawerOperate(drawerOption.status+'ClickOK')" style="margin-left: 10px" type="primary">
                  {{drawerOption.confirm}}
                </n-button>
              </div>
            </div>
          </template>
          <div v-if="drawerOption.status == 'custom'">
             <n-checkbox
                    size="large"
                    class="select-all-checkbox"
                    v-model:checked="isSelectAll"
                    :indeterminate="isSelectHalf"
                    label="全选"
                    :on-change="checkAllChange"
             />
            <n-checkbox-group v-model:value="customAction">
              <n-grid :y-gap="8" :cols="1">
                  <n-gi v-for="item in customList">
                    <n-checkbox  size="large"  :value="item.key" :label="item.title"/>
                  </n-gi>
              </n-grid>
            </n-checkbox-group>
          </div>
          <div v-if="drawerOption.status == 'filter'">
            <template v-for="item in selectOptions" :key="item.options.type">
              <p>
                {{item.options.label}}
              </p>
              <n-input
                  v-if="['text','password','textarea'].includes(item.options.type)"
                  v-bind="item.options"
                  v-model:value="item.options.value"
              />
              <n-select
                  v-if="item.options.type == 'select'"
                  v-bind="item.options"
                  v-model:value="item.options.value"
              />
              <n-date-picker
                  v-if="['date','datetime','daterange','datetimerange','month','year','quarter'].includes(item.options.type)"
                  v-model:value="item.options.value"
                  v-bind="item.options"/>
            </template>
          </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@vicons/ionicons5'
  import { TextColumnTwoLeft24Filled, Add24Filled,ArrowReset24Filled} from '@vicons/fluent'
  import { Filter } from '@icon-park/vue-next';
  import { Download } from '@vicons/tabler'
  import { useConfig } from './config/config'
  import { ref,reactive,defineEmits,defineProps,watch,onMounted} from 'vue'
  const  { config } = defineProps(['config']);
  const  { moduleColOptions,selectOptions,tableOption,paginationOption } = useConfig(config);
  const emits =  defineEmits(['customClickOk','customClickCancel','customClickReset',
    'filterClickOK','filterClickCancel','searchTagChange','searchClearClick','searchTagClose',
    'searchInputChange','addClick','downClick'])
  import _ from "lodash";

  let drawerOption = reactive({
    active:false,//是否展开
    title:"自定义列",//展示的标题
    status:"custom",//打开的显示状态
    confirm:"确定",//确定按钮文案
    cancel:"取消",//取消按钮文案
  })
  let searchTagList = ref([]); //搜索tag
  let customList =  ref([]); //自定义列list
  let customAction = ref([]); //当前选中的自定义列有哪些
  let isSelectAll = ref(true); //是否全选
  let isSelectHalf = ref(true); //是否半选
  let columnsOperateData = ref(tableOption.columns); //当前table columns 的操作数据
  let columnsSource = _.cloneDeep(tableOption.columns); //当前table columns 的源数据
  let inputCompared =ref("");// 用于筛选input 判断值是否有变化 判断用
  let isFixedBottom = ref(false);//table底部是否固钉 为了避免少计算 下面用== 而不是用取反 这里true 代表 不固定 false 代表固钉
  /**
   * 根据传入状态不同 显示不同内容抽屉
   * @param status
   */
  const openDrawer = (status:string = 'custom')=>{
    if(status == 'custom'){
      drawerOption.title = '自定义列';
      drawerOption.status="custom";
      drawerOption.confirm="应用";
      drawerOption.cancel="返回";
    }else{
      drawerOption.title = '筛选条件';
      drawerOption.status="filter";
      drawerOption.confirm="确定";
      drawerOption.cancel="取消";
    }
    drawerOption.active = true;
  }
  /**
   * 抽屉按钮发生点击，emits 对应函数并且执行组件内部回显逻辑
   * @param status 是 操作状态和是否拼接而成
   */
  const drawerOperate = (status) =>{
    drawerOption.active=false;
    let options;
    switch (status) {
      case 'filterClickOK' :{
        generateSearchTag();
        options = selectOptions;
        break;
      }
      case 'filterClickCancel' :{
        options = selectOptions;
        break;
      }
      case 'customClickOk' :{
        options = tableOption.columns;
        customColumnShow();
        break;
      }
      case 'customClickCancel' :{
        options = tableOption.columns;
        break;
      }
      case 'customClickReset' :{
        options = tableOption.columns;
        customColumReset();
        break;
      }
    }
    emits(status,options);
  }

  /**
   *  筛选tag 获取焦点时触发
   */
  const searchTagInputFocus = (item) =>{
    inputCompared.value = item.options.value;
  }

  /**
   *  筛选tag input 失去焦点触发
   */
  const searchTagInputBlur = (item)=>{
    if (!_.isEqual(inputCompared.value, item.options.value)) {
      emits('searchTagChange',item, config.selectOptions);
    }
  }

  /**
   * 筛选组件初始化赋值
   */
  const init = ()=>{
    // 这里考虑到可能会有跳转进页面就默认筛选一些东西，不对默认值进行同步处理
    // config.selectOptions = config.selectOptions.map(item=>{
    //   if (item.hasOwnProperty("defaultValue")) {
    //     item.options.value = item.defaultValue.value;
    //   }
    //   return item;
    // })
    //生成自定义列需要展示的
    //只有设置了自定义列模块展示才执行此代码
    if(moduleColOptions.custom.isShow){
      customAction.value =[];
      customList.value = columnsOperateData.value.filter(item =>{
        return item.hasOwnProperty("fixed")
      })
      tableOption.columns = columnsOperateData.value.filter(item=>{
        if (item.hasOwnProperty("fixed")) {
          if (item.fixed) customAction.value.push(item.key);
          return item.fixed;
        }
        return true;
      })
    }
    tableOption["maxHeight"] = document.documentElement.clientHeight - 300;
    let tableBottom=document.querySelector('.table-bottom')
    document.addEventListener("scroll",()=>{
      // 后续改成根据是否存在滚动条去进行显示效果
      // if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
      //   isFixedBottom.value = true;
      // } else {
      //   isFixedBottom.value = false;
      // }
      isFixedBottom.value  = tableBottom.offsetTop != tableBottom.offsetTop-document.documentElement.scrollTop;
    })
  }
  /**
   * 生成筛选tag
   */
  const generateSearchTag = () =>{
    searchTagList.value = [];
    selectOptions.forEach((item:any)=>{
      let defaultValue =  item.defaultValue.value;
      if (!_.isEqual(item.options.value, defaultValue)) {
        searchTagList.value.push(item);
      }
    })
  }
  /**
   * searchTagChange
   * 所有遍历的筛选项change
   */
  const searchTagChange = (item) => {
    emits('searchTagChange',item, config.selectOptions);
  }
  /**
   * searchClear
   * 清空按钮
   */
  const searchClearClick = () =>{
    config.selectOptions =  config.selectOptions.map(item=>{
      item.options.value = item.defaultValue.value;
      return item;
    })
    searchTagList.value = [];
    emits('searchClearClick',  config.selectOptions)
  }
  /**
   * searchTagClose
   * 单个筛选tag清空
   */
  const searchTagClose = (item:any) => {
    searchTagList.value = searchTagList.value.filter((filterOption:any)=>{
      return filterOption.options.label != item.options.label;
    })
    config.selectOptions = config.selectOptions.map(mapItem=>{
      if(mapItem.options.label == item.options.label){
        mapItem.options.value = item.defaultValue.value;
      }
      return mapItem;
    })
    emits('searchTagClose',item, config.selectOptions)
  }
  /**
   * 根据传入的数组展示自定义列
   */
  const customColumnShow = () => {
    columnsOperateData.value = columnsOperateData.value.map(item=>{
      if(item.hasOwnProperty("fixed")){
        item.fixed = customAction.value.includes(item.key);
      }
      return item;
    })
    tableOption.columns = columnsOperateData.value.filter(item=>{
      if (item.hasOwnProperty("fixed")) {
        return item.fixed;
      }else{
        return true;
      }
    })
  }
  /**
   * 重置自定义列
   */
  const customColumReset = () =>{
    customAction.value=[];
    tableOption.columns = columnsSource.filter(item=>{
      if (item.hasOwnProperty("fixed")) {
        if (item.fixed) customAction.value.push(item.key);
        return item.fixed;
      }
      return true;
    })
  }
  /**
   * 右侧模块点击
   */
  const moduleClick = (status:string)=>{
    let  emitsName:string;
    emitsName = status == 'add' ? 'addClick' : 'downClick';
    emits(emitsName);
  }

  /**
   * 自定义列点击全选逻辑
   * @param checked
   */
  const checkAllChange = (checked)=>{
    let allCustom =  customList.value.map(item =>{return item.key})
    isSelectHalf.value = false;
    isSelectAll.value = checked;
    customAction.value = checked ? allCustom : [];
  }
  /**
   *  搜索查询获取焦点时触发
   */
  const searchInputFocus = ()=>{
    inputCompared.value = moduleColOptions.search.value;
  }
  /**
   *  搜索查询获取焦点时触发
   */
  const searchSubmit = ()=>{
    if (!_.isEqual(inputCompared.value, moduleColOptions.search.value)) {
      inputCompared.value = moduleColOptions.search.value;
      emits('searchInputChange',moduleColOptions.search.value,selectOptions);
    }
  }

  window.onresize = () =>{
    tableOption["maxHeight"] = document.documentElement.clientHeight - 260;
  }

  watch(
  () => customAction.value,
      val => {
        isSelectHalf.value = !!val.length && val.length < customList.value.length;
        isSelectAll.value = val.length === customList.value.length;
      },
  )

  onMounted(()=>{
    init()
  })


</script>

<style>
.table-header{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 10px 0px;
}
.table-btn,.table-select,.table-select-slot,.table-select-box{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.table-select  .n-button,.table-select-slot .n-button,.table-select  .n-input{
  margin-left: 10px;
}
.drawer-header-box{
  display: flex;
  width: 356px;
  justify-content: space-between;
  align-items: center;
}
.table-filter-box{
  width: 100%;
  margin-bottom: 10px;
}
.select-all-checkbox{
  margin-bottom: 10px;
}
.table-normal-bottom{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-fixed-bottom{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: fixed;
  width: calc(100vw - 260px);
  bottom: 0px;
  z-index: 9;
}
.table-bottom-placeholder{
  height: 60px;
}
table-bottom-placeholder{
  height: 80px;
}
.tag-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  min-width: 200px;
}
.tag-box  .n-base-selection__border, .tag-box  .n-base-selection__state-border,.tag-box .n-input__border,
.tag-box .n-input__state-border{
  display: none;
}
.tag-box  .n-base-selection .n-base-selection-label , .tag-box  .n-input{
  min-width: 120px;
  line-height: 28px;
  background-color: #00000000;
  font-size: 12px;
  color: #4798ef;
}
.tag-box .n-base-selection .n-base-selection-label .n-base-selection-input{
  caret-color: #4798ef;
}
.tag-box .n-base-selection:not(.n-base-selection--disabled).n-base-selection--active .n-base-selection-label
, .tag-box  .n-input:not(.n-input--disabled).n-input--focus{
  background-color: #00000000;
}
.tag-box .n-base-selection-input__content, .tag-box .n-input__input-el{
  color: #4798ef;
  overflow: hidden;
}
.tag-box .n-base-selection .n-base-suffix .n-base-suffix__arrow , .tag-box .n-date-picker .n-date-picker-icon{
  color: #4798ef;
}
.table-box .n-data-table__pagination{
  display: none;
}
</style>