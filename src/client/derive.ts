/**
 * Codex 参数 → DSH `--dsw-*` token 覆盖的运行时推导引擎。
 *
 * 输入是每模式（light/dark）一组 Codex 参数：
 * accent / surface / ink / contrast / diffAdded / diffRemoved / skill。
 * 输出是完整 token → `{ light, dark }` 覆盖层，供 `theme.overrideTokens` 使用。
 *
 * 推导规则与之前静态调色板逐 token 一致（已在真实浏览器验证过）：
 * - 中性色阶梯 = ink 按比例混 surface；
 * - `label-secondary` 精确取 contrast%（Codex 语义）；
 * - 边框/悬停 = ink 或 accent 的 rgba；
 * - 品牌/按钮/信息 = accent（hover 向 ink 压 12%，bluish 文字向 ink 压 20%/35%）；
 * - 成功/错误/技能 = diffAdded / diffRemoved / skill 及其派生；
 * - 两模式的推导参数不同（深色 ink 是浅色、surface 是深色，方向相反），
 *   统一由 MODE_PARAMS 表驱动同一个 builder。
 */

import type { ModeKnobs } from "../defaults.js";

/** 每模式不同的推导参数。 */
interface ModeParams {
  /** 提亮基准（浅色 = 白 surface，深色 = 亮 ink） */
  liftBase: "surface" | "ink";
  /** ink 混 surface 的中性阶梯比例 */
  ladder: {
    layer1: number;
    layer2: number;
    layer3: number;
    overlay: number;
    module: number;
    multiSelect: number;
    floatingFill: number;
    floatingHover: number;
    hoverSolid: number;
    ghostFill: number;
    ghostHover: number;
    ghostBorder: number;
    caption: number;
    dimmed: number;
    primaryDimmed: number;
    tooltip: number;
    toast: number | null; // null = 直接用 ink
    bubble: number;
    inputMajor: number | null; // null = surface 直出
    loginInput: number;
    menu: number;
    selector: number;
    sidebarFill: number;
    navActive: number;
    navHover: number;
    tip: number;
    codeBlock: number;
    inline: number;
    citation: number;
    segmentSelected: number | null; // null = 白
    segmentUnselected: number;
    scrollbarBg: number;
    scrollbarHover: number;
    tertiary: number;
  };
  /** 边框 ink rgba 透明度 [l1, l2, l2-thin, l3, l4] */
  borders: [number, number, number, number, number];
  skeletonAlpha: number;
  /** 交互态 rgba 透明度 */
  interactive: {
    hover: number;
    active: number;
    hoverAccent: number;
    hoverDanger: number;
  };
  /** accent 派生 */
  accent: {
    /** hover：accent 中 ink 占比 */
    hoverInk: number;
    /** label-primary-bluish：accent 中 ink 占比 */
    bluishInk: number;
    /** button-primary-dimmed：accent 混 surface 比例 */
    dimmedOnSurface: number;
    /** bubble-highlight：accent 混 surface 比例 */
    bubbleHighlight: number;
    /** nav-item-active-accent：accent 混 surface 比例 */
    navActiveAccent: number;
  };
  /** 语义色派生 */
  semantic: {
    errorSecondary: number; // diffRemoved 混 liftBase 的比例
    successSecondary: number; // diffAdded 混 liftBase 的比例
    successTertiary: number; // diffAdded 混 surface 的比例
  };
}

