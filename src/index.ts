/**
 * Host half of dsh-codex-theme:
 * 1. 注册 `dsh-codex-theme` 设置命名空间（写入 $DSH_HOME/settings.yaml）；
 * 2. 提供本机字体枚举路由（macOS system_profiler，供外观面板过滤
 *    字体下拉，只显示实际安装的字体）。
 * 主题逻辑本身全部在 client half。
 */
import type { ServerResponse } from "node:http";
import { SETTINGS_NAMESPACE } from "./defaults.js";
import { CodexSettingsSchema } from "./settings-schema.js";
import { FONTS_ROUTE, handleFontsRoute } from "./fonts-route.js";

export const name = "dsh-codex-theme";
export const inject: readonly string[] = [];

export interface SettingsContext {
  inject<Injected>(
    deps: string[],
    callback: (ctx: Injected) => void,
  ): void;
}

export interface WebServerContext {
  effect(callback: () => (() => void) | void, label?: string): void;
  webServer: {
    register(config: {
      kind: "exact";
      path: string;
      handler: (req: unknown, res: ServerResponse) => void | Promise<void>;
    }): () => void;
  };
}

/** Register the settings section and the font enumeration route. */
export function apply(ctx: SettingsContext): void {
  ctx.inject<{ settings: { register(namespace: unknown, schema: unknown): void } }>(["settings"], (settingsCtx) => {
    // SETTINGS_NAMESPACE 已是 kebab-case（与 dsh-settings 的 settingsNamespace
    // 品牌约束一致；不引入该包，link 安装的工作区插件无需 harness 依赖解析）。
    settingsCtx.settings.register(SETTINGS_NAMESPACE, CodexSettingsSchema);
  });
  ctx.inject<WebServerContext>(["webServer"], (httpCtx) => {
    httpCtx.effect(
      () =>
        httpCtx.webServer.register({
          kind: "exact",
          path: FONTS_ROUTE,
          handler: handleFontsRoute,
        }),
      "dsh-codex-theme: font enumeration route",
    );
  });
}
