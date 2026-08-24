/**
 * Host-side durable schema for the `dsh-codex-theme` settings namespace.
 * Registered with the Host settings service so loopback Web clients can read
 * and write the section through `ctx.settingsScope` — values persist to
 * `$DSH_HOME/settings.yaml` under the `dsh-codex-theme` key (surviving app
 * restarts and port changes, unlike browser-local storage).
 *
 * 主题以预设索引存储（配色在 src/client/presets.ts 预设表里），
 * 设置节只保存：浅色/深色预设索引 + 字体偏好。
 */
import z from "@deepseek-ai/schemastery";
import { DEFAULT_SETTINGS } from "./defaults.js";

export const CodexSettingsSchema = z.object({
  lightPreset: z.number().default(DEFAULT_SETTINGS.lightPreset),
  darkPreset: z.number().default(DEFAULT_SETTINGS.darkPreset),
  uiFont: z.string().default(DEFAULT_SETTINGS.uiFont),
  uiFontSize: z.number().default(DEFAULT_SETTINGS.uiFontSize),
  workspaceFontSize: z.number().default(DEFAULT_SETTINGS.workspaceFontSize),
  codeFont: z.string().default(DEFAULT_SETTINGS.codeFont),
  codeFontSize: z.number().default(DEFAULT_SETTINGS.codeFontSize),
});