const LIGHT: ModeParams = {
  liftBase: "surface",
  ladder: {
    layer1: 0.03,
    layer2: 0.06,
    layer3: 0.09,
    overlay: 0.06,
    module: 0.04,
    multiSelect: 0.04,
    floatingFill: 1,
    floatingHover: 0.045,
    hoverSolid: 0.045,
    ghostFill: 0.08,
    ghostHover: 0.12,
    ghostBorder: 0.35,
    caption: 0.2,
    dimmed: 0.08,
    primaryDimmed: 0.85,
    tooltip: 0.92,
    toast: null,
    bubble: 0.03,
    inputMajor: null,
    loginInput: 0.025,
    menu: 0.09,
    selector: 0.04,
    sidebarFill: 0.03,
    navActive: 0.08,
    navHover: 0.045,
    tip: 0.04,
    codeBlock: 0.04,
    inline: 0.07,
    citation: 0.07,
    segmentSelected: null,
    segmentUnselected: 0.04,
    scrollbarBg: 0.18,
    scrollbarHover: 0.3,
    tertiary: 0.35,
  },
  borders: [0.05, 0.11, 0.11, 0.14, 0.18],
  skeletonAlpha: 0.06,
  interactive: { hover: 0.06, active: 0.1, hoverAccent: 0.12, hoverDanger: 0.06 },
  accent: {
    hoverInk: 0.12,
    bluishInk: 0.2,
    dimmedOnSurface: 0.15,
    bubbleHighlight: 0.08,
    navActiveAccent: 0.08,
  },
  semantic: {
    errorSecondary: 0.25,
    successSecondary: 0.25,
    successTertiary: 0.1,
  },
};

const DARK: ModeParams = {
  liftBase: "ink",
  ladder: {
    layer1: 0.03,
    layer2: 0.06,
    layer3: 0.09,
    overlay: 0.06,
    module: 0.04,
    multiSelect: 0.04,
    floatingFill: 0.03,
    floatingHover: 0.045,
    hoverSolid: 0.045,
    ghostFill: 0.08,
    ghostHover: 0.12,
    ghostBorder: 0.35,
    caption: 0.25,
    dimmed: 0.1,
    primaryDimmed: 0.85,
    tooltip: 0.16,
    toast: 0.16,
    bubble: 0.045,
    inputMajor: 0.045,
    loginInput: 0.025,
    menu: 0.09,
    selector: 0.04,
    sidebarFill: 0.03,
    navActive: 0.08,
    navHover: 0.045,
    tip: 0.04,
    codeBlock: 0.04,
    inline: 0.07,
    citation: 0.07,
    segmentSelected: 0.09,
    segmentUnselected: 0.04,
    scrollbarBg: 0.2,
    scrollbarHover: 0.32,
    tertiary: 0.4,
  },
  borders: [0.06, 0.12, 0.08, 0.16, 0.2],
  skeletonAlpha: 0.08,
  interactive: { hover: 0.08, active: 0.14, hoverAccent: 0.2, hoverDanger: 0.16 },
  accent: {
    hoverInk: 0.12,
    bluishInk: 0.35,
    dimmedOnSurface: 0.3,
    bubbleHighlight: 0.18,
    navActiveAccent: 0.16,
  },
  semantic: {
    errorSecondary: 0.75,
    successSecondary: 0.65,
    successTertiary: 0.25,
  },
};

const MODE_PARAMS = { light: LIGHT, dark: DARK } as const;

/** `mix(a, b, t)`：a 的 t 比例混入 b，输出大写 #RRGGBB。 */
export function mixHex(a: string, b: string, t: number): string {
  const channels = (value: string): number[] =>
    [1, 3, 5].map((start) => Number.parseInt(value.slice(start, start + 2), 16));
  const ca = channels(a);
  const cb = channels(b);
  return `#${ca
    .map((channel, index) =>
      Math.round(channel * t + cb[index] * (1 - t)).toString(16).padStart(2, "0"),
    )
    .join("")}`.toUpperCase();
}

/** `rgba(hex, alpha)`。 */
function rgba(hex: string, alpha: number): string {
  const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
  return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
}

