<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouterStore } from '@pinia/routerFlat'
import { useStore } from '@pinia'
import { useI18n } from 'vue-i18n'
import type { menuOptions } from '@types'

const routerStore = useRouterStore()
const store = useStore()
const { t, locale } = useI18n()

const show = ref(false)
const keyword = ref('')
const inputRef = ref<any>(null)
const activeIndex = ref(-1)
const resultListRef = ref<HTMLElement | null>(null)

// 获取所有可导航的模块（有 component 的叶子节点）
const searchableModules = computed(() => {
  return routerStore.flatList.filter((item: menuOptions) => {
    return item.component && !item.children
  })
})

// 模糊搜索结果
const searchResults = computed(() => {
  if (!keyword.value.trim()) return searchableModules.value
  const kw = keyword.value.trim().toLowerCase()
  return searchableModules.value.filter((item: menuOptions) => {
    const label = t(`message.${item.key}`).toLowerCase()
    const key = item.key.toLowerCase()
    return label.includes(kw) || key.includes(kw)
  })
})

// 打开搜索面板
function openSearch() {
  show.value = true
  keyword.value = ''
  activeIndex.value = -1
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 关闭搜索面板
function closeSearch() {
  show.value = false
  keyword.value = ''
  activeIndex.value = -1
}

// 选中某个模块
function selectModule(item: menuOptions) {
  closeSearch()
  const existIndex = store.tabPageList.findIndex((tab: menuOptions) => tab.key === item.key)
  if (existIndex !== -1) {
    store.tabPageList.splice(existIndex, 1)
    store.tabPageList.push(item)
  }
  store.menuAction(item.key, routerStore.flatObject[item.key])
}

// 键盘导航
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeSearch()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (searchResults.value.length > 0) {
      activeIndex.value = (activeIndex.value + 1) % searchResults.value.length
    }
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (searchResults.value.length > 0) {
      activeIndex.value = activeIndex.value <= 0
        ? searchResults.value.length - 1
        : activeIndex.value - 1
    }
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    if (activeIndex.value >= 0 && activeIndex.value < searchResults.value.length) {
      selectModule(searchResults.value[activeIndex.value])
    }
    return
  }
}

// 全局快捷键 Ctrl+K / Cmd+K 打开搜索
function globalKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (show.value) {
      closeSearch()
    } else {
      openSearch()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', globalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', globalKeydown)
})

watch(searchResults, () => {
  activeIndex.value = -1
})

// 键盘导航时，自动滚动到激活项
watch(activeIndex, () => {
  nextTick(() => {
    const activeEl = resultListRef.value?.querySelector('.search-result-item.active')
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })
})

defineExpose({ openSearch })
</script>

<template>
  <Teleport to="body">
    <Transition name="search-overlay">
      <div v-if="show" class="global-search-overlay" @click.self="closeSearch">
        <div class="global-search-container">
          <!-- 搜索框 -->
          <div class="global-search-box">
            <div class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              ref="inputRef"
              v-model="keyword"
              class="search-input"
              :placeholder="locale === 'zh' ? '搜索模块...' : 'Search modules...'"
              @keydown="handleKeydown"
            />
            <div class="search-shortcut-hint">
              <kbd>ESC</kbd>
            </div>
          </div>

          <!-- 搜索结果列表 -->
          <div ref="resultListRef" class="search-results" v-if="searchResults.length > 0">
            <div
              v-for="(item, index) in searchResults"
              :key="item.key"
              class="search-result-item"
              :class="{ active: index === activeIndex }"
              @click="selectModule(item)"
              @mouseenter="activeIndex = index"
            >
              <div class="result-icon">
                <n-icon v-if="item.icon" size="16" :component="item.icon"/>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </div>
              <div class="result-content">
                <span class="result-label">{{ t(`message.${item.key}`) }}</span>
                <span class="result-key">{{ item.key }}</span>
              </div>
            </div>
          </div>

          <!-- 无结果提示 -->
          <div class="search-no-results" v-if="keyword.trim() && searchResults.length === 0">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="8" x2="14" y2="14"/>
              <line x1="14" y1="8" x2="8" y2="14"/>
            </svg>
            <span>{{ locale === 'zh' ? '未找到匹配的模块' : 'No matching modules found' }}</span>
          </div>

          <!-- 底部快捷键提示 -->
          <div class="search-footer">
            <div class="footer-item">
              <kbd>↑↓</kbd>
              <span>{{ locale === 'zh' ? '导航' : 'Navigate' }}</span>
            </div>
            <div class="footer-item">
              <kbd>Enter</kbd>
              <span>{{ locale === 'zh' ? '打开' : 'Open' }}</span>
            </div>
            <div class="footer-item">
              <kbd>ESC</kbd>
              <span>{{ locale === 'zh' ? '关闭' : 'Close' }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.global-search-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
}

