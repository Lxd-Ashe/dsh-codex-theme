/**
 * Codex 主题外观设置面板（挂在 DSH 设置 → Codex 主题）：
 * 外观三选一（浅色/深色/跟随系统，复用 DSH 内置 ui-theme 偏好）+ 单主题下拉框
 * （跟随当前生效配色：深色列深色预设、浅色列浅色预设）+ 字体自定义。
 * 用户不再编辑颜色，只能选择主题预设与调整字体样式。
 */
import { useMemo, useEffect, useState } from "react";
import { CODE_FONT_CANDIDATES, UI_FONT_CANDIDATES, type ModeKnobs } from "../defaults.js";
import { DARK_PRESETS, LIGHT_PRESETS } from "./presets.js";
import type { ColorScheme, ThemePreference } from "./store.js";
import panelCss from "./panel.css";

const PANEL_CSS_ID = "dsh-codex-theme/panel";

/** host 的字体枚举路由（system_profiler 结果，见 src/fonts-route.ts）。 */
const FONTS_ROUTE = "/api/dsh-codex-theme/fonts";

/** 把面板样式注入为单个 style 标签（单文件 bundle 约束：不产出独立 css 文件）。 */
function installPanelStyles(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`style[data-plugin-css="${PANEL_CSS_ID}"]`) !== null) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-codex-theme";
  tag.dataset.pluginCss = PANEL_CSS_ID;
  tag.textContent = panelCss;
  document.head.appendChild(tag);
}

installPanelStyles();

export interface PanelProps {
  t: (key: string) => string;
  useStore: <T>(selector: (state: { settings: unknown; scheme: string; preference: string }) => T) => T;
  setThemePreset: (mode: "light" | "dark", index: number) => void;
  setAppearance: (preference: ThemePreference) => void;
  setFont: (field: "uiFont" | "uiFontSize" | "workspaceFontSize" | "codeFont" | "codeFontSize", value: string | number) => void;
  resetTheme: () => void;
}

interface SettingsView {
  lightPreset: number;
  darkPreset: number;
  uiFont: string;
  uiFontSize: number;
  workspaceFontSize: number;
  codeFont: string;
  codeFontSize: number;
}

/** 通过 host 路由拉取本机已安装字体（document.fonts.check 无法区分缺失字体）。 */
function useInstalledFonts(): string[] | null {
  const [installed, setInstalled] = useState<string[] | null>(null);
  useEffect(() => {
    let alive = true;
    const all = [...UI_FONT_CANDIDATES, ...CODE_FONT_CANDIDATES] as string[];
    fetch(FONTS_ROUTE)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: unknown) => {
        const families = (data as { families?: unknown })?.families;
        if (alive) setInstalled(Array.isArray(families) ? families.filter((f): f is string => typeof f === "string") : all);
      })
      .catch(() => {
        if (alive) setInstalled(all);
      });
    return () => {
      alive = false;
    };
  }, []);
  return installed;
}

