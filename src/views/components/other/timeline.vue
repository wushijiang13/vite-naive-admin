<template>
  <n-grid x-gap="12" :cols="4" y-gap="12">
    <n-grid-item :span="1" >
      <n-card >
        <template #header>
          常规风格
        </template>
        <div>
          <n-timeline>
            <n-timeline-item content="啊" />
            <n-timeline-item
                type="success"
                title="成功"
                content="哪里成功"
                time="2018-04-03 20:46"
            />
            <n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46" />
            <n-timeline-item
                type="warning"
                title="警告"
                content="哪里警告"
                time="2018-04-03 20:46"
            />
            <n-timeline-item
                type="info"
                title="信息"
                content="是的"
                time="2018-04-03 20:46"
                line-type="dashed"
            />
            <n-timeline-item content="啊" />
          </n-timeline>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card >
        <template #header>
          卡片风格
        </template>
        <div>
          <n-timeline>
            <n-timeline-item>
              <bubble :bgColor="'#ffb42f'" :color="'#fff'" :content="'测试气泡'" :bottomContent="'2018-04-03 19:46'"/>
            </n-timeline-item>
            <n-timeline-item type="success">
              <bubble :bgColor="'#ff4549'" :color="'#fff'" :content="'哪里成功'" :bottomContent="'2018-04-03 20:46'"/>
            </n-timeline-item>
            <n-timeline-item type="error">
              <bubble :bgColor="'#00ca63'" :color="'#fff'" :content="'哪里错误'" :bottomContent="'2018-04-03 20:46'"/>
            </n-timeline-item>
            <n-timeline-item type="warning">
              <bubble :bgColor="'#ffb42f'" :color="'#fff'" :content="'哪里警告'" :bottomContent="'2018-04-03 20:46'"/>
            </n-timeline-item>
            <n-timeline-item
                type="info"
                line-type="dashed">
              <bubble :bgColor="'#dedede'" :color="'#000'" :content="'是的'" :bottomContent="'2018-04-03 20:46'"/>
            </n-timeline-item>
            <n-timeline-item>
              <bubble :bgColor="'#dedede'" :color="'#000'" :content="'结束'" :bottomContent="'2018-04-03 20:46'"/>
            </n-timeline-item>
          </n-timeline>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
  import {ref,Ref,onMounted} from "vue";
  import bubble from '@components/bubble/bubble.vue'

</script>

<style scoped>
</style>