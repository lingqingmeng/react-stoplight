import { context } from 'esbuild';
import { cpSync, mkdirSync, rmSync, watch } from 'node:fs';
import { resolve } from 'node:path';

const outdir = resolve('dist');
const staticDir = resolve('public');

const refreshStatic = () => {
  rmSync(outdir, { recursive: true, force: true });
  mkdirSync(outdir, { recursive: true });
  cpSync(staticDir, outdir, { recursive: true });
};

refreshStatic();

watch(staticDir, { recursive: true }, () => {
  try {
    refreshStatic();
    console.log('Static assets refreshed.');
  } catch (error) {
    console.error('Failed to refresh static assets:', error);
  }
});

const ctx = await context({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir,
  entryNames: '[name]',
  format: 'esm',
  target: ['es2020'],
  sourcemap: true,
  jsx: 'automatic',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx'
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development')
  }
});

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: outdir,
  port: 5173
});

host = host || 'localhost';

console.log(`Dev server ready at http://${host}:${port}`);

const shutdown = async () => {
  await ctx.dispose();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

