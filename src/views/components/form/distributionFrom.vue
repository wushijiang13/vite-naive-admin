<template>
  <div class="distributionFrom">
    <n-steps class="steps-box" :current="current" :status="currentStatus">
      <n-step
          title="第一步"
          description="填写转账信息"
      />
      <n-step
          title="第二步"
          description="确认转账信息"
      />
      <n-step
          title="第三步"
          description="完成"
      />
    </n-steps>
    <div class="form-box">
      <div class="success-box" v-show="current == 3">
        <n-icon size="30" color="#009753">
          <TaskAltRound />
        </n-icon>
        <p>支付成功</p>
      </div>
      <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          :label-width="80"
          :size="'medium'"
          :label-align="'left'"
          :label-placement="'left'"
          label-width="auto"
          :class="current == 3 ? 'dotted-box' : ''"
      >
        <n-form-item label="付款账户"  path="paymentAccount">
          <n-input v-model:value="model.paymentAccount" v-if="current == 1" type="password" placeholder="请输入付款账户" />
          <span v-else>{{model.paymentAccount}}</span>
        </n-form-item>
        <n-form-item label="收款账户"  path="receivingAccount">
          <n-input v-model:value="model.receivingAccount" v-if="current == 1" type="password" placeholder="请输入收款账户" />
          <span v-else>{{model.receivingAccount}}</span>
        </n-form-item>
        <n-form-item label="收款人姓名"  path="beneficiaryName">
          <n-input v-model:value="model.beneficiaryName" v-if="current == 1" type="password" placeholder="请输入收款人姓名" />
          <span v-else>{{model.beneficiaryName}}</span>
        </n-form-item>
        <n-form-item label="转账金额"  path="transferAmount">
          <n-input v-model:value="model.transferAmount" v-if="current == 1" placeholder="请输入转账金额" />
          <span v-else class="transfer-span">￥{{model.transferAmount}}元</span>
        </n-form-item>
        <n-form-item label="支付密码"  v-show="current == 2" path="payPass">
          <n-input v-model:value="model.payPass" type="password" placeholder="请输入支付密码" />
        </n-form-item>
      </n-form>
      <div>
        <n-space style="width: 100%;margin-top: 20px" :size="22" :justify="'center'">
          <n-button type="primary" attr-type="button" @click="submit">
            {{ current == 1 ? '下一步' : current == 2 ? '提交' : '再转一笔' }}
          </n-button>
          <n-button v-show="current > 1 && current < 3" attr-type="button" @click="preSubmit">
            上一步
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StepsProps } from 'naive-ui'
import { TaskAltRound } from '@vicons/material'
import { Ref,ref } from 'vue'
const currentRef:Ref<number | null> = ref(1)
const currentStatus: Ref<StepsProps['status']> = ref('process');
const current = currentRef;
const submitText = ref('下一步');
const model = ref({
  paymentAccount:'*************',
  receivingAccount:'*************',
  beneficiaryName:'无名氏',
  transferAmount:2000,
  payPass:'123456'
})
const rules = {
  paymentAccount: {required: true, trigger:['change','blur'],message:'付款账户不能为空！'},
  receivingAccount: {required: true, trigger: ['change','blur'],message:'收款账户不能为空！'},
  beneficiaryName: {required: true, trigger: ['change','blur'],message:'收款人姓名不能为空！'},
  transferAmount: {required: true, trigger: ['change','blur'],type:'number',message:'转账金额不能为空！'},
}
const updateCurrent = () => {
  switch (currentRef.value){
    case 1:{
      submitText.value ='下一步';
      break;
    }
    case 2:{
      submitText.value ='提交';
      break;
    }
    case 3:{
      submitText.value ='再转一笔';
      break;
    }
  }
}
const submit = () => {
  currentRef.value ++;
  if(currentRef.value == 4){
    currentRef.value = 1;
  }
  updateCurrent()
}
const preSubmit = () => {
  if(currentRef.value > 1){
    currentRef.value --;
  }
  updateCurrent()
}
</script>

<style scoped>
.distributionFrom{
  width: 640px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.steps-box{
  width: 500px;
}
.form-box{
  width: 590px;
  margin-top: 20px;
}
.success-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transfer-span{
  font-weight: 600;
}
.dotted-box{
  padding: 20px;
  background-color: #f5f7f8;
  border-radius: 5px;
  border: 1px dashed #dcdfe6;
}
</style>