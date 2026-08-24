/**
 * Host-side installed-font enumeration for the appearance panel.
 *
 * `document.fonts.check()` cannot distinguish missing families (they fall
 * through to a fallback face and report "available"), and the Local Font
 * Access API needs a permission Electron does not grant. So the host runs
 * `system_profiler SPFontsDataType -json` (macOS) once and matches our
 * candidates against the stable English typeface `_name`s, serving the
 * result on a loopback route with a short cache. The panel uses this list
 * to show only fonts actually installed on the machine.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { ServerResponse } from "node:http";
import { CODE_FONT_CANDIDATES, UI_FONT_CANDIDATES } from "./defaults.js";

const execFileAsync = promisify(execFile);

/** 候选 CSS 族名 → system_profiler typeface `_name` 前缀（已验证本机数据）。 */
const MATCHERS: Readonly<Record<string, RegExp>> = {
  "PingFang SC": /^PingFangSC/,
  "Hiragino Sans GB": /^HiraginoSansGB/,
  "Helvetica Neue": /^HelveticaNeue/,
  "Avenir Next": /^AvenirNext/,
  "Gill Sans": /^GillSans/,
  Futura: /^Futura/,
  Optima: /^Optima/,
  Baskerville: /^Baskerville/,
  "Songti SC": /^STSongti-SC/,
  STHeiti: /^STHeiti/,
  "Times New Roman": /^TimesNewRoman/,
  "SF Mono": /^SFMono/,
  Menlo: /^Menlo/,
  Monaco: /^Monaco/,
  "Maple Mono": /^MapleMono/,
  "0xProto Nerd Font Mono": /^0xProtoNFM/,
  "JetBrains Mono": /^JetBrainsMono/,
  "Fira Code": /^FiraCode/,
  "Cascadia Code": /^CascadiaCode/,
  "Courier New": /^CourierNew/,
  "PT Mono": /^PTMono/,
  "Andale Mono": /^AndaleMono/,
  "Google Sans Code": /^GoogleSansCode/,
};

const CACHE_TTL_MS = 10 * 60 * 1000;

let cached: string[] | null = null;
let cachedAt = 0;

/** 枚举本机安装的候选字体（结果缓存 10 分钟；失败返回空数组）。 */
export async function enumerateInstalledFonts(): Promise<string[]> {
  if (cached !== null && Date.now() - cachedAt < CACHE_TTL_MS) return cached;
  const available: string[] = [];
  try {
    const { stdout } = await execFileAsync("system_profiler", ["SPFontsDataType", "-json"], {
      timeout: 30_000,
      maxBuffer: 64 * 1024 * 1024,
    });
    const data = JSON.parse(stdout) as { SPFontsDataType?: { enabled?: string; typefaces?: { _name?: string }[] }[] };
    const faces = new Set<string>();
    for (const item of data.SPFontsDataType ?? []) {
      if (item.enabled !== "yes") continue;
      for (const typeface of item.typefaces ?? []) {
        if (typeof typeface._name === "string") faces.add(typeface._name);
      }
    }
    for (const candidate of [...UI_FONT_CANDIDATES, ...CODE_FONT_CANDIDATES]) {
      const matcher = MATCHERS[candidate];
      if (matcher !== undefined && [...faces].some((name) => matcher.test(name))) available.push(candidate);
    }
  } catch {
    // 枚举失败：返回空，客户端回退为显示全部候选。
  }
  cached = available;
  cachedAt = Date.now();
  return cached;
}

function sendJson(res: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value);
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.setHeader("x-content-type-options", "nosniff");
  res.end(body);
}

export const FONTS_ROUTE = "/api/dsh-codex-theme/fonts";

/** 字体枚举路由的 handler。 */
export async function handleFontsRoute(_req: unknown, res: ServerResponse): Promise<void> {
  sendJson(res, 200, { families: await enumerateInstalledFonts() });
}
