<template>
  <div class="list-box">
    <div class="list-header">
      <n-input round :placeholder="'请输入标题'" style="width: 200px"
               v-model:value="searchValue"
               @keydown.enter="searchFilter">
        <template #suffix>
          <n-icon :component="Search" />
        </template>
      </n-input>
    </div>
    <n-list hoverable clickable>
      <n-list-item v-for="item in listData" :key="item.title">
        <n-thing :title="item.title" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag v-for="tag in item.tagList" :bordered="false" type="info" size="small">
                {{tag}}
              </n-tag>
            </n-space>
          </template>
          <p v-html="item.content"/>
        </n-thing>
      </n-list-item>
    </n-list>
    <div class="list-bottom">
      <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          :page-sizes="[10,20,30,50]"
          :page-size="pageSize"
          size="medium"
          show-quick-jumper
          show-size-picker
          @update:page="updatePage"
          @update:pageSize="updatePageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@vicons/ionicons5'
import {onMounted, ref,Ref} from "vue";
const searchValue = ref('');
const data = [
  {
    title:'相见恨晚',
    tagList:['暑夜','晚春'],
    content:` 奋勇呀然后休息呀<br>
          完成你伟大的人生`
  },
  {
    title:'他在时间门外',
    tagList:['环形公路','潜水艇司机'],
    content:` 最新的打印机<br>
          复制着彩色傀儡<br>
          早上好我的罐头先生<br>
          让他带你去被工厂敲击`
  },
  {
    title:'钗头凤·红酥手',
    tagList:['陆游','宋词'],
    content:`红酥手，黄藤酒。满城春色宫墙柳；东风恶，欢情薄，一怀愁绪，几年离索，错，错，错！<br>  春如旧，人空瘦。泪痕红浥鲛绡透；桃花落，闲池阁，山盟虽在，锦书难托，莫，莫，莫！  `
  },
  {
    title:'点绛唇',
    tagList:['王禹偁','宋词'],
    content:`雨恨云愁，江南依旧称佳丽。水村渔市，一缕孤烟细。<br> 天际征鸿，遥认行如缀。平生事，此时凝睇，谁会凭栏意？ `
  },
  {
    title:'江南春',
    tagList:['寇准','宋词'],
    content:`波渺渺，柳依依。孤村芳草远，斜日杏花飞。<br> 江南春尽离肠断，萍满汀洲人未归。 `
  },
  {
    title:'踏莎行',
    tagList:['寇准','宋词'],
    content:`春色将阑，莺声渐老，红英落尽青梅小。画堂人静雨蒙蒙，<br>屏山半掩余香袅。<br>密约沉沉，离情冥冥，菱花尘满慵将照。倚楼无语欲消魂，<br>长空暗淡连芳草。`
  },
  {
    title:'木兰花',
    tagList:['钱维演','宋词'],
    content:` 城上风光莺语乱，城下烟波春拍岸。绿杨芳草几时休？<br>泪眼愁肠先已断。<br>情怀渐变成衰晚，鸾鉴朱颜惊暗换。昔年多病厌芳尊，<br>今日芳尊惟恐浅。`
  },
  {
    title:'相思令',
    tagList:['林逋','宋词'],
    content:` 吴山青，越山青，两岸青山相送迎。谁知离别情？<br>君泪盈，妾泪盈，罗带同心结未成。江头潮已平。`
  },
  {
    title:'望汉月',
    tagList:['李遵勖','宋词'],
    content:`黄菊一丛临砌，颗颗露珠装缀。独教冷落向秋天，<br>恨东君不曾留意。<br>雕阑新雨霁，绿藓上，乱铺金蕊。此花开后更无花，<br>愿爱惜，莫同桃李。`
  },
  {
    title:'苏幕遮',
    tagList:['范仲淹','宋词'],
    content:`碧云天，黄叶地。秋色连波，波上寒烟翠。山映斜阳波连水，<br>芳草无情，更在斜阳外。<br> 黯乡魂，追旅思。夜夜除非，好梦留人睡。明月高楼休独倚。<br>酒入愁肠，化作相思泪。`
  },
  {
    title:'御街行',
    tagList:['范仲淹','宋词'],
    content:`纷纷坠叶飘香砌。夜寂静，寒声碎。真珠帘卷玉楼空，<br>天淡银河垂地。年年今夜，月华如练，长是人千里。<br>愁肠已断无由醉。酒未到，先成泪。残灯明灭枕头敧，<br>谙尽孤眠滋味。都来此事，眉间心上，无计相回避。`
  },
]
const listData:Ref<any[]>= ref([]);
const searchData:Ref<any[]> = ref([]);
const page = ref(1);
const pageSize = ref(10);
const pageCount = ref(0);

const listFilterData = (search:string='',page:number=1,pageSize:number=10) =>{
  let parentPage = page == 0 ? 0 : page-1;
  listData.value=[];
  let newPageCount = 0;
  searchData.value = data.filter((item)=>{
    if (item.title.includes(search)) {
      newPageCount++;
    }
    return item.title.includes(search)
  })
  listData.value = searchData.value.filter((item,index)=>{
    return item.title.includes(search) && (index+1 > (parentPage*pageSize) && index+1<= page*pageSize)
  })
  console.log(newPageCount);
  newPageCount =  newPageCount == 0 ? data.length : newPageCount;
  pageCount.value = Math.ceil(newPageCount/pageSize);
}

const updatePage = (newPage:number) => {
  page.value = newPage;
  listFilterData(searchValue.value,page.value,pageSize.value);
}

const updatePageSize = (newPageSize: number) => {
  pageSize.value = newPageSize;
  page.value = 1;
  listFilterData(searchValue.value,page.value,pageSize.value);
}

const searchFilter = () => {
  page.value = 1;
  listFilterData(searchValue.value,page.value,pageSize.value);
}

onMounted(()=>{
  listFilterData(searchValue.value,page.value,pageSize.value);
})
</script>

<style scoped>
  .list-header{
    height: 70px;
    display: flex;
    align-items: center;
  }
  .list-bottom{
    display: flex;
    height: 70px;
    justify-content: center;
    align-items: center;
  }
</style>