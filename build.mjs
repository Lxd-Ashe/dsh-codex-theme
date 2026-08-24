/**
 * Build for dsh-codex-theme: single-file client + host bundles.
 *
 * The web server serves one file per client plugin, so the client half is one
 * CJS bundle wrapped in the ModuleLoader factory handshake (react + the dsh
 * module table stay external — the harness provides them); the host half is
 * plain ESM for Node with schemastery bundled in (the Loader validates the
 * registered settings schema against it).
 */
import { build } from "esbuild";
import { mkdirSync } from "node:fs";

mkdirSync("lib", { recursive: true });

const dshExternal = ["@deepseek-ai/cordis", "@deepseek-ai/dsh-*"];

await build({
  entryPoints: ["src/index.ts"],
  outfile: "lib/index.js",
  bundle: true,
  format: "esm",
  platform: "node",
  target: ["node22"],
  external: dshExternal,
  logLevel: "info",
});

await build({
  entryPoints: ["src/client/index.ts"],
  outfile: "lib/client.js",
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: ["es2022"],
  jsx: "automatic",
  external: [
    ...dshExternal,
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "scheduler",
  ],
  loader: { ".css": "text" },
  banner: {
    js: "window.__ModuleLoader__.load({ id: 'dsh-codex-theme', factory: (require) => { var module = { exports: {} }; var exports = module.exports;",
  },
  footer: {
    js: "return module.exports; } });",
  },
  logLevel: "info",
});
