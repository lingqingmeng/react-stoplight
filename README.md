# React Stoplight

Minimal React + TypeScript scaffold built from scratch with esbuild.

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` launches esbuild in watch mode and serves `public/` via `http-server`.
- `npm run build` copies `public/` into `dist/` and creates a production bundle with esbuild.
- `npm run typecheck` runs the TypeScript compiler without emitting files.

## Project structure

- `public/` holds the HTML shell served both in dev and production.
- `src/` contains the React application (`main.tsx`, `App.tsx`, and styles).
- `dist/` is generated on build and should not be committed.
- `scripts/` includes the tiny dev/build drivers that call esbuild.
