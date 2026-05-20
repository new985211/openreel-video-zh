# OpenReel Video — 中文说明

> **开源的 CapCut 替代方案。在浏览器中进行专业视频编辑，无需上传，无需安装，100% 开源。**

OpenReel Video 是一款功能完整的浏览器端视频编辑器，完全在客户端运行。基于 React、TypeScript、WebCodecs 和 WebGPU 构建，无需昂贵软件或云处理即可进行专业级视频编辑。

**[在线体验](https://openreel.video)** | **[原项目文档](CONTRIBUTING.md)** | **[讨论区](https://github.com/Augani/openreel-video/discussions)**

---

## 本分支改动（中文语言支持）

在原项目 [Augani/openreel-video](https://github.com/Augani/openreel-video) 的基础上，本分支增加了以下功能：

### 新增中文界面语言支持

- **i18n 国际化框架**：集成 `i18next` + `react-i18next`，支持多语言切换
- **中文翻译文件**：位于 `apps/web/src/i18n/locales/zh/translation.json`，包含 ~80 个翻译键，覆盖所有主要界面
- **语言切换器**：设置 > 通用 > 语言（Settings > General > Language），支持 English / 中文即时切换
- **持久化存储**：语言偏好自动保存到 localStorage，刷新页面后保持

### 已翻译的界面模块

| 模块 | 翻译内容 |
|------|---------|
| 欢迎页面 | 应用名称、格式选择（竖屏/横屏/方形）、按钮标签、底部跳过提示 |
| 工具栏 | 搜索占位符、导出选项、所有工具提示（tooltip）、Toast 通知 |
| 设置面板 | 通用/AI 提供商标签、自动保存、语言选择器 |
| 素材面板 | 媒体/文字/图形/AI 生成/配方/模板标签及描述 |
| 右键菜单 | 视频/音频/图片片段的复制、分割、特效、删除等操作 |
| 键盘快捷键 | 标题、搜索占位符、分类标签、重置按钮、底部提示 |
| 录制控制 | 暂停/继续/停止/取消按钮提示 |
| 移动端阻止 | 桌面端提示信息 |
| 导出对话框 | 宽高比标签 |

### 其他修复

- 修复 `tailwind.config.js` 在 ESM 环境下的兼容性问题（`require` → `import`）
- 添加 `react-i18next` 测试 mock 确保现有测试通过
- 修复生产构建 `python3 -m http.server` 无法使用的问题：添加 `serve.py` 脚本自动设置 COOP/COEP 响应头（`SharedArrayBuffer` 所需）
- 修复导出功能依赖外部 CDN 的问题：FFmpeg.wasm 核心文件本地化，优先从 `/ffmpeg-core/` 加载，CDN 降级
- 修复 `ffmpeg-fallback.ts` 中 `toBlobURL` 重复导入问题

### 修改/新增文件

```
apps/web/
├── package.json                              # 新增 i18next, react-i18next 依赖
├── tailwind.config.js                        # 修复 ESM 兼容性
├── public/
│   └── ffmpeg-core/                          # FFmpeg.wasm 核心文件本地化（全新）
│       ├── ffmpeg-core.js
│       ├── ffmpeg-core.wasm
│       ├── ffmpeg-core-mt.js
│       ├── ffmpeg-core-mt.wasm
│       └── ffmpeg-core-mt.worker.js
├── dist/
│   └── serve.py                              # 生产构建本地服务器（全新，自动 COOP/COEP 头）
├── src/
│   ├── main.tsx                              # 导入 i18n 初始化
│   ├── App.tsx                               # 项目名称/加载提示国际化
│   ├── i18n/
│   │   ├── index.ts                          # i18next 配置（全新）
│   │   └── locales/
│   │       ├── en/translation.json           # 英文翻译（全新）
│   │       └── zh/translation.json           # 中文翻译（全新）
│   ├── stores/
│   │   └── settings-store.ts                 # setLanguage 同步语言切换
│   ├── test/
│   │   └── setup.ts                          # react-i18next mock
│   └── components/
│       ├── MobileBlocker.tsx                 # 移动端阻止国际化
│       ├── welcome/
│       │   └── WelcomeScreen.tsx             # 欢迎页国际化
│       └── editor/
│           ├── Toolbar.tsx                   # 工具栏国际化
│           ├── EditorInterface.tsx           # 加载状态国际化
│           ├── AssetsPanel.tsx               # 素材面板国际化
│           ├── ExportDialog.tsx              # 导出对话框国际化
│           ├── RecordingControls.tsx          # 录制控制国际化
│           ├── KeyboardShortcutsOverlay.tsx  # 快捷键弹窗国际化
│           ├── settings/
│           │   ├── SettingsDialog.tsx        # 设置标题/标签国际化
│           │   └── GeneralPanel.tsx          # 通用设置+语言切换器
│           └── timeline/
│               ├── ClipContextMenu.tsx       # 片段右键菜单国际化
│               └── GraphicsClipContextMenu.tsx # 图形右键菜单国际化
packages/core/src/media/
└── ffmpeg-fallback.ts                        # 修复 FFmpeg 优先本地加载 + CDN 降级
```

---

## 如何切换到中文

1. 启动应用后，点击工具栏右侧的 **齿轮图标**（Settings）
2. 在 **General**（通用）标签页中，找到 **Language**（语言）下拉菜单
3. 选择 **中文 (Chinese)**
4. 界面即时切换为中文，偏好自动保存

---

## 快速开始

### 在线使用
访问 **[openreel.video](https://openreel.video)** 即可开始编辑。

### 本地运行

```bash
# 克隆本仓库
git clone https://github.com/new985211/openreel-video-zh.git
cd openreel-video-zh

# 安装依赖（需要 Node.js 18+）
pnpm install

# 启动开发服务器
pnpm dev

# 浏览器打开 http://localhost:5173
```

### 生产构建

```bash
pnpm build
pnpm preview
```

### 使用自定义服务器部署构建产物

构建产物位于 `apps/web/dist/` 目录。由于应用依赖 `SharedArrayBuffer`（FFmpeg.wasm 所需），部署时必须设置以下 HTTP 响应头：

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

如果不设置这两个头，视频加载和导出功能将无法使用。

#### 本地测试构建产物

**不要**直接使用 `python3 -m http.server`（缺少 COOP/COEP 头）。应使用构建产物目录中自带的 `serve.py` 脚本：

```bash
cd apps/web/dist
python3 serve.py [端口号]  # 默认 8000
```

`serve.py` 自动为每个响应添加 COOP/COEP 头，并支持 SPA 路由（所有非文件路径回退到 `index.html`）。

#### FFmpeg 核心文件本地化

为了消除对 `unpkg.com` CDN 的网络依赖，构建时会自动将 FFmpeg.wasm 核心文件（约 32MB）复制到 `dist/ffmpeg-core/` 目录。应用会优先从本地加载，仅当本地文件不可用时才回退到 CDN。

---

## 浏览器要求

| 浏览器 | 版本 | 状态 |
|---------|------|------|
| Chrome | 94+ | 完全支持 |
| Edge | 94+ | 完全支持 |
| Firefox | 130+ | 完全支持 |
| Safari | 16.4+ | 完全支持 |

**推荐配置：**
- 8GB+ 内存
- 独立 GPU（用于 4K 编辑）
- 现代多核 CPU

---

## 项目架构

```
openreel/
├── apps/web/              # React 前端
│   └── src/
│       ├── components/    # UI 组件
│       ├── stores/        # Zustand 状态管理
│       ├── services/      # 自动保存、快捷键、屏幕录制
│       ├── bridges/       # 引擎协调
│       └── i18n/          # 国际化（新增）
│           └── locales/   # en / zh 翻译文件
│
└── packages/core/         # 核心引擎
    └── src/
        ├── video/         # 视频处理、WebGPU 渲染
        ├── audio/         # Web Audio API、音效
        ├── graphics/      # Canvas/THREE.js、SVG
        ├── text/          # 文字渲染、动画
        ├── export/        # MP4/WebM 编码
        └── storage/       # IndexedDB、序列化
```

### 核心技术

- **React 18** + **TypeScript** — 类型安全的 UI
- **Zustand** — 轻量级状态管理
- **i18next** + **react-i18next** — 国际化多语言支持（新增）
- **MediaBunny** — 视频/音频处理
- **WebCodecs** — 硬件编解码
- **WebGPU** — GPU 加速渲染
- **Web Audio API** — 专业音频处理

---

## 开源协议

MIT License — 个人和商业项目均可免费使用。详见 [LICENSE](LICENSE)。

---

**与 AI 协作构建，让专业视频编辑触手可及。永久免费，永久开源。**
