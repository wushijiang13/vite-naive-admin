<template>
  <div class="anchor">
    <div class="anchor-div">
      <n-anchor
          :show-rail="true"
          :show-background="true"
          affix
          listen-to=".anchor"
          class="anchor-box"
          :top="160">
        <n-anchor-link v-for="item in cardList" :title="item.title" :href="`#${item.title}`">
        </n-anchor-link>
      </n-anchor>
    </div>
  <template  v-for="item in cardList">
    <div :id="item.title" class="card-box" :style="{backgroundColor: item.color}" >
      {{item.title}}
    </div>
  </template>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  const cardList = [
    {title:'白日依山尽',color:'#d7efe4'},
    {title:'黄河入海流',color:'#c3d9f7'},
    {title:'欲穷千里目',color:'#d7efe4'},
    {title:'更上一层楼',color:'#c3d9f7'},
  ]
</script>

<style scoped>
.card-box{
  height: 900px;
  background-color: #29d27a;
}
.anchor{
  position: relative;
}
.anchor-box{
  background-color: #fff;
  padding: 10px;
  margin-right: 20px;
}
.anchor-div{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>