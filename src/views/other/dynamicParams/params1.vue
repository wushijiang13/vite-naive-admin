<template>
  <vue-json-pretty :data="{
    label:'Params id=1',key: 'params1',
  parendKey:'dynamicParams',
  component: 'params1',
  isClose:'true',
  params:{
  id:'1'
  }
  }" :showIcon="true" />

</template>

<script setup lang="ts">
  import {ref,Ref} from "vue";
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css'
  let json = ``;
</script>