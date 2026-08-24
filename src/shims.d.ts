/** 类型垫片：运行时由 DSH 模块系统提供，构建期不需要真实类型。 */
declare module "@deepseek-ai/dsh-client-runtime/client" {
  export function defineStore<State, Actions extends Record<string, (draft: State, ...args: never[]) => void>>(
    definition: unknown,
  ): unknown;
}

declare module "@deepseek-ai/dsh-settings" {
  export function settingsNamespace(namespace: string): unknown;
}
