/**
 * 字体偏好 → DSH 字体 token 覆盖。
 *
 * - 字体族：设置值是真实字体族名（或 `system`），仅在非 system 时覆盖
 *   `--dsw-font-family` / `--ds-font-family-code` / `--dsw-font-mono`；
 *   栈以所选字体开头，后接中文/等宽回退链。
 * - 字号：按与 DSH 原生基准的差值（ui 基准 16px、代码基准 13px）整体平移
 *   全部 `--dsw-font-*` 阶梯 token，delta 为 0 时输出即为原生值。
 */
/** 字体相关设置子集（buildTypographyOverrides 的入参）。 */
export interface FontSettings {
  uiFont: string;
  uiFontSize: number;
  codeFont: string;
  codeFontSize: number;
}

const SANS_FALLBACK = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif';

/** UI 字体栈（候选族名 → 完整 stack）。 */
const UI_FONT_STACKS: Record<string, string> = {
  "PingFang SC": '"PingFang SC", "Hiragino Sans GB", -apple-system, "Microsoft YaHei", Arial, sans-serif',
  "Hiragino Sans GB": '"Hiragino Sans GB", "PingFang SC", -apple-system, "Microsoft YaHei", Arial, sans-serif',
  "Helvetica Neue": '"Helvetica Neue", Helvetica, Arial, -apple-system, "PingFang SC", sans-serif',
  "Avenir Next": '"Avenir Next", Avenir, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
  "Gill Sans": '"Gill Sans", "Helvetica Neue", -apple-system, "PingFang SC", sans-serif',
  Futura: 'Futura, "Helvetica Neue", -apple-system, "PingFang SC", sans-serif',
  Optima: 'Optima, "Helvetica Neue", -apple-system, "PingFang SC", sans-serif',
  Baskerville: 'Baskerville, "Songti SC", "Times New Roman", serif',
  "Songti SC": '"Songti SC", STSong, Baskerville, "Times New Roman", serif',
  STHeiti: '"STHeiti", "Hiragino Sans GB", "PingFang SC", sans-serif',
  "Times New Roman": '"Times New Roman", "Songti SC", Times, serif',
};

const MONO_FALLBACK = 'Menlo, Monaco, Consolas, "Liberation Mono", monospace';

/** 代码字体栈（候选族名 → 完整 stack）。 */
const CODE_FONT_STACKS: Record<string, string> = {
  "SF Mono": `"SF Mono", ${MONO_FALLBACK}`,
  Menlo: `Menlo, Monaco, "SF Mono", Consolas, monospace`,
  Monaco: `Monaco, Menlo, "SF Mono", Consolas, monospace`,
  "Maple Mono": `"Maple Mono", "JetBrains Mono", ${MONO_FALLBACK}`,
  "0xProto Nerd Font Mono": `"0xProto Nerd Font Mono", "Symbols Nerd Font Mono", ${MONO_FALLBACK}`,
  "Google Sans Code": `"Google Sans Code", ${MONO_FALLBACK}`,
  "JetBrains Mono": `"JetBrains Mono", ${MONO_FALLBACK}`,
  "Fira Code": `"Fira Code", ${MONO_FALLBACK}`,
  "Cascadia Code": `"Cascadia Code", ${MONO_FALLBACK}`,
  "Courier New": `"Courier New", "PT Mono", monospace`,
  "PT Mono": `"PT Mono", "Courier New", monospace`,
  "Andale Mono": `"Andale Mono", ${MONO_FALLBACK}`,
};

function scaled(value: number, delta: number): number {
  return Math.max(9, value + delta);
}

/** 阶梯单条的完整取值（shorthand + 拆分 token 的值）。 */
interface FontEntry {
  shorthand: string;
  weight: number;
  fontSize: string;
  lineHeight: string;
  style: string;
}

function entry(
  size: number,
  lineHeight: number,
  delta: number,
  family: string,
  weight = 400,
  style = "normal",
): FontEntry {
  const px = `${scaled(size, delta)}px`;
  const lh = `${scaled(lineHeight, delta)}px`;
  return {
    shorthand: [style === "italic" ? "italic" : undefined, weight === 400 ? undefined : weight, `${px}/${lh}`, family]
      .filter((part) => part !== undefined)
      .join(" "),
    weight,
    fontSize: px,
    lineHeight: lh,
    style,
  };
}

