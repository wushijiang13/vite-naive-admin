<template>
  <div class="synthesizeFrom">
    <div>
      <n-space vertical :size="22">
        <n-radio-group
            v-model:value="size"
            name="left-size"
        >
          <n-radio-button value="small">
            小
          </n-radio-button>
          <n-radio-button value="medium">
            中
          </n-radio-button>
          <n-radio-button value="large">
            大
          </n-radio-button>
        </n-radio-group>
        <n-radio-group
            style="margin-bottom: 22px"
            v-model:value="labelAlignValue"
            @update:value="changeFormAlign">
          <n-radio-button value="left">
            左对齐
          </n-radio-button>
          <n-radio-button value="right">
            右对齐
          </n-radio-button>
          <n-radio-button value="top">
            顶部对齐
          </n-radio-button>
        </n-radio-group>
      </n-space>
    </div>
    <n-form
        ref="formRef"
        :label-width="80"
        :model="model"
        :size="size"
        :rules="rules"
        :label-align="labelAlign"
        :label-placement="labelPlacement"
        label-width="auto">
      <n-form-item label="娱乐名称" path="name">
        <n-input v-model:value="model.name" placeholder="请输入娱乐名称" />
      </n-form-item>
      <n-form-item label="地区" path="area">
        <n-select
            v-model:value="model.area"
            placeholder="请选择地区"
            :options="areaList"
        />
      </n-form-item>
      <n-form-item label="联系方式" path="phone">
        <n-input v-model:value="model.phone" placeholder="请输入联系方式" />
      </n-form-item>
      <n-form-item label="时间" path="time">
        <n-date-picker v-model:value="model.time" type="datetime" />
      </n-form-item>
      <n-form-item label="开启状态" path="state">
        <n-switch v-model:value="model.state" />
      </n-form-item>
      <n-form-item label="活动类型" path="activityType">
        <n-checkbox-group v-model:value="model.activityType">
          <n-space>
            <n-checkbox value="1">
              社交类
            </n-checkbox>
            <n-checkbox value="2">
              教育类
            </n-checkbox>
            <n-checkbox value="3">
              科技类
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="资源类型" path="resourceType">
        <n-radio-group v-model:value="model.resourceType" name="resource">
          <n-radio value="1">
            成年人
          </n-radio>
          <n-radio value="2">
            未成年
          </n-radio>
          <n-radio value="3">
            幼童
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="评分" path="rate">
        <n-rate allow-half  clearable  v-model:value="model.rate" />
      </n-form-item>
      <n-form-item label="区县" path="district">
        <n-transfer ref="transfer" v-model:value="model.district" :options="districtList" />
      </n-form-item>
      <n-form-item>
        <n-space :size="22">
          <n-button type="primary" attr-type="button" @click="handleValidateClick">
            提交
          </n-button>
          <n-button attr-type="button" @click="reFormState">
            重置
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
  import {reactive, ref, Ref} from "vue";
  import { useMessage,NForm } from 'naive-ui'
  const size = ref('medium');
  const labelAlignValue = ref('left');
  const labelAlign = ref('left');
  const labelPlacement = ref('left');
  const message = useMessage();
  const formRef:Ref<InstanceType<typeof NForm> | null> = ref(null)
  const rules = ref({
    name: {required: true, trigger:['change','blur'],message:'娱乐名称不能为空！'},
    area: {required: true, trigger: ['change','blur'],message:'地区不能为空！'},
    phone: {required: true, trigger: ['change','blur'],message:'联系方式不能为空！'},
    time: {required: true, trigger: ['change','blur'],type:'date',message:'时间不能为空！'},
    state: {required: true, trigger: 'change',type:'boolean',message:'开启状态异常！'},
    activityType: {required: true, trigger: ['change','blur'],type:'array',message:'活动类型不能为空！'},
    resourceType: {required: true, trigger: ['change','blur'],message:'资源类型不能为空！'},
    rate: {required: true, trigger: ['change','blur'],type:'number',message:'评分不能为0！'},
    district: {required: true, trigger: ['change','blur'],type:'array',message:'区县不能为空！'},
  })
  const model = ref({
    name: null,
    area: null,
    phone: '',
    time: null,
    state: false,
    activityType: null,
    resourceType: null,
    rate: null,
    district: null
  })
  const souceModel = {
    name: null,
    area: null,
    phone: '',
    time: null,
    state: false,
    activityType: null,
    resourceType: null,
    rate: null,
    district: null
  }

  const areaList = ref([
    {
      label: "北京",
      value: 'beijing',
    },
    {
      label: "上海",
      value: 'shanghai',
    },
    {
      label: "广州",
      value: 'guangzhou',
    }
  ])
  const districtList = ref([
    {
      label:'朝阳区',
      value:1,
    },
    {
      label:'丰台区',
      value:2,
    },
    {
      label:'海淀区',
      value:3,
    },
    {
      label:'东城区',
      value:4,
    },
    {
      label:'西城区',
      value:5,
    },
    {
      label:'昌平区',
      value:6,
    },
    {
      label:'大兴区',
      value:7,
    },
    {
      label:'房山区',
      value:6,
    },
  ])

  const changeFormAlign = (value: string ) => {
    switch (value) {
      case 'left':{
        labelAlign.value = 'left';
        labelPlacement.value = 'left';
        break;
      }
      case 'right':{
        labelAlign.value = 'right';
        labelPlacement.value = 'left';
        break;
      }
      case 'top':{
        labelAlign.value = 'left';
        labelPlacement.value = 'top';
        break;
      }
    }
  }

  const handleValidateClick = () => {
    formRef.value?.validate((err)=>{
      if(!err){
        message.success("模拟提交成功！");
      }
    })
  }
  const reFormState = () => {
    model.value = souceModel;
    formRef.value?.restoreValidation();
  }
</script>

<style scoped>
.synthesizeFrom{
  width: 640px;
  margin: 0px auto;
}
</style>