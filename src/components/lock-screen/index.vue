<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Lock } from '@icon-park/vue-next'
import { getLocalData, setLocalData } from '@utils'

const password = ref('')
const shake = ref(false)
const visible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const lock = () => {
  visible.value = true
  setLocalData('isLocked', true)
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const checkLockState = () => {
  const isLocked = getLocalData('isLocked')
  if (isLocked) {
    visible.value = true
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 阻止键盘快捷键绕过锁屏
const preventShortcuts = (e: KeyboardEvent) => {
  if (!visible.value) return
  // 允许在输入框中正常输入
  const target = e.target as HTMLElement
  if (target === inputRef.value) return
  e.preventDefault()
  e.stopPropagation()
}

onMounted(() => {
  checkLockState()
  window.addEventListener('storage', checkLockState)
  document.addEventListener('keydown', preventShortcuts, true)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkLockState)
  document.removeEventListener('keydown', preventShortcuts, true)
})

const handleUnlock = () => {
  if (password.value.trim() === '') {
    triggerShake()
    return
  }
  // 任意密码均可解锁
  visible.value = false
  setLocalData('isLocked', false)
  password.value = ''
}

const triggerShake = () => {
  shake.value = true
  setTimeout(() => {
    shake.value = false
  }, 600)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleUnlock()
  }
}

defineExpose({ lock })
</script>

<template>
  <Transition name="lock-fade">
    <div v-if="visible" class="lock-screen" @click.self="() => {}">
      <div class="lock-content" :class="{ shake }">
        <div class="lock-icon-wrapper">
          <Lock theme="outline" size="48" fill="rgba(255,255,255,0.85)" :strokeWidth="2" />
        </div>
        <div class="lock-app-name">
          <span class="lock-app-name-text">Vite Naive Admin</span>
        </div>
        <div class="lock-input-wrapper">
          <input
            ref="inputRef"
            v-model="password"
            type="password"
            class="lock-input"
            placeholder="请输入密码解锁"
            @keydown="handleKeydown"
          />
        </div>
        <span class="lock-hint">输入后,回车Enter解锁哦~</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lock-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: overlay-in 0.4s ease forwards;
  pointer-events: auto;
}

@keyframes overlay-in {
  from {
    backdrop-filter: blur(0px) saturate(1.2);
    -webkit-backdrop-filter: blur(0px) saturate(1.2);
  }
  to {
    backdrop-filter: blur(40px) saturate(1.2);
    -webkit-backdrop-filter: blur(40px) saturate(1.2);
  }
}

.lock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: content-slide-in 0.5s ease forwards;
  opacity: 0;
  transform: translateY(-30px);
}

@keyframes content-slide-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lock-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.lock-app-name {
  margin-top: -8px;
  text-align: center;
}

.lock-app-name-text {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 6px;
  color: rgba(255, 255, 255, 0.75);
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
}

.lock-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lock-input {
  width: 220px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 14px;
  padding: 0 14px;
  outline: none;
  transition: border-color 0.3s;
}

.lock-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.lock-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

.lock-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 1px;
  margin-top: -12px;
}

.shake {
  animation: shake-anim 0.6s ease;
}

@keyframes shake-anim {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}

.lock-fade-enter-active {
  transition: opacity 0.3s ease;
}

.lock-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lock-fade-enter-from,
.lock-fade-leave-to {
  opacity: 0;
}
</style>
