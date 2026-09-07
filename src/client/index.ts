/**
 * Client half of dsh-codex-theme：
 *
 * 1. 通过 `ctx.settingsScope` 绑定 `dsh-codex-theme` 设置命名空间（host 已
 *    注册 schema，写入持久化到 $DSH_HOME/settings.yaml，重启/换端口不丢）；
 * 2. 按所选主题预设（浅色/深色各一，预设表由 codex 主题配置生成）推导
 *    token 覆盖层，经 `ctx.theme.overrideTokens` 叠加（与内置主题偏好无关）；
 * 3. 在 DSH 设置页注册「Codex 主题」外观分区：主题选择 + 字体自定义。
 */
import {
  DEFAULT_DARK_KNOBS,
  DEFAULT_LIGHT_KNOBS,
  DEFAULT_SETTINGS,
  OVERRIDE_SOURCE,
  SETTINGS_NAMESPACE,
  type CodexSettings,
} from "../defaults.js";
import { buildTokenOverrides } from "./derive.js";
import { buildTypographyOverrides } from "./fonts.js";
import { DARK_PRESETS, LIGHT_PRESETS } from "./presets.js";
import { sanitizeSettings } from "./settings-model.js";
import { installScaleStyles, removeScaleStyles } from "./scale.js";
import { createPanelStore, type ColorScheme, type ThemePreference } from "./store.js";
import { ThemePanel } from "./ThemePanel";

const LOCALE_NS = "settings.codex-theme";

const zh = {
  nav: "Codex 主题",
  title: "Codex 主题外观",
  desc: "选择主题并自定义字体，修改即时生效并持久化到 settings.yaml",
  "theme.light": "浅色主题",
  "theme.dark": "深色主题",
  "appearance.title": "外观",
  "appearance.light": "浅色",
  "appearance.dark": "深色",
  "appearance.system": "跟随系统",
  "font.uiFamily": "UI 字体",
  "font.uiSize": "UI 字号",
  "font.workspaceSize": "工作区字号",
  "font.codeFamily": "代码字体",
  "font.codeSize": "代码字号",
  "font.system": "系统默认",
  "font.unavailable": "{font}（未安装）",
  "action.reset": "重置为默认",
  "hint.live": "修改即时生效；设置保存在 settings.yaml，重启后保持。",
} as const;

const en = {
  nav: "Codex Theme",
  title: "Codex Theme Appearance",
  desc: "Pick a theme and customize fonts; changes apply live and persist to settings.yaml",
  "theme.light": "Light theme",
  "theme.dark": "Dark theme",
  "appearance.title": "Appearance",
  "appearance.light": "Light",
  "appearance.dark": "Dark",
  "appearance.system": "Follow system",
  "font.uiFamily": "Interface font",
  "font.uiSize": "Interface size",
  "font.workspaceSize": "Workspace size",
  "font.codeFamily": "Code font",
  "font.codeSize": "Code size",
  "font.system": "System default",
  "font.unavailable": "{font} (unavailable)",
  "action.reset": "Reset",
  "hint.live": "Changes apply live; settings are stored in settings.yaml and survive restarts.",
} as const;

export interface ThemeServiceLike {
  /** 当前主题快照：preference（light/dark/system）+ active.colorScheme。 */
  getTheme(): { preference?: string; active?: { colorScheme?: string } };
  /** 切换外观偏好（light/dark/system），持久化并发出 theme/change。 */
  setTheme(id: ThemePreference): void;
  overrideTokens(source: string, tokens: Readonly<Record<string, { readonly light: string; readonly dark: string }>>): () => void;
}

export interface ScopeLike {
  getSnapshot(): { value?: unknown; revision?: number };
  subscribe(listener: () => void): () => void;
  set(field: string, value: unknown): Promise<unknown> | unknown;
}

export interface ThemeContext {
  theme: ThemeServiceLike;
  settingsScope: { bind(spec: { namespace: string }): ScopeLike };
  slots: {
    inject(name: string, register: () => () => void): void;
    register(config: Record<string, unknown>, component: unknown): () => void;
  };
  locale: {
    register(namespace: string, dictionaries: { zh: unknown; en: unknown }): () => void;
    bind(namespace: string): (key: string) => string;
  };
  effect(callback: () => (() => void) | void, label?: string): void;
  on(event: string, listener: (snapshot: unknown) => void): () => void;
}

export const name = "dsh-codex-theme";

/** Services required before activation (provided by the DSH client runtime). */
export const inject = ["theme", "slots", "locale", "connection", "remote", "settingsScope"];

/** 解析当前设置的浅/深两组主题参数。 */
function resolveKnobs(settings: CodexSettings) {
  return {
    light: LIGHT_PRESETS[settings.lightPreset]?.knobs ?? DEFAULT_LIGHT_KNOBS,
    dark: DARK_PRESETS[settings.darkPreset]?.knobs ?? DEFAULT_DARK_KNOBS,
  };
}

