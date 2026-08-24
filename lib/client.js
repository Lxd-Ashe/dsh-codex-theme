window.__ModuleLoader__.load({ id: 'dsh-codex-theme', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// src/defaults.ts
var DEFAULT_LIGHT_KNOBS = Object.freeze({
  accent: "#339CFF",
  surface: "#FFFFFF",
  ink: "#1A1C1F",
  contrast: 45,
  diffAdded: "#00A240",
  diffRemoved: "#BA2623",
  skill: "#924FF7",
  sidebar: ""
});
var DEFAULT_DARK_KNOBS = Object.freeze({
  accent: "#0169CC",
  surface: "#111111",
  ink: "#FCFCFC",
  contrast: 60,
  diffAdded: "#00A240",
  diffRemoved: "#E02E2A",
  skill: "#B06DFF",
  sidebar: ""
});
var DEFAULT_SETTINGS = Object.freeze({
  lightPreset: 0,
  darkPreset: 0,
  uiFont: "system",
  uiFontSize: 16,
  workspaceFontSize: 14,
  codeFont: "system",
  codeFontSize: 13
});
var UI_FONT_CANDIDATES = [
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
  "Times New Roman"
];
var CODE_FONT_CANDIDATES = [
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
  "Andale Mono"
];
var FONT_IDS = ["system", ...UI_FONT_CANDIDATES, ...CODE_FONT_CANDIDATES];
var SETTINGS_NAMESPACE = "dsh-codex-theme";
var OVERRIDE_SOURCE = "dsh-codex-theme";

// src/client/derive.ts
var LIGHT = {
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
    tertiary: 0.35
  },
  borders: [0.05, 0.11, 0.11, 0.14, 0.18],
  skeletonAlpha: 0.06,
  interactive: { hover: 0.06, active: 0.1, hoverAccent: 0.12, hoverDanger: 0.06 },
  accent: {
    hoverInk: 0.12,
    bluishInk: 0.2,
    dimmedOnSurface: 0.15,
    bubbleHighlight: 0.08,
    navActiveAccent: 0.08
  },
  semantic: {
    errorSecondary: 0.25,
    successSecondary: 0.25,
    successTertiary: 0.1
  }
};
var DARK = {
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
    tertiary: 0.4
  },
  borders: [0.06, 0.12, 0.08, 0.16, 0.2],
  skeletonAlpha: 0.08,
  interactive: { hover: 0.08, active: 0.14, hoverAccent: 0.2, hoverDanger: 0.16 },
  accent: {
    hoverInk: 0.12,
    bluishInk: 0.35,
    dimmedOnSurface: 0.3,
    bubbleHighlight: 0.18,
    navActiveAccent: 0.16
  },
  semantic: {
    errorSecondary: 0.75,
    successSecondary: 0.65,
    successTertiary: 0.25
  }
};
var MODE_PARAMS = { light: LIGHT, dark: DARK };
function mixHex(a, b, t) {
  const channels = (value) => [1, 3, 5].map((start) => Number.parseInt(value.slice(start, start + 2), 16));
  const ca = channels(a);
  const cb = channels(b);
  return `#${ca.map(
    (channel, index) => Math.round(channel * t + cb[index] * (1 - t)).toString(16).padStart(2, "0")
  ).join("")}`.toUpperCase();
}
function rgba(hex, alpha) {
  const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
  return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
}
function buildModePalette(k, mode) {
  const p = MODE_PARAMS[mode];
  const L = p.ladder;
  const mix = (t) => mixHex(k.ink, k.surface, t);
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
    "--dsw-alias-label-secondary": mix(clamp(k.contrast, 0, 100) / 100),
    // ← Codex contrast 语义
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
    "--dsw-specific-tip": mix(L.tip)
  };
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function buildTokenOverrides(lightKnobs, darkKnobs) {
  const light = buildModePalette(lightKnobs, "light");
  const dark = buildModePalette(darkKnobs, "dark");
  const names = /* @__PURE__ */ new Set([...Object.keys(light), ...Object.keys(dark)]);
  const overrides = {};
  for (const name2 of names) {
    overrides[name2] = { light: light[name2], dark: dark[name2] };
  }
  return overrides;
}

