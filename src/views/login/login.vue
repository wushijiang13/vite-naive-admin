<template>
  <div class="login">
    <div class="login-container">
      <div class="login-left">
        <div class="login-left-content">
          <h1 class="login-title">Vite Naive Admin</h1>
          <p class="login-desc">一款基于 Vue3 + Naive UI 的中后台管理系统</p>
          <div class="login-features">
            <div class="feature-item">
              <n-icon size="24" color="#fff"><Checkmark /></n-icon>
              <span>Vue 3 + TypeScript</span>
            </div>
            <div class="feature-item">
              <n-icon size="24" color="#fff"><Checkmark /></n-icon>
              <span>Naive UI 组件库</span>
            </div>
            <div class="feature-item">
              <n-icon size="24" color="#fff"><Checkmark /></n-icon>
              <span>Vite 构建工具</span>
            </div>
            <div class="feature-item">
              <n-icon size="24" color="#fff"><Checkmark /></n-icon>
              <span>Pinia 状态管理</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form-wrapper">
          <div class="login-header">
            <img src="@/assets/logo.png" alt="logo" class="login-logo" />
            <h2>欢迎登录</h2>
            <p class="login-subtitle">请输入您的账号信息</p>
          </div>
          <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-placement="left"
            :show-label="false"
            size="large"
          >
            <n-form-item path="username">
              <n-input
                v-model:value="model.username"
                placeholder="请输入用户名"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <n-icon :component="PersonOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="click"
                placeholder="请输入密码"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <n-icon :component="LockClosedOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <div class="login-options">
                <n-checkbox v-model:checked="model.remember">记住密码</n-checkbox>
                <n-button text type="primary" @click="handleForgot">忘记密码？</n-button>
              </div>
            </n-form-item>
            <n-form-item>
              <n-button
                type="primary"
                block
                :loading="loading"
                @click="handleLogin"
              >
                登 录
              </n-button>
            </n-form-item>
          </n-form>
          <div class="login-footer">
            <n-divider>其他登录方式</n-divider>
            <n-space justify="center" :size="24">
              <n-button circle secondary @click="handleOtherLogin('wechat')">
                <template #icon>
                  <n-icon :component="ChatbubblesOutline" />
                </template>
              </n-button>
              <n-button circle secondary @click="handleOtherLogin('github')">
                <template #icon>
                  <n-icon :component="LogoGithub" />
                </template>
              </n-button>
              <n-button circle secondary @click="handleOtherLogin('google')">
                <template #icon>
                  <n-icon :component="GlobeOutline" />
                </template>
              </n-button>
            </n-space>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { useStore } from "@pinia";
import {
  Checkmark,
  PersonOutline,
  LockClosedOutline,
  ChatbubblesOutline,
  LogoGithub,
  GlobeOutline,
} from "@vicons/ionicons5";

const router = useRouter();
const message = useMessage();
const store = useStore();
const formRef = ref<any>(null);
const loading = ref(false);

const model = reactive({
  username: "",
  password: "",
  remember: false,
});

const rules = ref({
  username: {
    required: true,
    trigger: ["change", "blur"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["change", "blur"],
    message: "请输入密码",
  },
});

function handleLogin() {
  formRef.value?.validate((err: any) => {
    if (!err) {
      loading.value = true;
      setTimeout(() => {
        store.login({
          username: model.username,
          password: model.password,
          remember: model.remember,
        });
        loading.value = false;
        message.success("登录成功！");
        router.push({ name: "overivew" });
      }, 800);
    }
  });
}

function handleForgot() {
  message.info("请联系管理员重置密码");
}

function handleOtherLogin(type: string) {
  message.info(`${type} 登录暂未开放，请使用账号密码登录`);
}
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  display: flex;
  width: 900px;
  min-height: 520px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-left {
  width: 400px;
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-left-content {
  color: #fff;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.login-desc {
  font-size: 14px;
  opacity: 0.85;
  margin: 0 0 40px 0;
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  opacity: 0.9;
}

.login-right {
  flex: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 340px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

.login-header h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.login-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-footer {
  margin-top: 8px;
}
</style>
