/**
 * 侧边栏/工作区/输入框的字号跟随缩放。
 *
 * DSH 左侧工作区、侧边栏导航与输入框的字号是硬编码 px（不消费
 * --dsw-font-* token），改 UI 字号不会影响它们。这里用稳定的 data-slot
 * 锚点（slot 系统契约）+ 已核实的 CSS Modules 类名，按 uiDelta 动态注入
 * 缩放规则：font-size/line-height = 原值 + delta。
 *
 * 类名哈希随 DSH 版本可能变化（已按 0.1.0-rc.x 核实）；失效时仅影响缩放，
 * 不影响主题本身。
 */

interface ScaleRule {
  cls: string;
  size: number;
  lh?: number;
}

/** 已核实的硬编码元素（侧边栏 + 工作区列表 + 悬停卡/搜索）。 */
const RULES: readonly ScaleRule[] = [
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
  { cls: ".YDXeBa_hoverStatus", size: 12, lh: 20 },
];

const SCALE_CSS_ID = "dsh-codex-theme/scale";

/** 组装缩放样式表（uiDelta = uiFontSize - 16；wsDelta = workspaceFontSize - 14）。 */
export function buildScaleCss(uiDelta: number, wsDelta: number): string {
  const lines: string[] = [];
  for (const rule of RULES) {
    const declarations = [
      `font-size:calc(${rule.size}px + ${wsDelta}px)!important`,
      // 字重跟随正文 token（当前 430），与全局字重规格自动对齐
      "font-weight:var(--dsw-font-s-14-font-weight)!important",
    ];
    if (rule.lh !== undefined) declarations.push(`line-height:calc(${rule.lh}px + ${wsDelta}px)!important`);
    lines.push(`[data-slot="sidebar"] ${rule.cls}{${declarations.join(";")}}`);
  }
  // 输入框：composer 是「镜像(backdrop) + 透明 textarea」结构，光标靠两者
  // 字体指标一致对齐——把字号/字重放在共同容器 .uV2eYG_grow 上继承，
  // 不覆盖 font-family（镜像自带 DshChipCell 前缀，改了会破坏 chip 渲染）。
  lines.push(
    `[data-slot="conversation.composer"] .uV2eYG_grow,[data-slot="conversation.composer.bar"] .uV2eYG_grow{font-size:var(--dsw-font-base-16-font-size)!important;font-weight:var(--dsw-font-base-16-font-weight)!important}`,
  );
  // input 不在 grow 继承链内：单独对齐字号/字重（不动 font-family 与
  // line-height，保证与 backdrop 镜像的字体指标一致、光标不漂移）。
  lines.push(
    `[data-slot="conversation.composer"] .uV2eYG_input,[data-slot="conversation.composer.bar"] .uV2eYG_input{font-size:var(--dsw-font-base-16-font-size)!important;font-weight:var(--dsw-font-base-16-font-weight)!important}`,
  );
  // 消息正文：用户气泡与助手正文硬编码 16px、无字重（继承 400），
  // 改为跟随 markdown-base token（字号随 delta 缩放，字重 430）。
  lines.push(
    `[data-slot="conversation.session"] .Sxvs8a_root,[data-slot="conversation.session"] .gdEzaW_bubble{font-size:var(--dsw-font-markdown-base-font-size)!important;font-weight:var(--dsw-font-markdown-base-font-weight)!important}`,
  );
  return lines.join("\n");
}

/** 注入/更新缩放样式表（单 style 标签，随两个 delta 重建）。 */
export function installScaleStyles(uiDelta: number, wsDelta: number): void {
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

/** 移除缩放样式表（插件卸载时）。 */
export function removeScaleStyles(): void {
  if (typeof document === "undefined") return;
  document.querySelector(`style[data-plugin-css="${SCALE_CSS_ID}"]`)?.remove();
}
