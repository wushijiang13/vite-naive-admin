<template>
  <n-grid x-gap="12" :cols="4" y-gap="12">
    <n-grid-item :span="1" v-for="item in resultList">
      <n-card >
        <template #header>
          {{item.title}}
        </template>
        <div>
          <n-result :status="item.status" :title="item.title" :description="item.description">
            <template #footer>
              <n-button>{{item.btnDesc}}</n-button>
            </template>
          </n-result>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-card >
        <template #header>
          Alert 警告
        </template>
        <div>
          <n-space vertical>
            <n-alert  v-for="item in alertList" :title="item.title" :type="item.type" closable/>
          </n-space>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <n-grid :cols="2" y-gap="12">
        <n-grid-item :span="2">
          <n-card >
            <template #header>
              Message 消息提示
            </template>
            <div>
              <n-space>
                <n-button type="info" @click="messageShow('info')">
                  信息
                </n-button>
                <n-button type="error" @click="messageShow('error')">
                  错误
                </n-button>
                <n-button type="warning" @click="messageShow('warning')">
                  警告
                </n-button>
                <n-button type="success" @click="messageShow('success')">
                  成功
                </n-button>
                <n-button  @click="messageShow('loading')">
                  加载中
                </n-button>
              </n-space>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item :span="2">
          <n-card >
            <template #header>
              Notification 消息提示
            </template>
            <div>
              <n-space>
                <n-button type="info" @click="notify('info')">
                  信息
                </n-button>
                <n-button type="success" @click="notify('success')">
                  成功
                </n-button>
                <n-button type="warning" @click="notify('warning')">
                  警告
                </n-button>
                <n-button type="error" @click="notify('error')">
                  错误
                </n-button>
              </n-space>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
  import {ref,Ref,onMounted} from "vue";
  import { useMessage,useNotification } from 'naive-ui'
  const resultList = ref([
    {
      title:'成功提示',
      status:'success',
      description:'你成功了！',
      btnDesc:'确定',
    },
    {
      title:'警告提示',
      status:'warning',
      description:'切记不可得意',
      btnDesc:'确定',
    },
    {
      title:'错误提示',
      status:'error',
      description:'你错了',
      btnDesc:'确定',
    },
    {
      title:'信息提示',
      status:'info',
      description:'或许你应该看下这个信息',
      btnDesc:'确定',
    },
  ]);
  const alertList = ref([
    {
      title:'成功了',
      type:'success',
    },
    {
      title:'信息提示',
      type:'info',
    },
    {
      title:'警告信息',
      type:'warning',
    },
    {
      title:'错误提示',
      type:'error',
    },
  ])

  const message:any = useMessage();
  const notification:any = useNotification()

  const messageShow = (type:string) => {
    message[type](
        "勿因己之拙,而忘人之能",
    )
  }

  const notify = (type:string) => {
    notification[type]({
      content: `${type}提示!`,
      meta: '勿因己之拙,而忘人之能',
      duration: 2500,
      keepAliveOnHover: true
    })
  }
</script>

<style scoped>

</style>