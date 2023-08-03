<template>

  参数展示:
  <div class="params1-box">

  </div>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <vue-json-pretty :data="{
      label:'Params id=1',key: 'params1',
        parendKey:'dynamicParams',
        component: 'params1',
        isClose:'true',
        params:{
        id:'1'
        }
        }" :showIcon="true" />
    </n-gi>
    <n-gi>
      <n-table  :single-line="false">
        <thead>
        <tr>
          <th>key</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>传参类型</td>
          <td>params</td>
        </tr>
        <tr>
          <td>id</td>
          <td>{{params1.id}}</td>
        </tr>
        </tbody>
      </n-table>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import { useRoute } from 'vue-router'
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css'
  let params1 = ref({})
  let route  = useRoute();
  onMounted(()=>{
    params1.value = route.params;
  })
</script>
<style>
.params1-box{
  width: 400px;
}
</style>