// src/client/fonts.ts
var SANS_FALLBACK = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif';
var UI_FONT_STACKS = {
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
  "Times New Roman": '"Times New Roman", "Songti SC", Times, serif'
};
var MONO_FALLBACK = 'Menlo, Monaco, Consolas, "Liberation Mono", monospace';
var CODE_FONT_STACKS = {
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
  "Andale Mono": `"Andale Mono", ${MONO_FALLBACK}`
};
function scaled(value, delta) {
  return Math.max(9, value + delta);
}
function entry(size, lineHeight, delta, family, weight = 400, style = "normal") {
  const px = `${scaled(size, delta)}px`;
  const lh = `${scaled(lineHeight, delta)}px`;
  return {
    shorthand: [style === "italic" ? "italic" : void 0, weight === 400 ? void 0 : weight, `${px}/${lh}`, family].filter((part) => part !== void 0).join(" "),
    weight,
    fontSize: px,
    lineHeight: lh,
    style
  };
}
function ladderEntries(uiDelta, codeDelta) {
  const ui = (size, lineHeight, weight = 400, style = "normal") => entry(size, lineHeight, uiDelta, "var(--dsw-font-family)", weight, style);
  const code = (size, lineHeight) => entry(size, lineHeight, codeDelta, "var(--ds-font-family-code)");
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
    "--dsw-font-markdown-code-block-small": code(12, 18)
  };
}
function sizeLadder(uiDelta, codeDelta) {
  const pairs = {};
  const same = (value) => ({ light: value, dark: value });
  for (const [name2, value] of Object.entries(ladderEntries(uiDelta, codeDelta))) {
    pairs[name2] = same(value.shorthand);
    pairs[`${name2}-font-family`] = same(value.shorthand.split(" ").pop() ?? "var(--dsw-font-family)");
    pairs[`${name2}-font-weight`] = same(String(value.weight));
    pairs[`${name2}-font-size`] = same(value.fontSize);
    pairs[`${name2}-line-height`] = same(value.lineHeight);
    pairs[`${name2}-font-style`] = same(value.style);
  }
  return pairs;
}
function buildTypographyOverrides(settings) {
  const pairs = sizeLadder(settings.uiFontSize - 16, settings.codeFontSize - 13);
  const same = (value) => ({ light: value, dark: value });
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

// src/client/presets.ts
var LIGHT_PRESETS = [
  { name: "Codex \u9ED8\u8BA4", knobs: { accent: "#339CFF", surface: "#FFFFFF", ink: "#1A1C1F", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "" } },
  { name: "Absolutely Light", knobs: { accent: "#CC7D5E", surface: "#F9F9F7", ink: "#2D2D2B", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F4F4F2" } },
  { name: "Catppuccin Latte", knobs: { accent: "#8839EF", surface: "#EFF1F5", ink: "#4C4F69", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#E6E9EF" } },
  { name: "Codex Light", knobs: { accent: "#0169CC", surface: "#FFFFFF", ink: "#0D0D0D", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FCFCFC" } },
  { name: "Everforest Light", knobs: { accent: "#8DA101", surface: "#FDF6E3", ink: "#5C6A72", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FDF6E3" } },
  { name: "GitHub Light", knobs: { accent: "#0366D6", surface: "#FFFFFF", ink: "#24292E", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F6F8FA" } },
  { name: "GitHub Light Default", knobs: { accent: "#0969DA", surface: "#FFFFFF", ink: "#1F2328", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F6F8FA" } },
  { name: "GitHub Light High Contrast", knobs: { accent: "#055D20", surface: "#FFFFFF", ink: "#0E1116", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FFFFFF" } },
  { name: "Gruvbox Light Hard", knobs: { accent: "#076678", surface: "#F9F5D7", ink: "#3C3836", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F9F5D7" } },
  { name: "Gruvbox Light Medium", knobs: { accent: "#076678", surface: "#FBF1C7", ink: "#3C3836", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FBF1C7" } },
  { name: "Gruvbox Light Soft", knobs: { accent: "#076678", surface: "#F2E5BC", ink: "#3C3836", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F2E5BC" } },
  { name: "Kanagawa Lotus", knobs: { accent: "#5A7785", surface: "#F2ECBC", ink: "#545464", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F2ECBC" } },
  { name: "Light Plus", knobs: { accent: "#007ACC", surface: "#FFFFFF", ink: "#000000", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "" } },
  { name: "Linear Light", knobs: { accent: "#5E6AD2", surface: "#F7F8FA", ink: "#2A3140", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F2F4F8" } },
  { name: "Material Theme Lighter", knobs: { accent: "#339CFF", surface: "#FAFAFA", ink: "#90A4AE", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FAFAFA" } },
  { name: "Min Light", knobs: { accent: "#616161", surface: "#FFFFFF", ink: "#212121", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F6F6F6" } },
  { name: "Notion Light", knobs: { accent: "#3183D8", surface: "#FFFFFF", ink: "#37352F", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F7F6F3" } },
  { name: "One Light", knobs: { accent: "#5871EF", surface: "#FAFAFA", ink: "#383A42", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#EAEAEB" } },
  { name: "Proof Light", knobs: { accent: "#3D755D", surface: "#F5F3ED", ink: "#2F312D", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#EFEDE6" } },
  { name: "Raycast Light", knobs: { accent: "#138AF2", surface: "#FFFFFF", ink: "#000000", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FCFCFC" } },
  { name: "Ros\xE9 Pine Dawn", knobs: { accent: "#6E6A86", surface: "#FAF4ED", ink: "#575279", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FAF4ED" } },
  { name: "Slack Ochin", knobs: { accent: "#161F26", surface: "#FFFFFF", ink: "#616161", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#2D3E4C" } },
  { name: "Snazzy Light", knobs: { accent: "#2DAE58", surface: "#FAFBFC", ink: "#565869", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#F3F4F5" } },
  { name: "Solarized Light", knobs: { accent: "#B58900", surface: "#FDF6E3", ink: "#657B83", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#EEE8D5" } },
  { name: "Vercel Light", knobs: { accent: "#006AFF", surface: "#FFFFFF", ink: "#171717", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FFFFFF" } },
  { name: "Vitesse Light", knobs: { accent: "#000000", surface: "#FFFFFF", ink: "#393A34", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FFFFFF" } },
  { name: "Xcode Light", knobs: { accent: "#0E0EFF", surface: "#FFFFFF", ink: "#000000", contrast: 45, diffAdded: "#00A240", diffRemoved: "#BA2623", skill: "#924FF7", sidebar: "#FFFFFF" } }
];
var DARK_PRESETS = [
  { name: "Codex \u9ED8\u8BA4", knobs: { accent: "#0169CC", surface: "#111111", ink: "#FCFCFC", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "" } },
  { name: "Absolutely Dark", knobs: { accent: "#CC7D5E", surface: "#2D2D2B", ink: "#F9F9F7", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#373735" } },
  { name: "Andromeeda", knobs: { accent: "#00E8C5", surface: "#23262E", ink: "#D5CED9", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#23262E" } },
  { name: "Aurora X", knobs: { accent: "#86A5FF", surface: "#07090F", ink: "#576DAF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#07090F" } },
  { name: "Ayu Dark", knobs: { accent: "#E6B450", surface: "#0B0E14", ink: "#BFBDB6", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#0B0E14" } },
  { name: "Catppuccin Frapp\xE9", knobs: { accent: "#CA9EE6", surface: "#303446", ink: "#C6D0F5", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#292C3C" } },
  { name: "Catppuccin Macchiato", knobs: { accent: "#C6A0F6", surface: "#24273A", ink: "#CAD3F5", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1E2030" } },
  { name: "Catppuccin Mocha", knobs: { accent: "#CBA6F7", surface: "#1E1E2E", ink: "#CDD6F4", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#181825" } },
  { name: "Codex Dark", knobs: { accent: "#0169CC", surface: "#111111", ink: "#FCFCFC", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#131313" } },
  { name: "Dark Plus", knobs: { accent: "#007ACC", surface: "#1E1E1E", ink: "#D4D4D4", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "" } },
  { name: "Dracula Theme", knobs: { accent: "#FF79C6", surface: "#282A36", ink: "#F8F8F2", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#21222C" } },
  { name: "Dracula Theme Soft", knobs: { accent: "#F286C4", surface: "#282A36", ink: "#F6F6F4", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#262626" } },
  { name: "Everforest Dark", knobs: { accent: "#A7C080", surface: "#2D353B", ink: "#D3C6AA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#2D353B" } },
  { name: "GitHub Dark", knobs: { accent: "#79B8FF", surface: "#24292E", ink: "#E1E4E8", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1F2428" } },
  { name: "GitHub Dark Default", knobs: { accent: "#2F81F7", surface: "#0D1117", ink: "#E6EDF3", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#010409" } },
  { name: "GitHub Dark Dimmed", knobs: { accent: "#539BF5", surface: "#22272E", ink: "#ADBAC7", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1C2128" } },
  { name: "GitHub Dark High Contrast", knobs: { accent: "#71B7FF", surface: "#0A0C10", ink: "#F0F3F6", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#010409" } },
  { name: "Gruvbox Dark Hard", knobs: { accent: "#83A598", surface: "#1D2021", ink: "#EBDBB2", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1D2021" } },
  { name: "Gruvbox Dark Medium", knobs: { accent: "#83A598", surface: "#282828", ink: "#EBDBB2", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#282828" } },
  { name: "Gruvbox Dark Soft", knobs: { accent: "#83A598", surface: "#32302F", ink: "#EBDBB2", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#32302F" } },
  { name: "Houston", knobs: { accent: "#4BF3C8", surface: "#17191E", ink: "#EEF0F9", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#23262D" } },
  { name: "Kanagawa Dragon", knobs: { accent: "#6A9589", surface: "#181616", ink: "#C5C9C5", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#181616" } },
  { name: "Kanagawa Wave", knobs: { accent: "#6A9589", surface: "#1F1F28", ink: "#DCD7BA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1F1F28" } },
  { name: "LaserWave", knobs: { accent: "#EB64B9", surface: "#27212E", ink: "#FFFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#27212E" } },
  { name: "Linear Dark", knobs: { accent: "#5E6AD2", surface: "#17181D", ink: "#E6E9EF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#080A0F" } },
  { name: "Lobster Dark", knobs: { accent: "#FF5C5C", surface: "#111827", ink: "#E4E4E7", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#111827" } },
  { name: "Material Theme", knobs: { accent: "#FFFFFF", surface: "#263238", ink: "#EEFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#263238" } },
  { name: "Material Theme Darker", knobs: { accent: "#FFFFFF", surface: "#212121", ink: "#EEFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#212121" } },
  { name: "Material Theme Ocean", knobs: { accent: "#FFFFFF", surface: "#0F111A", ink: "#BABED8", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#0F111A" } },
  { name: "Material Theme Palenight", knobs: { accent: "#FFFFFF", surface: "#292D3E", ink: "#BABED8", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#292D3E" } },
  { name: "Matrix Dark", knobs: { accent: "#1EFF5A", surface: "#040805", ink: "#B8FFCA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#020402" } },
  { name: "Min Dark", knobs: { accent: "#0169CC", surface: "#1F1F1F", ink: "#888888", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1A1A1A" } },
  { name: "Monokai", knobs: { accent: "#99947C", surface: "#272822", ink: "#F8F8F2", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1E1F1C" } },
  { name: "Night Owl", knobs: { accent: "#7E57C2", surface: "#011627", ink: "#D6DEEB", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#011627" } },
  { name: "Nord", knobs: { accent: "#88C0D0", surface: "#2E3440", ink: "#D8DEE9", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#2E3440" } },
  { name: "Notion Dark", knobs: { accent: "#3183D8", surface: "#191919", ink: "#D9D9D8", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#151515" } },
  { name: "One Dark Pro", knobs: { accent: "#61AFEF", surface: "#282C34", ink: "#ABB2BF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#21252B" } },
  { name: "Oscurange", knobs: { accent: "#0169CC", surface: "#0B0B0F", ink: "#E6E6E6", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "" } },
  { name: "Plastic", knobs: { accent: "#E06C75", surface: "#21252B", ink: "#A9B2C3", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#181A1F" } },
  { name: "Poimandres", knobs: { accent: "#ADD7FF", surface: "#1B1E28", ink: "#A6ACCD", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1B1E28" } },
  { name: "Raycast Dark", knobs: { accent: "#4FA3F8", surface: "#141414", ink: "#FFFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#101010" } },
  { name: "Red", knobs: { accent: "#FF6666", surface: "#390000", ink: "#F8F8F8", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#330000" } },
  { name: "Ros\xE9 Pine", knobs: { accent: "#EBBCBA", surface: "#191724", ink: "#E0DEF4", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#191724" } },
  { name: "Ros\xE9 Pine Moon", knobs: { accent: "#C4A7E7", surface: "#232136", ink: "#E0DEF4", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#232136" } },
  { name: "Sentry Dark", knobs: { accent: "#7055F6", surface: "#2D2935", ink: "#E6DFF9", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#26222D" } },
  { name: "Slack Dark", knobs: { accent: "#1D978D", surface: "#222222", ink: "#E6E6E6", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#222222" } },
  { name: "Solarized Dark", knobs: { accent: "#2AA198", surface: "#002B36", ink: "#839496", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#00212B" } },
  { name: "Synthwave '84", knobs: { accent: "#F97E72", surface: "#262335", ink: "#FFFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#241B2F" } },
  { name: "Temple Dark", knobs: { accent: "#E4F222", surface: "#02120C", ink: "#C7E6DA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1D2D0F" } },
  { name: "Tokyo Night", knobs: { accent: "#6183BB", surface: "#1A1B26", ink: "#A9B1D6", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#16161E" } },
  { name: "Vercel Dark", knobs: { accent: "#006EFE", surface: "#000000", ink: "#EDEDED", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#000000" } },
  { name: "Vesper", knobs: { accent: "#FFC799", surface: "#101010", ink: "#FCFCFC", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#101010" } },
  { name: "Vitesse Black", knobs: { accent: "#BFBAAA", surface: "#111111", ink: "#DBD7CA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "" } },
  { name: "Vitesse Dark", knobs: { accent: "#BFBAAA", surface: "#121212", ink: "#DBD7CA", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#121212" } },
  { name: "Xcode Dark", knobs: { accent: "#5482FF", surface: "#1F1F24", ink: "#FFFFFF", contrast: 60, diffAdded: "#00A240", diffRemoved: "#E02E2A", skill: "#B06DFF", sidebar: "#1F1F24" } }
];

// src/client/settings-model.ts
function clampInt(value, min, max, fallback) {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max ? value : fallback;
}
function sanitizeFontId(value, fallback) {
  return typeof value === "string" && FONT_IDS.includes(value) ? value : fallback;
}
function sanitizeSettings(section) {
  const record = section !== null && typeof section === "object" ? section : {};
  return {
    lightPreset: clampInt(record.lightPreset, 0, LIGHT_PRESETS.length - 1, DEFAULT_SETTINGS.lightPreset),
    darkPreset: clampInt(record.darkPreset, 0, DARK_PRESETS.length - 1, DEFAULT_SETTINGS.darkPreset),
    uiFont: sanitizeFontId(record.uiFont, DEFAULT_SETTINGS.uiFont),
    uiFontSize: clampInt(record.uiFontSize, 9, 32, DEFAULT_SETTINGS.uiFontSize),
    workspaceFontSize: clampInt(record.workspaceFontSize, 9, 32, DEFAULT_SETTINGS.workspaceFontSize),
    codeFont: sanitizeFontId(record.codeFont, DEFAULT_SETTINGS.codeFont),
    codeFontSize: clampInt(record.codeFontSize, 9, 32, DEFAULT_SETTINGS.codeFontSize)
  };
}

// src/client/scale.ts
var RULES = [
  { cls: ".hHd-Xa_root", size: 14 },
  { cls: ".hHd-Xa_newSessionLabel", size: 14, lh: 22 },
  { cls: ".hHd-Xa_newSession", size: 14, lh: 22 },
  { cls: ".UQsH_q_triggerLabel", size: 14 },
  { cls: ".qDHVXG_sectionLabel", size: 14 },
  { cls: ".qDHVXG_empty", size: 13 },
  { cls: ".qDHVXG_searchInput", size: 13, lh: 18 },
  { cls: ".qDHVXG_searchWarning", size: 12, lh: 18 },
  { cls: ".qDHVXG_renameInput", size: 14, lh: 22 },
  { cls: ".qDHVXG_renameError", size: 12, lh: 18 },
  { cls: ".qDHVXG_deleteStatus", size: 12, lh: 18 },
  { cls: ".qDHVXG_sessionOverflowButton", size: 12 },
  { cls: ".YDXeBa_title", size: 14, lh: 20 },
  { cls: ".YDXeBa_searchResultTitle", size: 14, lh: 20 },
  { cls: ".YDXeBa_searchResultSnippet", size: 12, lh: 17 },
  { cls: ".YDXeBa_renameInput", size: 14, lh: 20 },
  { cls: ".YDXeBa_meta", size: 12, lh: 20 },
  { cls: ".YDXeBa_time", size: 12, lh: 20 },
  { cls: ".YDXeBa_hoverTitle", size: 14, lh: 20 },
  { cls: ".YDXeBa_hoverPath", size: 12, lh: 16 },
  { cls: ".YDXeBa_hoverTime", size: 12, lh: 16 },
  { cls: ".YDXeBa_hoverStatus", size: 12, lh: 20 }
];
var SCALE_CSS_ID = "dsh-codex-theme/scale";
function buildScaleCss(uiDelta, wsDelta) {
  const lines = [];
  for (const rule of RULES) {
    const declarations = [
      `font-size:calc(${rule.size}px + ${wsDelta}px)!important`,
      // 字重跟随正文 token（当前 430），与全局字重规格自动对齐
      "font-weight:var(--dsw-font-s-14-font-weight)!important"
    ];
    if (rule.lh !== void 0) declarations.push(`line-height:calc(${rule.lh}px + ${wsDelta}px)!important`);
    lines.push(`[data-slot="sidebar"] ${rule.cls}{${declarations.join(";")}}`);
  }
  lines.push(
    `[data-slot="conversation.composer"] .uV2eYG_grow,[data-slot="conversation.composer.bar"] .uV2eYG_grow{font-size:var(--dsw-font-base-16-font-size)!important;font-weight:var(--dsw-font-base-16-font-weight)!important}`
  );
  lines.push(
    `[data-slot="conversation.composer"] .uV2eYG_input,[data-slot="conversation.composer.bar"] .uV2eYG_input{font-size:var(--dsw-font-base-16-font-size)!important;font-weight:var(--dsw-font-base-16-font-weight)!important}`
  );
  lines.push(
    `[data-slot="conversation.session"] .Sxvs8a_root,[data-slot="conversation.session"] .gdEzaW_bubble{font-size:var(--dsw-font-markdown-base-font-size)!important;font-weight:var(--dsw-font-markdown-base-font-weight)!important}`
  );
  return lines.join("\n");
}
function installScaleStyles(uiDelta, wsDelta) {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(`style[data-plugin-css="${SCALE_CSS_ID}"]`);
  const css = buildScaleCss(uiDelta, wsDelta);
  if (existing !== null) {
    existing.textContent = css;
    return;
  }
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-codex-theme";
  tag.dataset.pluginCss = SCALE_CSS_ID;
  tag.textContent = css;
  document.head.appendChild(tag);
}
function removeScaleStyles() {
  if (typeof document === "undefined") return;
  document.querySelector(`style[data-plugin-css="${SCALE_CSS_ID}"]`)?.remove();
}

// src/client/store.ts
var import_client = require("@deepseek-ai/dsh-client-runtime/client");
function createPanelStore(initial = DEFAULT_SETTINGS) {
  return (0, import_client.defineStore)({
    init: () => ({
      settings: { ...initial },
      scheme: "light",
      preference: "system"
    }),
    actions: {
      syncSettings: (draft, settings) => {
        draft.settings = { ...settings };
      },
      syncTheme: (draft, scheme, preference) => {
        draft.scheme = scheme;
        draft.preference = preference;
      }
    }
  });
}

// src/client/ThemePanel.tsx
var import_react = require("react");

// src/client/panel.css
var panel_default = "/* Codex \u4E3B\u9898\u5916\u89C2\u9762\u677F\u6837\u5F0F\uFF1A\u4E3B\u9898\u9009\u62E9 + \u5B57\u4F53\u81EA\u5B9A\u4E49\uFF0C\n   \u5168\u90E8\u6D88\u8D39 DSH --dsw-* token\uFF0C\u968F\u4E3B\u9898\u81EA\u9002\u5E94\u3002 */\n.codex-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  width: 100%;\n  max-width: 640px;\n  padding-bottom: 8px;\n  color: var(--dsw-alias-label-primary);\n  font-family: var(--dsw-font-family);\n}\n\n.codex-panel button,\n.codex-panel input,\n.codex-panel select {\n  font: inherit;\n}\n\n/* \u2500\u2500 \u5934\u90E8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.codex-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.codex-header h2,\n.codex-subheading h3 {\n  margin: 0;\n  font-weight: 500;\n}\n\n.codex-header h2 {\n  font-size: 16px;\n  line-height: 24px;\n}\n\n.codex-header p {\n  margin: 3px 0 0;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.codex-subheading h3 {\n  font-size: 13px;\n  line-height: 20px;\n  color: var(--dsw-alias-label-secondary);\n  margin-bottom: 2px;\n}\n\n.codex-reset {\n  min-height: 32px;\n  padding: 4px 12px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  color: var(--dsw-alias-label-secondary);\n  background: transparent;\n  cursor: pointer;\n}\n\n.codex-reset:hover {\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n/* \u2500\u2500 \u5361\u7247\u4E0E\u884C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.codex-card {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l1);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-1);\n  padding: 4px 0;\n}\n\n.codex-row {\n  display: grid;\n  grid-template-columns: minmax(6rem, 1fr) minmax(11rem, 16rem);\n  align-items: center;\n  min-height: 50px;\n  gap: 12px;\n  padding: 7px 14px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n}\n\n.codex-row:last-child {\n  border-bottom: 0;\n}\n\n.codex-row > label {\n  font-size: 14px;\n  font-weight: 430;\n}\n\n/* \u2500\u2500 \u4E3B\u9898\u9009\u62E9\uFF1A\u4E0B\u62C9 + 6 \u6BB5\u8272\u5E26 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.codex-theme-control {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 110px;\n  align-items: center;\n  gap: 8px;\n}\n\n.codex-theme-strip {\n  display: grid;\n  height: 26px;\n  grid-template-columns: repeat(6, 1fr);\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-base);\n}\n\n.codex-theme-strip i {\n  display: block;\n  min-width: 0;\n}\n\n/* \u2500\u2500 \u5916\u89C2\u4E09\u9009\u4E00 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.codex-segment {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 4px;\n  padding: 3px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-base);\n}\n\n.codex-segment button {\n  min-height: 28px;\n  padding: 3px 8px;\n  border: 0;\n  border-radius: 7px;\n  color: var(--dsw-alias-label-secondary);\n  background: transparent;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.codex-segment button:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n.codex-segment button.is-selected {\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-layer-2);\n  box-shadow: 0 1px 2px rgb(0 0 0 / 12%);\n  font-weight: 500;\n}\n\n/* \u2500\u2500 \u901A\u7528\u63A7\u4EF6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.codex-panel select,\n.codex-number-control input {\n  width: 100%;\n  min-width: 0;\n  height: 34px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-base);\n}\n\n.codex-panel select {\n  padding: 4px 28px 4px 10px;\n  cursor: pointer;\n}\n\n.codex-number-control {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 8px;\n}\n\n.codex-number-control input {\n  padding: 5px 9px;\n  font-variant-numeric: tabular-nums;\n}\n\n.codex-number-control span {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 13px;\n}\n\n.codex-panel input:focus-visible,\n.codex-panel select:focus-visible,\n.codex-reset:focus-visible,\n.codex-segment button:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 1px;\n}\n\n.codex-hint {\n  margin: -4px 2px 0;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n@media (max-width: 620px) {\n  .codex-row {\n    grid-template-columns: 1fr;\n  }\n}\n";

// src/client/ThemePanel.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PANEL_CSS_ID = "dsh-codex-theme/panel";
var FONTS_ROUTE = "/api/dsh-codex-theme/fonts";
function installPanelStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`style[data-plugin-css="${PANEL_CSS_ID}"]`) !== null) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-codex-theme";
  tag.dataset.pluginCss = PANEL_CSS_ID;
  tag.textContent = panel_default;
  document.head.appendChild(tag);
}
installPanelStyles();
function useInstalledFonts() {
  const [installed, setInstalled] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let alive = true;
    const all = [...UI_FONT_CANDIDATES, ...CODE_FONT_CANDIDATES];
    fetch(FONTS_ROUTE).then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status)))).then((data) => {
      const families = data?.families;
      if (alive) setInstalled(Array.isArray(families) ? families.filter((f) => typeof f === "string") : all);
    }).catch(() => {
      if (alive) setInstalled(all);
    });
    return () => {
      alive = false;
    };
  }, []);
  return installed;
}
function PresetStrip({ knobs }) {
  const segments = [knobs.accent, knobs.surface, knobs.ink, knobs.diffAdded, knobs.diffRemoved, knobs.skill];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "codex-theme-strip", "aria-hidden": "true", children: segments.map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { backgroundColor: color } }, index)) });
}
function ThemeSelectRow({
  id,
  label,
  value,
  presets,
  onChange
}) {
  const selected = presets[value] ?? presets[0];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: id, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-theme-control", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { id, value, "aria-label": label, onChange: (event) => onChange(Number(event.currentTarget.value)), children: presets.map((preset, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: index, children: preset.name }, `${preset.name}-${index}`)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetStrip, { knobs: selected.knobs })
    ] })
  ] });
}
function SelectRow({
  id,
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: id, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { id, value, "aria-label": label, onChange: (event) => onChange(event.currentTarget.value), children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: option.id, children: option.label }, option.id)) })
  ] });
}
function NumberRow({
  id,
  label,
  value,
  min,
  max,
  unit,
  onChange
}) {
  const [draft, setDraft] = (0, import_react.useState)(String(value));
  (0, import_react.useEffect)(() => setDraft(String(value)), [value]);
  const commit = (next) => {
    const parsed = Number(next);
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      return;
    }
    const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
    setDraft(String(clamped));
    onChange(clamped);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: id, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-number-control", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          id,
          type: "number",
          min,
          max,
          value: draft,
          "aria-label": label,
          onChange: (event) => setDraft(event.currentTarget.value),
          onBlur: (event) => commit(event.currentTarget.value),
          onKeyDown: (event) => {
            if (event.key === "Enter") commit(event.currentTarget.value);
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: unit })
    ] })
  ] });
}
function ThemePanel({ t, useStore, setThemePreset, setAppearance, setFont, resetTheme }) {
  const settings = useStore((state) => state.settings);
  const scheme = useStore((state) => state.scheme);
  const preference = useStore((state) => state.preference);
  const installedFonts = useInstalledFonts();
  const uiFontOptions = (0, import_react.useMemo)(() => {
    const visible = installedFonts === null ? [...UI_FONT_CANDIDATES] : UI_FONT_CANDIDATES.filter((family) => installedFonts.includes(family));
    return [{ id: "system", label: t("font.system") }, ...visible.map((family) => ({ id: family, label: family }))];
  }, [installedFonts, t]);
  const codeFontOptions = (0, import_react.useMemo)(() => {
    const visible = installedFonts === null ? [...CODE_FONT_CANDIDATES] : CODE_FONT_CANDIDATES.filter((family) => installedFonts.includes(family));
    return [{ id: "system", label: t("font.system") }, ...visible.map((family) => ({ id: family, label: family }))];
  }, [installedFonts, t]);
  const withCurrent = (options, current) => current === "system" || options.some((option) => option.id === current) ? options : [...options, { id: current, label: t("font.unavailable").replace("{font}", current) }];
  const appearanceOptions = [
    { id: "light", label: t("appearance.light") },
    { id: "dark", label: t("appearance.dark") },
    { id: "system", label: t("appearance.system") }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-panel", "data-codex-theme-panel": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("title") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("desc") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "codex-reset", type: "button", onClick: resetTheme, children: t("action.reset") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "codex-subheading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("theme.title") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { id: "codex-appearance-label", children: t("appearance.title") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "codex-segment", role: "group", "aria-labelledby": "codex-appearance-label", children: appearanceOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: preference === option.id ? "is-selected" : void 0,
            "aria-pressed": preference === option.id,
            onClick: () => setAppearance(option.id),
            children: option.label
          },
          option.id
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ThemeSelectRow,
        {
          id: "codex-theme-preset",
          label: scheme === "dark" ? t("theme.dark") : t("theme.light"),
          value: scheme === "dark" ? settings.darkPreset : settings.lightPreset,
          presets: scheme === "dark" ? DARK_PRESETS : LIGHT_PRESETS,
          onChange: (index) => setThemePreset(scheme, index)
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "codex-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "codex-subheading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("font.title") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, { id: "codex-ui-font", label: t("font.uiFamily"), value: settings.uiFont, options: withCurrent(uiFontOptions, settings.uiFont), onChange: (v) => setFont("uiFont", v) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberRow, { id: "codex-ui-font-size", label: t("font.uiSize"), value: settings.uiFontSize, min: 9, max: 32, unit: "px", onChange: (v) => setFont("uiFontSize", v) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberRow, { id: "codex-workspace-font-size", label: t("font.workspaceSize"), value: settings.workspaceFontSize, min: 9, max: 32, unit: "px", onChange: (v) => setFont("workspaceFontSize", v) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, { id: "codex-code-font", label: t("font.codeFamily"), value: settings.codeFont, options: withCurrent(codeFontOptions, settings.codeFont), onChange: (v) => setFont("codeFont", v) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberRow, { id: "codex-code-font-size", label: t("font.codeSize"), value: settings.codeFontSize, min: 9, max: 32, unit: "px", onChange: (v) => setFont("codeFontSize", v) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "codex-hint", children: t("hint.live") })
  ] });
}

// src/client/index.ts
var LOCALE_NS = "settings.codex-theme";
var zh = {
  nav: "Codex \u4E3B\u9898",
  title: "Codex \u4E3B\u9898\u5916\u89C2",
  desc: "\u9009\u62E9\u4E3B\u9898\u5E76\u81EA\u5B9A\u4E49\u5B57\u4F53\uFF0C\u4FEE\u6539\u5373\u65F6\u751F\u6548\u5E76\u6301\u4E45\u5316\u5230 settings.yaml",
  "theme.title": "\u4E3B\u9898",
  "theme.light": "\u6D45\u8272\u4E3B\u9898",
  "theme.dark": "\u6DF1\u8272\u4E3B\u9898",
  "appearance.title": "\u5916\u89C2",
  "appearance.light": "\u6D45\u8272",
  "appearance.dark": "\u6DF1\u8272",
  "appearance.system": "\u8DDF\u968F\u7CFB\u7EDF",
  "font.title": "\u5B57\u4F53",
  "font.uiFamily": "UI \u5B57\u4F53",
  "font.uiSize": "UI \u5B57\u53F7",
  "font.workspaceSize": "\u5DE5\u4F5C\u533A\u5B57\u53F7",
  "font.codeFamily": "\u4EE3\u7801\u5B57\u4F53",
  "font.codeSize": "\u4EE3\u7801\u5B57\u53F7",
  "font.system": "\u7CFB\u7EDF\u9ED8\u8BA4",
  "font.unavailable": "{font}\uFF08\u672A\u5B89\u88C5\uFF09",
  "action.reset": "\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",
  "hint.live": "\u4FEE\u6539\u5373\u65F6\u751F\u6548\uFF1B\u8BBE\u7F6E\u4FDD\u5B58\u5728 settings.yaml\uFF0C\u91CD\u542F\u540E\u4FDD\u6301\u3002"
};
var en = {
  nav: "Codex Theme",
  title: "Codex Theme Appearance",
  desc: "Pick a theme and customize fonts; changes apply live and persist to settings.yaml",
  "theme.title": "Theme",
  "theme.light": "Light theme",
  "theme.dark": "Dark theme",
  "appearance.title": "Appearance",
  "appearance.light": "Light",
  "appearance.dark": "Dark",
  "appearance.system": "Follow system",
  "font.title": "Typography",
  "font.uiFamily": "Interface font",
  "font.uiSize": "Interface size",
  "font.workspaceSize": "Workspace size",
  "font.codeFamily": "Code font",
  "font.codeSize": "Code size",
  "font.system": "System default",
  "font.unavailable": "{font} (unavailable)",
  "action.reset": "Reset",
  "hint.live": "Changes apply live; settings are stored in settings.yaml and survive restarts."
};
var name = "dsh-codex-theme";
var inject = ["theme", "slots", "locale", "connection", "remote", "settingsScope"];
function resolveKnobs(settings) {
  return {
    light: LIGHT_PRESETS[settings.lightPreset]?.knobs ?? DEFAULT_LIGHT_KNOBS,
    dark: DARK_PRESETS[settings.darkPreset]?.knobs ?? DEFAULT_DARK_KNOBS
  };
}
function composeOverrides(settings) {
  const knobs = resolveKnobs(settings);
  return {
    ...buildTokenOverrides(knobs.light, knobs.dark),
    ...buildTypographyOverrides(settings)
  };
}
function createTokenPresenter(ctx) {
  let applied = [];
  const schemeOf = () => ctx.theme.getTheme().active?.colorScheme === "dark" ? "dark" : "light";
  const present = (tokens) => {
    if (typeof document === "undefined") return;
    const scheme = schemeOf();
    const body = document.body;
    document.documentElement.style.colorScheme = scheme;
    if (scheme === "dark") body.setAttribute("data-ds-dark-theme", "");
    else body.removeAttribute("data-ds-dark-theme");
    const previous = new Set(applied);
    const names = Object.keys(tokens);
    for (const name2 of previous) if (!names.includes(name2)) body.style.removeProperty(name2);
    for (const name2 of names) body.style.setProperty(name2, tokens[name2][scheme]);
    applied = names;
  };
  return {
    apply: (tokens) => present(tokens),
    dispose: () => {
      if (typeof document === "undefined") return;
      for (const name2 of applied) document.body.style.removeProperty(name2);
      applied = [];
    }
  };
}
function apply(ctx) {
  const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
  const presenter = createTokenPresenter(ctx);
  let settings = sanitizeSettings(scope.getSnapshot().value);
  let release = () => {
  };
  let composed = {};
  const reapply = () => {
    release();
    composed = composeOverrides(settings);
    release = ctx.theme.overrideTokens(OVERRIDE_SOURCE, composed);
    presenter.apply(composed);
    installScaleStyles(settings.uiFontSize - 16, settings.workspaceFontSize - 14);
  };
  const snapshotOf = (value) => JSON.stringify(value);
  const schemeOf = () => ctx.theme.getTheme().active?.colorScheme === "dark" ? "dark" : "light";
  const preferenceOf = () => {
    const preference = ctx.theme.getTheme().preference;
    return preference === "light" || preference === "dark" || preference === "system" ? preference : "system";
  };
  const store = createPanelStore(settings);
  let actions;
  const syncStore = () => actions?.syncSettings(settings);
  const syncTheme = () => actions?.syncTheme(schemeOf(), preferenceOf());
  ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), "dsh-codex-theme: dictionaries");
  ctx.effect(
    () => ctx.on("theme/change", () => {
      presenter.apply(composed);
      syncTheme();
    }),
    "dsh-codex-theme: scheme presenter sync"
  );
  ctx.effect(() => {
    reapply();
    const unsubscribe = scope.subscribe(() => {
      const next = sanitizeSettings(scope.getSnapshot().value);
      if (snapshotOf(next) === snapshotOf(settings)) return;
      settings = next;
      reapply();
      syncStore();
    });
    return () => {
      unsubscribe();
      release();
      presenter.dispose();
      removeScaleStyles();
    };
  }, "dsh-codex-theme: live theme overrides");
  const setThemePreset = (mode, index) => {
    const field = mode === "light" ? "lightPreset" : "darkPreset";
    settings = { ...settings, [field]: index };
    syncStore();
    reapply();
    scope.set(field, index);
  };
  const setFont = (field, value) => {
    settings = { ...settings, [field]: value };
    syncStore();
    reapply();
    scope.set(field, value);
  };
  const resetTheme = () => {
    settings = sanitizeSettings(DEFAULT_SETTINGS);
    syncStore();
    reapply();
    scope.set("lightPreset", settings.lightPreset);
    scope.set("darkPreset", settings.darkPreset);
    scope.set("uiFont", settings.uiFont);
    scope.set("uiFontSize", settings.uiFontSize);
    scope.set("workspaceFontSize", settings.workspaceFontSize);
    scope.set("codeFont", settings.codeFont);
    scope.set("codeFontSize", settings.codeFontSize);
  };
  const setAppearance = (preference) => {
    ctx.theme.setTheme(preference);
  };
  const injectProps = (bound) => {
    actions = bound;
    syncStore();
    syncTheme();
    return { setThemePreset, setFont, resetTheme, setAppearance };
  };
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register(
      {
        name: "settings.section",
        id: "dsh-codex-theme",
        order: 6,
        label: () => ctx.locale.bind(LOCALE_NS)("nav"),
        store,
        locale: LOCALE_NS,
        inject: injectProps
      },
      ThemePanel
    )
  );
}
return module.exports; } });
