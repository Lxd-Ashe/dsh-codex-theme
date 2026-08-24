/**
 * dsh-codex-theme 数据模型：主题以预设表（src/client/presets.ts，由
 * scripts/build-presets.mjs 从 codex 主题配置生成）选择，设置只存
 * 浅色/深色各一个预设索引 + 字体偏好；不再保存自定义颜色。
 *
 * 默认 = 预设表 index 0（Codex 默认，即 codex-theme-v1 导出值）：
 * - light: accent #339cff / surface #ffffff / ink #1a1c1f / contrast45
 * - dark:  accent #0169cc / surface #111111 / ink #fcfcfc / contrast60
 *
 * 字体：候选清单由 host 字体枚举路由按本机安装情况过滤后显示；
 * 选中值直接存字体族名（`system` = 不覆盖 DSH 默认）。
 * 字号默认 16/13 = DSH 原生基准（delta 为 0，不改变任何字号）。
 */

export interface ModeKnobs {
  /** 强调色（brand / 按钮 / 高亮） */
  accent: string;
  /** 背景 surface */
  surface: string;
  /** 前景文字 ink */
  ink: string;
  /** 对比度 0–100：次级文字 = ink 按该比例混 surface */
  contrast: number;
  /** diff 新增行 / 成功态 */
  diffAdded: string;
  /** diff 删除行 / 错误态 */
  diffRemoved: string;
  /** 技能徽章强调色 */
  skill: string;
  /** 侧边栏填充色（空 = 由 ink/surface 派生） */
  sidebar: string;
}

export interface CodexSettings {
  /** 浅色主题预设索引（LIGHT_PRESETS） */
  lightPreset: number;
  /** 深色主题预设索引（DARK_PRESETS） */
  darkPreset: number;
  /** UI 字体族名（system = 不覆盖） */
  uiFont: string;
  /** UI 基准字号（DSH 原生基准 16） */
  uiFontSize: number;
  /** 工作区/侧边栏基准字号（DSH 原生基准 14，独立于 UI 字号） */
  workspaceFontSize: number;
  /** 代码字体族名（system = 不覆盖） */
  codeFont: string;
  /** 代码基准字号（DSH 原生基准 13） */
  codeFontSize: number;
}

export const DEFAULT_LIGHT_KNOBS: Readonly<ModeKnobs> = Object.freeze({
  accent: "#339CFF",
  surface: "#FFFFFF",
  ink: "#1A1C1F",
  contrast: 45,
  diffAdded: "#00A240",
  diffRemoved: "#BA2623",
  skill: "#924FF7",
  sidebar: "",
});

export const DEFAULT_DARK_KNOBS: Readonly<ModeKnobs> = Object.freeze({
  accent: "#0169CC",
  surface: "#111111",
  ink: "#FCFCFC",
  contrast: 60,
  diffAdded: "#00A240",
  diffRemoved: "#E02E2A",
  skill: "#B06DFF",
  sidebar: "",
});

export const DEFAULT_SETTINGS: Readonly<CodexSettings> = Object.freeze({
  lightPreset: 0,
  darkPreset: 0,
  uiFont: "system",
  uiFontSize: 16,
  workspaceFontSize: 14,
  codeFont: "system",
  codeFontSize: 13,
});

/** UI 字体候选（按本机安装情况动态过滤显示）。 */
export const UI_FONT_CANDIDATES = [
  "PingFang SC",
  "Hiragino Sans GB",
  "Helvetica Neue",
  "Avenir Next",
  "Gill Sans",
  "Futura",
  "Optima",
  "Baskerville",
  "Songti SC",
  "STHeiti",
  "Times New Roman",
] as const;

/** 代码字体候选（按本机安装情况动态过滤显示）。 */
export const CODE_FONT_CANDIDATES = [
  "SF Mono",
  "Menlo",
  "Monaco",
  "Maple Mono",
  "0xProto Nerd Font Mono",
  "Google Sans Code",
  "JetBrains Mono",
  "Fira Code",
  "Cascadia Code",
  "Courier New",
  "PT Mono",
  "Andale Mono",
] as const;

/** 设置节校验允许的全部字体 id（候选并集 + system）。 */
export const FONT_IDS = ["system", ...UI_FONT_CANDIDATES, ...CODE_FONT_CANDIDATES] as const;

export const SETTINGS_NAMESPACE = "dsh-codex-theme";
export const OVERRIDE_SOURCE = "dsh-codex-theme";
