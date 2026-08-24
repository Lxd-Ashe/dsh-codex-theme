/**
 * 设置节的运行时校验：host 透传的 settings.yaml 内容可能是任意 JSON，
 * 逐字段做范围/枚举校验，非法字段回落默认值。
 */
import { DEFAULT_SETTINGS, FONT_IDS, type CodexSettings } from "../defaults.js";
import { DARK_PRESETS, LIGHT_PRESETS } from "./presets.js";

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max
    ? value
    : fallback;
}

function sanitizeFontId(value: unknown, fallback: string): string {
  return typeof value === "string" && (FONT_IDS as readonly string[]).includes(value)
    ? value
    : fallback;
}

/** 把设置节（或 undefined）规范化为完整 CodexSettings。 */
export function sanitizeSettings(section: unknown): CodexSettings {
  const record = section !== null && typeof section === "object" ? (section as Record<string, unknown>) : {};
  return {
    lightPreset: clampInt(record.lightPreset, 0, LIGHT_PRESETS.length - 1, DEFAULT_SETTINGS.lightPreset),
    darkPreset: clampInt(record.darkPreset, 0, DARK_PRESETS.length - 1, DEFAULT_SETTINGS.darkPreset),
    uiFont: sanitizeFontId(record.uiFont, DEFAULT_SETTINGS.uiFont),
    uiFontSize: clampInt(record.uiFontSize, 9, 32, DEFAULT_SETTINGS.uiFontSize),
    workspaceFontSize: clampInt(record.workspaceFontSize, 9, 32, DEFAULT_SETTINGS.workspaceFontSize),
    codeFont: sanitizeFontId(record.codeFont, DEFAULT_SETTINGS.codeFont),
    codeFontSize: clampInt(record.codeFontSize, 9, 32, DEFAULT_SETTINGS.codeFontSize),
  };
}