/** 按 MODE_PARAMS 把一个模式的 Codex 参数推导为完整 token 表。 */
function buildModePalette(k: ModeKnobs, mode: "light" | "dark"): Record<string, string> {
  const p = MODE_PARAMS[mode];
  const L = p.ladder;
  /** ink 按 t 混 surface（深色模式 surface 深、ink 亮，方向自然相反） */
  const mix = (t: number): string => mixHex(k.ink, k.surface, t);
  const liftBase = p.liftBase === "surface" ? k.surface : k.ink;

  return {
    // ── Surfaces ────────────────────────────────────────────────────────
    "--dsw-alias-bg-base": k.surface,
    "--dsw-alias-bg-layer-1": mix(L.layer1),
    "--dsw-alias-bg-layer-2": mix(L.layer2),
    "--dsw-alias-bg-layer-3": mix(L.layer3),
    "--dsw-alias-bg-overlay": mix(L.overlay),
    "--dsw-alias-bg-module-platform": mix(L.module),
    "--dsw-alias-bg-multi-select": mix(L.multiSelect),
    "--dsw-alias-bg-skeleton": rgba(k.ink, p.skeletonAlpha),

    // ── Borders ─────────────────────────────────────────────────────────
    "--dsw-alias-border-l1": rgba(k.ink, p.borders[0]),
    "--dsw-alias-border-l2": rgba(k.ink, p.borders[1]),
    "--dsw-alias-border-l2-darkmode-thin": rgba(k.ink, p.borders[2]),
    "--dsw-alias-border-l3": rgba(k.ink, p.borders[3]),
    "--dsw-alias-border-l4": rgba(k.ink, p.borders[4]),

    // ── Brand（accent）──────────────────────────────────────────────────
    "--dsw-alias-brand-primary": k.accent,
    "--dsw-alias-brand-primary-invert": mode === "light" ? "#0F1115" : "#F9FAFB",
    "--dsw-alias-brand-primary-new-colorprimary-new-color": k.accent,
    "--dsw-alias-brand-text": k.accent,

    // ── Buttons ─────────────────────────────────────────────────────────
    "--dsw-alias-button-contrast-fill": k.ink,
    "--dsw-alias-button-elevated-fill": mode === "light" ? k.surface : mix(L.layer2),
    "--dsw-alias-button-floating-fill": mode === "light" ? k.surface : mix(L.floatingFill),
    "--dsw-alias-button-floating-hover": mix(L.floatingHover),
    "--dsw-alias-button-ghost-active-border": mix(L.ghostBorder),
    "--dsw-alias-button-ghost-active-fill": mix(L.ghostFill),
    "--dsw-alias-button-ghost-active-hover": mix(L.ghostHover),
    "--dsw-alias-button-info-fill": k.accent,
    "--dsw-alias-button-info-hover": mixHex(k.accent, k.ink, 1 - p.accent.hoverInk),
    "--dsw-alias-button-primary-dimmed": mixHex(k.accent, k.surface, p.accent.dimmedOnSurface),
    "--dsw-alias-button-primary-fill": k.accent,
    "--dsw-alias-button-primary-hover": mixHex(k.accent, k.ink, 1 - p.accent.hoverInk),

    // ── Interactive states ──────────────────────────────────────────────
    "--dsw-alias-interactive-bg-active": rgba(k.ink, p.interactive.active),
    "--dsw-alias-interactive-bg-hover": rgba(k.ink, p.interactive.hover),
    "--dsw-alias-interactive-bg-hover-accent": rgba(k.accent, p.interactive.hoverAccent),
    "--dsw-alias-interactive-bg-hover-danger": rgba(k.diffRemoved, p.interactive.hoverDanger),
    "--dsw-alias-interactive-bg-hover-solid": mix(L.hoverSolid),

    // ── Text ────────────────────────────────────────────────────────────
    "--dsw-alias-label-caption": mix(L.caption),
    "--dsw-alias-label-dimmed": mix(L.dimmed),
    "--dsw-alias-label-primary": k.ink,
    "--dsw-alias-label-primary-bluish": mixHex(k.accent, k.ink, 1 - p.accent.bluishInk),
    "--dsw-alias-label-primary-dimmed": mix(L.primaryDimmed),
    "--dsw-alias-label-primary-foreground": "#ffffff",
    "--dsw-alias-label-primary-inverted": mode === "light" ? "#FFFFFF" : "#353638",
    "--dsw-alias-label-secondary": mix(clamp(k.contrast, 0, 100) / 100), // ← Codex contrast 语义
    "--dsw-alias-label-tertiary": mix(L.tertiary),

    // ── Markdown / code ─────────────────────────────────────────────────
    "--dsw-alias-markdown-citation": mix(L.citation),
    "--dsw-alias-markdown-code-block": mix(L.codeBlock),
    "--dsw-alias-markdown-code-block-banner": mix(L.codeBlock),
    "--dsw-alias-markdown-code-segment-selected": L.segmentSelected === null ? "#ffffff" : mix(L.segmentSelected),
    "--dsw-alias-markdown-code-segment-unselected": mix(L.segmentUnselected),
    "--dsw-alias-markdown-inline-code": mix(L.inline),
    "--dsw-alias-markdown-placeholder": mix(L.codeBlock),
    "--dsw-alias-markdown-tag": mix(L.codeBlock),

    // ── Scrollbars ──────────────────────────────────────────────────────
    "--dsw-alias-scrollbar-bg-l1": mix(L.scrollbarBg),
    "--dsw-alias-scrollbar-bg-l2": mix(L.scrollbarBg),
    "--dsw-alias-scrollbar-hover-l1": mix(L.scrollbarHover),
    "--dsw-alias-scrollbar-hover-l2": mix(L.scrollbarHover),

    // ── States ──────────────────────────────────────────────────────────
    // DSH 的 business 槽位承载文件引用(textRef)/输入光标/工作区强调——Codex app
    // 里这些是主题强调色（蓝），故从 accent 派生；skill 参数在 DSH 无独立槽位，
    // 保留在预设数据中但不再参与推导。
    "--dsw-alias-state-business-primary": mixHex(k.accent, k.ink, mode === "light" ? 0.8 : 0.65),
    "--dsw-alias-state-business-tertiary": mixHex(k.accent, k.surface, mode === "light" ? 0.08 : 0.18),
    "--dsw-alias-state-error-primary": k.diffRemoved,
    "--dsw-alias-state-error-secondary": mixHex(k.diffRemoved, liftBase, p.semantic.errorSecondary),
    "--dsw-alias-state-success-primary": k.diffAdded,
    "--dsw-alias-state-success-secondary": mixHex(k.diffAdded, liftBase, p.semantic.successSecondary),
    "--dsw-alias-state-success-tertiary": mixHex(k.diffAdded, k.surface, p.semantic.successTertiary),

    // ── Overlays ────────────────────────────────────────────────────────
    "--dsw-alias-toast-bg": L.toast === null ? k.ink : mix(L.toast),
    "--dsw-alias-tooltip-bg": mix(L.tooltip),

    // ── Shell-specific ──────────────────────────────────────────────────
    "--dsw-specific-bubble": mix(L.bubble),
    "--dsw-specific-bubble-highlight": mixHex(k.accent, k.surface, p.accent.bubbleHighlight),
    "--dsw-specific-input-major": L.inputMajor === null ? k.surface : mix(L.inputMajor),
    "--dsw-specific-login-input": mix(L.loginInput),
    "--dsw-specific-menu": mix(L.menu),
    "--dsw-specific-selector": mix(L.selector),
    "--dsw-specific-sidebar-fill": k.sidebar !== "" ? k.sidebar : mix(L.sidebarFill),
    "--dsw-specific-sidebar-nav-item-active": mix(L.navActive),
    "--dsw-specific-sidebar-nav-item-active-accent": mixHex(k.accent, k.surface, p.accent.navActiveAccent),
    "--dsw-specific-sidebar-nav-item-hover": mix(L.navHover),
    "--dsw-specific-tip": mix(L.tip),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 把浅/深两组参数推导为 `theme.overrideTokens` 所需的 `{ light, dark }` 覆盖层。 */
export function buildTokenOverrides(
  lightKnobs: ModeKnobs,
  darkKnobs: ModeKnobs,
): Readonly<Record<string, { readonly light: string; readonly dark: string }>> {
  const light = buildModePalette(lightKnobs, "light");
  const dark = buildModePalette(darkKnobs, "dark");
  const names = new Set([...Object.keys(light), ...Object.keys(dark)]);
  const overrides: Record<string, { light: string; dark: string }> = {};
  for (const name of names) {
    overrides[name] = { light: light[name], dark: dark[name] };
  }
  return overrides;
}
