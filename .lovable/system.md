# Ivory Atelier design system

Ivory Atelier is a tactile, editorial system for formal wedding invitations. It should feel like fine stationery photographed in soft daylight: warm, restrained, personal, and materially believable.

## Core rules

- Use semantic tokens from `theme.css` for every color, spacing, radius, shadow, and transition. Never introduce raw visual values in feature components.
- Keep hierarchy quiet. Display typography may be romantic, but controls and supporting copy remain highly legible.
- Favor paper, ink, embossing, and wax as material cues. Avoid gradients that read as digital glow, glass effects, neon accents, or generic app-card styling.
- Use the exported components before creating one-off controls. Visual choices belong in typed `variant` and `size` props.
- Motion should mimic physical objects: measured perspective, weight, and a clear resting state. Avoid bouncing, looping decoration, or simultaneous movement everywhere.
- Preserve generous negative space and a centered reading rhythm. Use borders sparingly and never nest decorative cards.

## Accessibility

- Interactive controls use semantic elements and remain keyboard reachable.
- Every icon-only or image-like control needs an accessible name.
- Keep a visible focus indicator against both ivory and burgundy surfaces.
- Respect `prefers-reduced-motion`; reveal content without perspective choreography when requested.
- Body copy must remain comfortably readable and controls must keep a practical touch target.

## Component conventions

Components are PascalCase named exports with typed props, forwarded refs where the underlying element supports one, merged `className`, and native props passed through.

```tsx
import { Button } from "@/design-system";

<Button variant="primary" size="md">Confirm attendance</Button>
```

Do not use inline style objects to select a look. Extend the component's fixed variant map and add the needed semantic token instead.
