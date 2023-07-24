<template>
  <n-space>
    <n-button v-for="item in tabBtnList" type="primary" :key="item.content" @click="()=>{closeTab(item.type)}">{{item.content}}</n-button>
  </n-space>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useStore } from "@pinia";

  const store = useStore();
  const tabBtnList = ref([
    {
      content:'关闭其他',
      type:'closeOther'
    },
    {
      content:'关闭左侧',
      type:'closeLeft'
    },
    {
      content:'关闭右侧',
      type:'closeRight'
    },
    {
      content:'关闭全部',
      type:'closeAll'
    },
    {
      content:'关闭当前',
      type:'closeCurrent'
    },
  ])
  const closeTab = (key:string)=>{
    store.dropDownSelect(key)
  }
</script>