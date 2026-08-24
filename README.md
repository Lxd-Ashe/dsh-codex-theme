# dsh-codex-theme

[English](README.en.md) | 中文

Codex 主题外观插件 for DeepSeek Harness（DSH）：把 Codex 主题配置（`codex-theme-v1`，80 款浅/深色主题）做成可在 DSH 中直接切换、可自定义的外观插件。

## 功能

- **80 款主题预设**：浅色 26 款 + 深色 54 款，默认即 Codex 配色（浅色 accent `#339CFF` / 深色 accent `#0169CC`）。
- **设置 → Codex 主题**：在 DSH 设置页直接选择「浅色主题」「深色主题」预设（每个预设带 6 段色带预览），切换即时生效。
- **字体与字号自定义**：可分别设置 UI 字体/字号、代码字体/字号；字体下拉只列出本机实际安装的字体，「系统默认」即不覆盖 DSH 原生外观。
- **持久化**：所有设置写入 `$DSH_HOME/settings.yaml`，重启 DSH 后保持不变。
- **可随时停用**：在 DSH 设置 → 插件管理中禁用/卸载本插件，即回到 DSH 原生外观。

## 截图

**深色主题（Codex 默认）**

![深色主题（Codex 默认）](docs/dark-theme.png)

**浅色主题（Codex 默认）**

![浅色主题（Codex 默认）](docs/light-theme.png)

## 运行原理

本插件是一个 DSH 双半插件（host + client）：

- **Host 半侧**（`lib/index.js`）：
  1. 注册 `dsh-codex-theme` 设置命名空间（写入 `$DSH_HOME/settings.yaml`）；
  2. 注册本机字体枚举路由（`/api/dsh-codex-theme/fonts`），供外观面板过滤字体下拉，只显示实际安装的字体。
- **Client 半侧**（`lib/client.js`）：在设置页注入「Codex 主题」面板，通过 `theme.overrideTokens` 把所选预设映射为 DSH 的 `--dsw-*` 主题 token 覆盖层：
  - `surface` → 背景表面 token，`ink` → 文本 token，`accent` → 品牌/按钮/高亮 token，`contrast` → 次级文本与边框的分档推导，diff 与技能色 → 对应的语义状态 token；
  - 覆盖层按「浅色 / 深色」外观各自生效，与 DSH 内置主题偏好无关，不受设置同步/重连回退影响，外观三选一切换即时生效。

主题预设表 `src/client/presets.ts` 由 `scripts/build-presets.mjs` 从 Codex 主题配置（VS Code 风格的 `colors`/`tokenColors` 清单）转换生成（已提交，构建不依赖外部文件；重新生成：`node scripts/build-presets.mjs [path/to/codex-themes.json]`）。

## 支持平台

本插件的客户端平台为 DSH Web GUI，跟随 DSH 运行，**macOS 与 Windows 均支持**：

- 主题、字体、设置持久化等全部功能与操作系统无关，在两个平台上行为一致；
- 字体自动检测在 macOS 上最完整（host 通过 `system_profiler` 枚举本机字体，结果缓存 10 分钟）；其他平台枚举失败时优雅回退，字体下拉会显示全部候选字体。

## 安装

> 要求 Node.js ≥ 20、已安装 DSH（`dsh` 命令可用）。

### 方式一：一键添加

在 DSH Desktop 内置终端（或安装了 DSH CLI 的终端）中执行：

```bash
# 已发布到 npm registry 时
dsh plugin add dsh-codex-theme

# 直接从 GitHub 安装（无需发布到 npm）
dsh plugin add github:Lxd-Ashe/dsh-codex-theme
```

> 独立使用 dsh CLI 时如未配置默认 profile，需显式指定：`dsh plugin --profile <profile-name> add ...`。

安装完成后重启 DSH（Desktop 应用或 `dsh web`）生效。

### 方式二：源码下载编译安装

```bash
git clone https://github.com/Lxd-Ashe/dsh-codex-theme.git
cd dsh-codex-theme
pnpm install
pnpm run build          # 产出 lib/index.js（host）与 lib/client.js（client bundle）

# 以本地链接方式安装到 profile
dsh plugin add link:/absolute/path/to/dsh-codex-theme
# 独立 dsh CLI 需显式指定 profile：
#   dsh plugin --profile <profile-name> add link:/absolute/path/to/dsh-codex-theme
```

安装完成后重启 DSH（Desktop 应用或 `dsh web`）生效。

### 卸载

```bash
dsh plugin remove dsh-codex-theme
```

也可以在 DSH 设置 → 插件管理中禁用或卸载本插件。

## 构建

```bash
pnpm install
pnpm run build       # 产出 lib/index.js 与 lib/client.js
pnpm run typecheck   # 类型检查
```

## 目录结构

```
├── lib/                      # 构建产物（host + client）
├── docs/                     # 截图（深色 / 浅色主题）
├── scripts/build-presets.mjs # 从 Codex 主题配置生成预设表
├── src/
│   ├── index.ts              # host：设置命名空间 + 字体枚举路由
│   ├── fonts-route.ts        # 本机字体枚举（macOS system_profiler）
│   ├── settings-schema.ts    # 设置 schema
│   └── client/               # client：主题面板与 token 推导
├── dsh.plugin.json           # DSH 插件清单
├── cordis.patch.yml          # bundle patch：挂载插件行
└── build.mjs                 # esbuild 构建脚本
```

## License

本项目采用 [MIT](LICENSE) 开源协议。
