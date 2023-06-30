<template>
  <div>

    <div class="bubble" :style="{backgroundColor: config.bgColor,color:config.color}">
      <div class="arrow-box" :style="{borderRight: `10px solid ${config.bgColor}`}"></div>
      <slot name="content">
        <span>{{config.content}}</span>
      </slot>
    </div>
    <slot name="bottomContent">
      <p v-if="config.bottomContent" class="bubble-bottom-content">{{config.bottomContent}}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { defineProps,Ref } from 'vue';
  import { bubbleConfig } from '@types';
  import cssVars from 'css-vars-ponyfill'
  const config:Ref<bubbleConfigs> = defineProps({
    bgColor:{
      type:String,
      default:'',
    },
    color:{
      type:String,
      default:'',
    },
    content:{
      type:String,
      default:'',
    },
    bottomContent:{
      type:String,
      default:'',
    }
  });
/*  cssVars({
    onlyLegacy:true,
    variables:{
      'bubbleBgColor':config.bgColor,
      'bubbleColor':config.color,
    }
  })*/
</script>

<style scoped>
.bubble{
  padding: 8px 8px;
  border-radius: 5px;
  margin-left: 14px;
  position: relative;
}
.arrow-box{
  content:'';
  width: 0px;
  height: 1px;
  border-top: 0px solid transparent;
  border-bottom: 10px solid transparent;
  position: absolute;
  left: -10px;
  top:6px;
}
.bubble-bottom-content{
  margin-left: 14px;
  margin-top: 4px;
  font-size: 12px;
  color:#767c82;
}
</style>