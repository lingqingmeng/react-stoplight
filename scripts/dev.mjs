#!/usr/bin/env node
import { context } from "esbuild";
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const outdir = resolve(projectRoot, "public/assets");
const entryPoints = [resolve(projectRoot, "src/main.tsx")];
const port = Number(process.env.PORT ?? 4173);

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

const ctx = await context({
  entryPoints,
  bundle: true,
  format: "esm",
  sourcemap: true,
  target: "es2018",
  outdir,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
    ".css": "css",
  },
});

await ctx.watch();
console.log("⚡ esbuild watching for changes...");

const httpServerBin = resolve(projectRoot, "node_modules/http-server/bin/http-server.js");
const server = spawn(process.execPath, [httpServerBin, "public", "-c-1", "-p", String(port)], {
  cwd: projectRoot,
  stdio: "inherit",
});

server.on("exit", async (code) => {
  await ctx.dispose();
  if (code !== null) {
    process.exit(code);
  }
});

console.log(`\nServing public/ at http://localhost:${port}\nPress Ctrl+C to stop.`);

const shutdown = async () => {
  await ctx.dispose();
  if (!server.killed) {
    server.kill();
  }
};

process.on("SIGINT", async () => {
  await shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await shutdown();
  process.exit(0);
});

