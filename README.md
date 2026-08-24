# dsh-codex-theme

把 Codex 主题配置（`codex-themes.json`，80 款浅/深色主题）做成 DeepSeek Harness (DSH) 的主题选择插件：默认即 Codex 配色，在 **设置 → Codex 主题** 里直接选择主题预设（浅色 26 款 + 深色 54 款），并可自定义 UI/代码字体与字号；设置持久化到 `settings.yaml`，重启保持。

## 主题来源与映射

主题预设由 `scripts/build-presets.mjs` 从 Codex 主题配置（VS Code 风格 `colors`/`tokenColors` 清单）转换生成 `src/client/presets.ts`（已提交，构建不依赖外部文件；重新生成：`node scripts/build-presets.mjs [path/to/codex-themes.json]`）。映射规则：`surface = editor.background`、`ink = editor.foreground`、`accent` 在 focusBorder/textLink/button/badge 中按与背景对比度择优（<1.8 回落默认）、侧边栏取 `sideBar.background`；对比度固定 45/60，diff/技能色用 Codex 默认。

## 主题参数映射

| Codex 参数 | 浅色 (light) | 深色 (dark) | DSH 映射 |
|---|---|---|---|
| `variant` | light | dark | 覆盖层的 `light` / `dark` 半侧 |
| `accent` | `#339cff` | `#0169cc` | `--dsw-alias-brand-primary` 及品牌/按钮/信息/悬停系 token |
| `surface` | `#ffffff` | `#111111` | `--dsw-alias-bg-base` 及各层表面 |
| `ink` | `#1a1c1f` | `#fcfcfc` | `--dsw-alias-label-primary` 及文本阶梯 |
| `contrast` | 45 | 60 | 次级文字 = ink 按 contrast% 混 surface（`--dsw-alias-label-secondary`）；边框/hover 按 ink 混 surface 的分档推导 |
| `diffAdded` | `#00a240` | `#00a240` | `--dsw-alias-state-success-*` |
| `diffRemoved` | `#ba2623` | `#e02e2a` | `--dsw-alias-state-error-*` |
| `skill` | `#924ff7` | `#b06dff` | `--dsw-alias-state-business-*`（DSH 中技能徽章/目录入口的强调位） |
| `opaqueWindows` | true | true | 无需映射（DSH 界面本就不透明） |
| `fonts` | null | null | 面板可选字体族/字号；默认「系统默认」不覆盖 |
| `codeThemeId` | codex | codex | 不映射（代码块高亮由 Shiki 样式表驱动，不在 `--dsw-*` token 体系内） |

完整的 token 推导（每步的混合比例）见 `src/client/derive.ts`；字体 token 推导见 `src/client/fonts.ts`。

## 行为

- 插件加载时通过 `theme.overrideTokens` 叠加 token 覆盖层（`dsh-codex-theme` 源）：
  - **浅色**外观 → Codex 浅色调色板；**深色**外观 → Codex 深色调色板；
  - 覆盖层与内置主题偏好无关，不受 settings 同步/重连回退影响；外观三选一切换即时生效。
- **设置 → Codex 主题**：直接选择主题——「浅色主题」「深色主题」两个下拉（预设来自 Codex 主题配置，各带 6 段色带预览）；用户不能编辑颜色，只能改 UI/代码字体与字号。修改即时生效。字体下拉由 host 路由（macOS system_profiler，缓存 10 分钟）按本机实际安装的字体过滤，只列可用项。
- 持久化：host 注册了 `dsh-codex-theme` 设置命名空间，写入 `$DSH_HOME/settings.yaml`（比浏览器本地存储更稳：桌面应用重启换端口也不丢）。
- 想彻底停用：在 DSH 设置 → 插件管理中禁用/卸载本插件（回到 DSH 原生外观）。

## 构建

```bash
pnpm install
pnpm run build   # 产出 lib/index.js（host：注册 settings schema）与 lib/client.js（ModuleLoader bundle）
```

## 安装到 profile

```bash
dsh plugin --profile web add link:/path/to/dsh-codex-theme
# 或手动：在 ~/.dsh/profiles/<profile>/package.json 的 dependencies 加
#   "dsh-codex-theme": "link:/path/to/dsh-codex-theme"
# 并把 "dsh-codex-theme" 加入 dsh.profile.bundles，然后在该目录 pnpm install
```

装好后重启 DSH（Desktop 应用或 `dsh web`）生效。