/** 阶梯表：名称 → { shorthand, 拆分值 }。权重按 Codex app 观感微调（菜单/大标题 400）。 */
function ladderEntries(uiDelta: number, codeDelta: number): Record<string, FontEntry> {
  const ui = (size: number, lineHeight: number, weight = 400, style = "normal"): FontEntry =>
    entry(size, lineHeight, uiDelta, "var(--dsw-font-family)", weight, style);
  const code = (size: number, lineHeight: number): FontEntry =>
    entry(size, lineHeight, codeDelta, "var(--ds-font-family-code)");
  return {
    "--dsw-font-xl-24": ui(24, 32, 500),
    "--dsw-font-l-20": ui(20, 28, 500),
    "--dsw-font-m-18": ui(16, 28, 430),
    "--dsw-font-base-16": ui(16, 24, 430),
    "--dsw-font-base-strong-16": ui(16, 24, 500),
    "--dsw-font-s-14": ui(14, 22, 430),
    "--dsw-font-s-strong-14": ui(14, 22, 500),
    "--dsw-font-xs-13": ui(13, 20, 430),
    "--dsw-font-xs-strong-13": ui(13, 20, 500),
    "--dsw-font-xxs-12": ui(12, 18, 430),
    "--dsw-font-xxs-strong-12": ui(12, 18, 500),
    "--dsw-font-xxxs-11": ui(11, 14, 430),
    "--dsw-font-xxxs-strong-11": ui(11, 14, 500),
    "--dsw-font-markdown-h1": ui(24, 34, 500),
    "--dsw-font-markdown-h2": ui(22, 32, 500),
    "--dsw-font-markdown-h3": ui(20, 30, 500),
    "--dsw-font-markdown-h4": ui(16, 28, 500),
    "--dsw-font-markdown-base": ui(16, 28, 430),
    "--dsw-font-markdown-base-strong": ui(16, 28, 500),
    "--dsw-font-markdown-base-italic": ui(16, 28, 430, "italic"),
    "--dsw-font-markdown-base-strong-italic": ui(16, 28, 500, "italic"),
    "--dsw-font-markdown-table": ui(15, 25, 430),
    "--dsw-font-markdown-table-head": ui(15, 25, 500),
    "--dsw-font-markdown-small": ui(14, 24, 430),
    "--dsw-font-markdown-small-strong": ui(14, 24, 500),
    "--dsw-font-markdown-small-italic": ui(14, 24, 430, "italic"),
    "--dsw-font-markdown-small-strong-italic": ui(14, 24, 500, "italic"),
    "--dsw-font-markdown-code": code(14, 22),
    "--dsw-font-markdown-code-block": code(13, 22),
    "--dsw-font-markdown-code-block-small": code(12, 18),
  };
}

/** 字号阶梯 token（shorthand + 各拆分 token；delta=0 时尺寸等于 DSH 原生值）。 */
function sizeLadder(uiDelta: number, codeDelta: number): Record<string, { light: string; dark: string }> {
  const pairs: Record<string, { light: string; dark: string }> = {};
  const same = (value: string): { light: string; dark: string } => ({ light: value, dark: value });
  for (const [name, value] of Object.entries(ladderEntries(uiDelta, codeDelta))) {
    pairs[name] = same(value.shorthand);
    pairs[`${name}-font-family`] = same(value.shorthand.split(" ").pop() ?? "var(--dsw-font-family)");
    pairs[`${name}-font-weight`] = same(String(value.weight));
    pairs[`${name}-font-size`] = same(value.fontSize);
    pairs[`${name}-line-height`] = same(value.lineHeight);
    pairs[`${name}-font-style`] = same(value.style);
  }
  return pairs;
}

/**
 * 字体设置 → token 覆盖。字体族选「system」时不覆盖族 token（保持 DSH 默认），
 * 字号阶梯始终输出（delta0 即原生值）。
 */
export function buildTypographyOverrides(
  settings: FontSettings,
): Record<string, { readonly light: string; readonly dark: string }> {
  const pairs = sizeLadder(settings.uiFontSize - 16, settings.codeFontSize - 13);
  const same = (value: string): { light: string; dark: string } => ({ light: value, dark: value });
  if (settings.uiFont !== "system") {
    const stack = UI_FONT_STACKS[settings.uiFont] ?? `"${settings.uiFont}", ${SANS_FALLBACK}`;
    pairs["--dsw-font-family"] = same(stack);
  }
  if (settings.codeFont !== "system") {
    const stack = CODE_FONT_STACKS[settings.codeFont] ?? `"${settings.codeFont}", ${MONO_FALLBACK}`;
    pairs["--ds-font-family-code"] = same(stack);
    pairs["--dsw-font-mono"] = same(stack);
  }
  return pairs;
}