.global-search-container {
  width: 560px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: var(--theme-back-color, #fff);
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid var(--theme-layout-background-coolr, #f5f7f8);
}

.global-search-box {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--theme-layout-background-coolr, #f5f7f8);
  gap: 12px;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color, #000);
  opacity: 0.45;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: var(--theme-color, #000);
  font-weight: 400;
  letter-spacing: 0.02em;
  caret-color: var(--theme-active-color, #18a058);
}

.search-input::placeholder {
  color: var(--theme-color, #000);
  opacity: 0.35;
}

.search-shortcut-hint {
  flex-shrink: 0;
}

.search-shortcut-hint kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-size: 11px;
  font-family: inherit;
  border-radius: 4px;
  border: 1px solid var(--theme-color, #000);
  opacity: 0.15;
  background: var(--theme-layout-background-coolr, #f5f7f8);
  color: var(--theme-color, #000);
  opacity: 0.45;
  line-height: 1.4;
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  max-height: 50vh;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  gap: 12px;
  transition: background 0.15s ease;
  margin-bottom: 2px;
  position: relative;
}

.search-result-item:hover,
.search-result-item.active {
  background: var(--theme-layout-background-coolr, #f5f7f8);
}

.search-result-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  border-radius: 2px;
  background: var(--theme-active-color, #18a058);
}

.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--theme-layout-background-coolr, #f5f7f8);
  color: var(--theme-color, #000);
  opacity: 0.5;
  flex-shrink: 0;
}

.search-result-item.active .result-icon {
  background: var(--theme-active-color, #18a058);
  color: var(--theme-back-color, #fff);
  opacity: 1;
}

.result-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.result-label {
  font-size: 14px;
  color: var(--theme-color, #000);
  font-weight: 500;
}

.result-key {
  font-size: 12px;
  color: var(--theme-color, #000);
  opacity: 0.25;
  font-weight: 400;
}

.search-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 12px;
  color: var(--theme-color, #000);
  opacity: 0.35;
  font-size: 14px;
}

.search-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-top: 1px solid var(--theme-layout-background-coolr, #f5f7f8);
  gap: 20px;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--theme-color, #000);
  opacity: 0.35;
}

.footer-item kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 5px;
  font-size: 11px;
  font-family: inherit;
  border-radius: 4px;
  border: 1px solid var(--theme-color, #000);
  opacity: 0.12;
  background: var(--theme-layout-background-coolr, #f5f7f8);
  color: var(--theme-color, #000);
  opacity: 0.4;
  line-height: 1.4;
}

/* 过渡动画 */
.search-overlay-enter-active {
  transition: opacity 0.2s ease;
}
.search-overlay-enter-active .global-search-container {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.search-overlay-leave-active {
  transition: opacity 0.15s ease;
}
.search-overlay-leave-active .global-search-container {
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.search-overlay-enter-from {
  opacity: 0;
}
.search-overlay-enter-from .global-search-container {
  transform: scale(0.97) translateY(-10px);
  opacity: 0;
}
.search-overlay-leave-to {
  opacity: 0;
}
.search-overlay-leave-to .global-search-container {
  transform: scale(0.97) translateY(-10px);
  opacity: 0;
}
</style>