/** Compose the full override layer: theme colors + typography. */
function composeOverrides(settings: CodexSettings) {
  const knobs = resolveKnobs(settings);
  return {
    ...buildTokenOverrides(knobs.light, knobs.dark),
    ...buildTypographyOverrides(settings),
  };
}

/**
 * 把 token 覆盖层落到 DOM。标准 web 壳由 ui-layout 的 presenter 做这件事，
 * 但桌面应用的 compatibility shell 没有它（ui-layout 被排除）——插件自带
 * presenter，按主题服务快照的 colorScheme 选 light/dark 值写入 body 内联变量，
 * 并维护 color-scheme 与 data-ds-dark-theme，两个环境都成立（重复应用幂等）。
 */
function createTokenPresenter(ctx: ThemeContext) {
  let applied: string[] = [];
  const schemeOf = (): ColorScheme => (ctx.theme.getTheme().active?.colorScheme === "dark" ? "dark" : "light");
  const present = (tokens: Readonly<Record<string, { readonly light: string; readonly dark: string }>>) => {
    if (typeof document === "undefined") return;
    const scheme = schemeOf();
    const body = document.body;
    document.documentElement.style.colorScheme = scheme;
    if (scheme === "dark") body.setAttribute("data-ds-dark-theme", "");
    else body.removeAttribute("data-ds-dark-theme");
    const previous = new Set(applied);
    const names = Object.keys(tokens);
    for (const name of previous) if (!names.includes(name)) body.style.removeProperty(name);
    for (const name of names) body.style.setProperty(name, tokens[name][scheme]);
    applied = names;
  };
  return {
    apply: (tokens: Readonly<Record<string, { readonly light: string; readonly dark: string }>>) => present(tokens),
    dispose: () => {
      if (typeof document === "undefined") return;
      for (const name of applied) document.body.style.removeProperty(name);
      applied = [];
    },
  };
}

/** Register the Codex appearance section and apply the settings-derived theme. */
export function apply(ctx: ThemeContext): void {
  const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
  const presenter = createTokenPresenter(ctx);

  let settings = sanitizeSettings(scope.getSnapshot().value);
  let release = () => {};
  let composed: Readonly<Record<string, { readonly light: string; readonly dark: string }>> = {};

  const reapply = () => {
    release();
    composed = composeOverrides(settings);
    release = ctx.theme.overrideTokens(OVERRIDE_SOURCE, composed);
    presenter.apply(composed);
    // 侧边栏/工作区列表的硬编码字号跟随 workspaceFontSize 缩放
    installScaleStyles(settings.workspaceFontSize - 14);
  };
  const snapshotOf = (value: CodexSettings) => JSON.stringify(value);
  /** 当前生效配色（跟随系统时按系统解析）。 */
  const schemeOf = (): ColorScheme => (ctx.theme.getTheme().active?.colorScheme === "dark" ? "dark" : "light");
  /** 当前外观偏好（浅色/深色/跟随系统）。 */
  const preferenceOf = (): ThemePreference => {
    const preference = ctx.theme.getTheme().preference;
    return preference === "light" || preference === "dark" || preference === "system" ? preference : "system";
  };

  const store = createPanelStore(settings);
  let actions: { syncSettings(s: CodexSettings): void; syncTheme(scheme: ColorScheme, preference: ThemePreference): void } | undefined;
  const syncStore = () => actions?.syncSettings(settings);
  const syncTheme = () => actions?.syncTheme(schemeOf(), preferenceOf());

  ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), "dsh-codex-theme: dictionaries");

  ctx.effect(
    () =>
      ctx.on("theme/change", () => {
        presenter.apply(composed);
        syncTheme();
      }),
    "dsh-codex-theme: scheme presenter sync",
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

  const setThemePreset = (mode: "light" | "dark", index: number) => {
    const field = mode === "light" ? "lightPreset" : "darkPreset";
    settings = { ...settings, [field]: index };
    syncStore();
    reapply();
    scope.set(field, index);
  };

  const setFont = (field: "uiFont" | "uiFontSize" | "workspaceFontSize" | "codeFont" | "codeFontSize", value: string | number) => {
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

  /** 切换外观偏好：复用 DSH 内置 ui-theme 设置（持久化 + 即时生效）。 */
  const setAppearance = (preference: ThemePreference) => {
    ctx.theme.setTheme(preference);
  };

  const injectProps = (bound: typeof actions) => {
    actions = bound;
    syncStore();
    syncTheme();
    return { setThemePreset, setFont, resetTheme, setAppearance };
  };

  ctx.slots.inject("settings.section", () =>
    ctx.slots.register(
      {
        name: "settings.section",
        id: "dsh-codex-theme",
        order: 6,
        label: () => ctx.locale.bind(LOCALE_NS)("nav"),
        store,
        locale: LOCALE_NS,
        inject: injectProps,
      },
      ThemePanel,
    ),
  );
}
