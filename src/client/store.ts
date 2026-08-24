/**
 * 外观面板的状态 store：当前设置快照（主题预设索引 + 字体偏好）。
 * 插件 apply 里经 slot 的 inject 钩子绑定 actions。
 */
import { defineStore } from "@deepseek-ai/dsh-client-runtime/client";
import { DEFAULT_SETTINGS, type CodexSettings } from "../defaults.js";

export interface PanelState {
  settings: CodexSettings;
}

export function createPanelStore(initial: CodexSettings = DEFAULT_SETTINGS) {
  return defineStore({
    init: (): PanelState => ({
      settings: { ...initial },
    }),
    actions: {
      syncSettings: (draft: PanelState, settings: CodexSettings) => {
        draft.settings = { ...settings };
      },
    },
  });
}
