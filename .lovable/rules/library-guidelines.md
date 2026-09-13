# Gentle Library — Guidelines

## Components

The design system exports these components — import them from `@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7` and compose them before building anything from scratch:

`Button`, `EnvelopeIntro`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7/design-system/styles/theme.css` (source — preferred import)
- `@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