/** 预设的 6 段色带（accent/surface/ink/diff×2/skill）。 */
function PresetStrip({ knobs }: { knobs: ModeKnobs }) {
  const segments = [knobs.accent, knobs.surface, knobs.ink, knobs.diffAdded, knobs.diffRemoved, knobs.skill];
  return (
    <div className="codex-theme-strip" aria-hidden="true">
      {segments.map((color, index) => (
        <i key={index} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

/** 自绘下拉箭头（原生箭头已去掉，位置由 CSS 精确控制）。 */
function Chevron() {
  return (
    <span className="codex-chevron" aria-hidden="true">
      <svg viewBox="0 0 8 5" focusable="false">
        <path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ThemeSelectRow({
  id,
  label,
  value,
  presets,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  presets: readonly { name: string; knobs: ModeKnobs }[];
  onChange: (index: number) => void;
}) {
  const selected = presets[value] ?? presets[0];
  return (
    <div className="codex-row">
      <label htmlFor={id}>{label}</label>
      <div className="codex-theme-control">
        <div className="codex-select-wrap">
          <select id={id} value={value} aria-label={label} onChange={(event) => onChange(Number(event.currentTarget.value))}>
            {presets.map((preset, index) => (
              <option key={`${preset.name}-${index}`} value={index}>
                {preset.name}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
        <PresetStrip knobs={selected.knobs} />
      </div>
    </div>
  );
}

function SelectRow({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="codex-row">
      <label htmlFor={id}>{label}</label>
      <div className="codex-select-wrap">
        <select id={id} value={value} aria-label={label} onChange={(event) => onChange(event.currentTarget.value)}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
    </div>
  );
}

function NumberRow({
  id,
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const commit = (next: string) => {
    const parsed = Number(next);
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      return;
    }
    const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
    setDraft(String(clamped));
    onChange(clamped);
  };
  return (
    <div className="codex-row">
      <label htmlFor={id}>{label}</label>
      <div className="codex-number-control">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={draft}
          aria-label={label}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onBlur={(event) => commit(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit((event.currentTarget as HTMLInputElement).value);
          }}
        />
        <span className="codex-unit" aria-hidden="true">{unit}</span>
      </div>
    </div>
  );
}

/** 面板主体：外观三选一 + 单主题下拉（跟随当前配色）+ 字体自定义。 */
export function ThemePanel({ t, useStore, setThemePreset, setAppearance, setFont, resetTheme }: PanelProps) {
  const settings = useStore((state) => state.settings) as SettingsView;
  const scheme = useStore((state) => state.scheme) as ColorScheme;
  const preference = useStore((state) => state.preference) as ThemePreference;

  const installedFonts = useInstalledFonts();

  const uiFontOptions = useMemo(() => {
    const visible =
      installedFonts === null ? [...UI_FONT_CANDIDATES] : UI_FONT_CANDIDATES.filter((family) => installedFonts.includes(family));
    return [{ id: "system", label: t("font.system") }, ...visible.map((family) => ({ id: family, label: family }))];
  }, [installedFonts, t]);
  const codeFontOptions = useMemo(() => {
    const visible =
      installedFonts === null ? [...CODE_FONT_CANDIDATES] : CODE_FONT_CANDIDATES.filter((family) => installedFonts.includes(family));
    return [{ id: "system", label: t("font.system") }, ...visible.map((family) => ({ id: family, label: family }))];
  }, [installedFonts, t]);
  /** 当前选中字体若未安装（如设置从别的机器同步而来），保留该选项以便回退。 */
  const withCurrent = (options: readonly { id: string; label: string }[], current: string) =>
    current === "system" || options.some((option) => option.id === current)
      ? options
      : [...options, { id: current, label: t("font.unavailable").replace("{font}", current) }];

  const appearanceOptions = [
    { id: "light", label: t("appearance.light") },
    { id: "dark", label: t("appearance.dark") },
    { id: "system", label: t("appearance.system") },
  ] as const;

  return (
    <div className="codex-panel" data-codex-theme-panel>
      <div className="codex-header">
        <div>
          <h2>{t("title")}</h2>
          <p>{t("desc")}</p>
        </div>
        <button className="codex-reset" type="button" onClick={resetTheme}>
          {t("action.reset")}
        </button>
      </div>

      <div className="codex-card">
        <div className="codex-row">
          <label id="codex-appearance-label">{t("appearance.title")}</label>
          <div className="codex-segment" role="group" aria-labelledby="codex-appearance-label">
            {appearanceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={preference === option.id ? "is-selected" : undefined}
                aria-pressed={preference === option.id}
                onClick={() => setAppearance(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <ThemeSelectRow
          id="codex-theme-preset"
          label={scheme === "dark" ? t("theme.dark") : t("theme.light")}
          value={scheme === "dark" ? settings.darkPreset : settings.lightPreset}
          presets={scheme === "dark" ? DARK_PRESETS : LIGHT_PRESETS}
          onChange={(index) => setThemePreset(scheme, index)}
        />
      </div>

      <div className="codex-card">
        <SelectRow id="codex-ui-font" label={t("font.uiFamily")} value={settings.uiFont} options={withCurrent(uiFontOptions, settings.uiFont)} onChange={(v) => setFont("uiFont", v)} />
        <NumberRow id="codex-ui-font-size" label={t("font.uiSize")} value={settings.uiFontSize} min={9} max={32} unit="px" onChange={(v) => setFont("uiFontSize", v)} />
        <NumberRow id="codex-workspace-font-size" label={t("font.workspaceSize")} value={settings.workspaceFontSize} min={9} max={32} unit="px" onChange={(v) => setFont("workspaceFontSize", v)} />
        <SelectRow id="codex-code-font" label={t("font.codeFamily")} value={settings.codeFont} options={withCurrent(codeFontOptions, settings.codeFont)} onChange={(v) => setFont("codeFont", v)} />
        <NumberRow id="codex-code-font-size" label={t("font.codeSize")} value={settings.codeFontSize} min={9} max={32} unit="px" onChange={(v) => setFont("codeFontSize", v)} />
      </div>

      <p className="codex-hint">{t("hint.live")}</p>
    </div>
  );
}
