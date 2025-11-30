#!/usr/bin/env node
import { build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist");
const publicDir = resolve(projectRoot, "public");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

await build({
  entryPoints: [resolve(projectRoot, "src/main.tsx")],
  bundle: true,
  format: "esm",
  minify: true,
  sourcemap: true,
  target: "es2018",
  outdir: resolve(distDir, "assets"),
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
    ".css": "css",
  },
});

console.log("✅ Build complete. Files emitted to dist/");

