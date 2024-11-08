<template>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        参数展示:
        <vue-json-pretty :data="{
          label:'Query id=1',key: 'query1',
          parendKey:'dynamicParams',
          component: 'query1',
          isClose:'true',
          params:{
          id:'1'
          }
          }" :showIcon="true" />
      </n-gi>
      <n-gi>
        <n-table>
          <thead>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>传参方式</td>
              <td>query</td>
            </tr>
            <tr>
              <td>id</td>
              <td>{{query.id}}</td>
            </tr>
          </tbody>
        </n-table>
      </n-gi>
    </n-grid>
</template>

<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import { useRoute } from 'vue-router';
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css'

  let route = useRoute();
  let query = ref('');
  onMounted(()=>{
    query.value = route.query
  })
</script>