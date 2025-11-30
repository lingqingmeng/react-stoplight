import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const outdir = resolve('dist');
const staticDir = resolve('public');

const refreshStatic = () => {
  rmSync(outdir, { recursive: true, force: true });
  mkdirSync(outdir, { recursive: true });
  cpSync(staticDir, outdir, { recursive: true });
};

refreshStatic();

await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir,
  entryNames: '[name]',
  format: 'esm',
  target: ['es2020'],
  minify: true,
  sourcemap: false,
  jsx: 'automatic',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx'
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});

console.log('Build complete ➜ dist/');

