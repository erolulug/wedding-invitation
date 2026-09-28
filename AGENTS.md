# Project Architecture

- Keep the distributable design system self-contained under `src/design-system/`, with `src/index.ts` as its public barrel, because attached projects receive that source tree as ordinary files.