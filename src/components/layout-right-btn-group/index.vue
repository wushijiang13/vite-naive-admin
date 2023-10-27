<script setup lang="ts">
import {FullScreen, Lock, Refresh, Remind, Search, Theme, Translate, User, Logout} from "@icon-park/vue-next";
import { defineProps }  from 'vue'
import { renderIcon } from '@utils'
import { useSettingStore } from '@pinia/setting'
import { useStore } from '@pinia'

const settingStore = useSettingStore();
const store = useStore();
let props = defineProps({
  selectOptions:{
      type:Array,
      default:[
        {
          label: '个人中心',
          key: 'profile',
          icon: renderIcon(User),
        },
        {
          label: '退出登录',
          key: 'editProfile',
          icon: renderIcon(Logout)
        },
      ],
  }
});

const userOperate = [
  {icon:Lock,key:'lock'},
  {icon:Search,key:'search'},
  {icon:Remind,key:'remind'},
  {icon:FullScreen,key:'full-screen'},
  {icon:Translate,key:'translate'},
  {icon:Theme,key:'theme'},
  {icon:Refresh,key:'refresh'},
]

const userOperateClick = (key:String)=> {
  switch (key) {
    case "lock":{
      break;
    }
    case "search":{
      break;
    }
    case "remind":{
      break;
    }
    case "full-screen":{
      break;
    }
    case "translate":{
      break;
    }
    case "theme":{
      settingStore.themeShowDrawer()
      break;
    }
    case "refresh":{
      store.refreshPageComponents()
      break;
    }
  }
}

const handleSelectOption = () => {

}

</script>
<template>
  <div>
    <n-space :size="[20,0]" align="center">
      <n-button text v-for="item in userOperate" @click="userOperateClick(item.key)">
        <n-icon size="16" :component="item.icon"/>
      </n-button>
      <n-dropdown trigger="hover" :options="props.selectOptions" @select="handleSelectOption">
        <div class="user-info-box">
            <n-avatar
                class="user-avatar"
                round
                size="small"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F22%2F20170322095440_L2yas.thumb.400_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700977345&t=12609f97d53886626fdd4a5eee136670"
            />
            吴彦祖
        </div>
      </n-dropdown>
    </n-space>
  </div>
</template>

<style scoped>
.user-avatar{
  margin-right: 6px;
}
.user-info-box{
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
}
</style>