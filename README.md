<p align="center">
  <a href="https://wushijiang13.github.io/vite-naive-admin/" target="_blank" rel="noopener noreferrer">
    <img width="120" src="https://github.com/wushijiang13/vite-naive-admin/assets/38801556/55bcf359-c11d-4b1e-a57c-5e9c1ccafd5a" alt="logo">
  </a>
</p>

<h1 align="center">Vite Naive Admin</h1>

<p align="center">
  基于 Vite 6 + Vue 3 + Naive UI + TypeScript 5 的中后台管理系统
</p>

<p align="center">
  <a href="https://wushijiang13.github.io/vite-naive-admin/" target="_blank">在线预览</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://github.com/wushijiang13/vite-naive-admin" target="_blank">GitHub 仓库</a>
</p>

---

## 功能一览

### 布局与导航

- 多布局切换（常规 / 仿 Ant Design / 仿 Teambition / 顶部导航）
- Tab 页展示与快捷操作
- Tab 页右键菜单
- 路由守卫与权限控制
- 动态锚点、动态 Meta、动态路径参数（params / query）

### 表单组件

- 综合表单、分步表单
- 按钮、文字链接、单选框、多选框
- 输入框、计数器、选择器、开关、滑块
- 时间选择器、日期选择器、日期时间选择器、评分

### 数据展示

- 综合表格、行内编辑表格、列表、描述
- 日历、图标展示
- 图表（ECharts）
- Excel 预览（LuckySheet）
- JSON 格式化展示

### 富文本与编辑器

- 腾讯文档（wangEditor 富文本编辑器）

### 导出与打印

- Excel 导出 / 导出选中行 / 导出合并列
- 打印功能

### 其他功能

- 通知、时间线、多标签、水印、分享（二维码）
- 弹框拖拽、卡片拖拽、无框页面
- 多级路由、外链、自定义外链、上传
- iframe 内嵌页面

### 主题与个性化

- 主题可选配色（多套预设色）
- 随机换肤
- 黑白模式切换
- 主题配置抽屉面板

### 国际化

- 中英文切换（vue-i18n）

### 全局搜索

- Ctrl+K / Cmd+K 快捷键唤起
- 模糊搜索所有模块
- 键盘导航（上下箭头 + Enter）
- 搜索结果点击直接打开 Tab

### 锁屏

- 一键锁屏，解锁后方可继续操作

### 登录页

- 独立登录页面，支持路由守卫

### 工作流

- 工作流页面展示

### 版本管理

- 自动版本号递增（`pnpm version:bump`，满 10 进位）
- 部署时间自动获取上次 Git 提交时间

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建产物
pnpm preview

# 版本号递增（每次提交前执行）
pnpm version:bump
```

---

## 待开发

- 错误日志模拟
- CSS 动画
- 第三方登录
- 兼容移动端操作

---

## 更新日志

### V1.0.0 (当前)

**新增功能**
- 全局搜索（Ctrl+K / Cmd+K，模糊搜索 + 键盘导航）
- 锁屏功能
- 登录页
- 工作流页面
- Excel 预览功能
- 国际化（中英文切换）
- 版本号自动递增机制
- 部署时间动态获取 Git 提交时间

**依赖升级**
- Vite 2 → 6.4
- TypeScript 4 → 5.8
- vue-tsc 0.29 → 3.2
- vue-i18n 10 → 11
- axios 0.21 → 1.9
- vue-router 4.4 → 4.6
- pinia 2.2 → 2.3
- echarts 5.5 → 5.6
- vue-qr 4 → 5
- vue-json-pretty 2.4 → 2.6

**修复**
- 修复主题 CSS 选择器问题
- 修复切换布局后无框返回异常
- 修复刷新后主题颜色还原问题
- 修复默认无缓存异常
- 增加构建内存限制与依赖分块策略解决 OOM