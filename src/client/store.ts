/**
 * 外观面板的状态 store：当前设置快照（主题预设索引 + 字体偏好）
 * 与当前配色状态（scheme / preference，随 theme/change 同步）。
 * 插件 apply 里经 slot 的 inject 钩子绑定 actions。
 */
import { defineStore } from "@deepseek-ai/dsh-client-store";
import { DEFAULT_SETTINGS, type CodexSettings } from "../defaults.js";

export type ColorScheme = "light" | "dark";
export type ThemePreference = "light" | "dark" | "system";

export interface PanelState {
  settings: CodexSettings;
  /** 当前生效的配色（system 时按系统解析），决定单下拉框列哪组预设。 */
  scheme: ColorScheme;
  /** 外观偏好（浅色/深色/跟随系统），驱动面板内的外观三选一。 */
  preference: ThemePreference;
}

export function createPanelStore(initial: CodexSettings = DEFAULT_SETTINGS) {
  return defineStore({
    init: (): PanelState => ({
      settings: { ...initial },
      scheme: "light",
      preference: "system",
    }),
    actions: {
      syncSettings: (draft: PanelState, settings: CodexSettings) => {
        draft.settings = { ...settings };
      },
      syncTheme: (draft: PanelState, scheme: ColorScheme, preference: ThemePreference) => {
        draft.scheme = scheme;
        draft.preference = preference;
      },
    },
  });
}
