/**
 * 侧边栏/工作区列表的字号跟随缩放。
 *
 * DSH 左侧侧边栏与工作区列表的字号是硬编码 px（不消费 --dsw-font-* token），
 * 改 UI 字号不会影响它们。这里用稳定的 data-slot 锚点（slot 系统契约）+
 * 已核实的 CSS Modules 类名（按 0.1.2-rc.1 核实），按 wsDelta 动态注入
 * 缩放规则：font-size/line-height = 原值 + delta。
 *
 * 聊天区（消息正文/用户气泡/输入框）在新版 DSH 中由 --dsh-content-font-size
 * 变量驱动，由 fonts.ts 的 token 覆盖接管，这里不再用类名选择器干预。
 *
 * 类名哈希随 DSH 版本可能变化；失效时仅影响缩放，不影响主题本身。
 */

interface ScaleRule {
  cls: string;
  size: number;
  lh?: number;
}

/** 已核实的硬编码元素（侧边栏 + 工作区列表 + 悬停卡/搜索）。 */
const RULES: readonly ScaleRule[] = [
  { cls: ".x-Wl6W_root", size: 14 },
  { cls: ".x-Wl6W_newSession", size: 14, lh: 22 },
  { cls: ".SJMXQW_sectionLabel", size: 14 },
  { cls: ".SJMXQW_empty", size: 13 },
  { cls: ".SJMXQW_searchInput", size: 13, lh: 18 },
  { cls: ".SJMXQW_searchWarning", size: 12, lh: 18 },
  { cls: ".SJMXQW_renameInput", size: 14, lh: 22 },
  { cls: ".SJMXQW_renameError", size: 12, lh: 18 },
  { cls: ".SJMXQW_deleteStatus", size: 12, lh: 18 },
  { cls: ".SJMXQW_sessionOverflowButton", size: 12 },
  { cls: ".ozLDBG_title", size: 14, lh: 20 },
  { cls: ".ozLDBG_searchResultTitle", size: 14, lh: 20 },
  { cls: ".ozLDBG_searchResultSnippet", size: 12, lh: 17 },
  { cls: ".ozLDBG_renameInput", size: 14, lh: 20 },
  { cls: ".ozLDBG_meta", size: 12, lh: 20 },
  { cls: ".ozLDBG_time", size: 12, lh: 20 },
  { cls: ".ozLDBG_hoverTitle", size: 14, lh: 20 },
  { cls: ".ozLDBG_hoverPath", size: 12, lh: 16 },
  { cls: ".ozLDBG_hoverTime", size: 12, lh: 16 },
  { cls: ".ozLDBG_hoverStatus", size: 12, lh: 20 },
];

const SCALE_CSS_ID = "dsh-codex-theme/scale";

/** 组装缩放样式表（wsDelta = workspaceFontSize - 14）。 */
export function buildScaleCss(wsDelta: number): string {
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
  // 聊天区字重：新版聊天容器（用户气泡/助手正文/输入框）不写 font-weight，
  // 走全局默认 400；这里固定回 430（跟随 base-16 token，与旧版观感一致）。
  // 加粗/标题等元素自带 token 字重（600/700），不受继承影响。
  lines.push(
    `[data-slot="conversation.session"] .VnbZpq_bubble,[data-slot="conversation.session"] .IS3SeW_root,[data-slot="conversation.composer"],[data-slot="conversation.composer.bar"],[data-slot="conversation.composer"] .Q7WfXG_input,[data-slot="conversation.composer.bar"] .Q7WfXG_input{font-weight:var(--dsw-font-base-16-font-weight)!important}`,
  );
  return lines.join("\n");
}

/** 注入/更新缩放样式表（单 style 标签，随 delta 重建）。 */
export function installScaleStyles(wsDelta: number): void {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(`style[data-plugin-css="${SCALE_CSS_ID}"]`);
  const css = buildScaleCss(wsDelta);
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
