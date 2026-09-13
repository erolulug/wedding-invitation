# Components

Component catalog for **Gentle Library**. Import all components from `@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7`.

### Button

```ts
import { Button } from "@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7"
```

Use for clear invitation actions and compact controls.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `variant` | primary · quiet · seal | `primary` |
| `size` | sm · md · icon | `md` |

**Examples:**

_RSVP action_
```tsx
<Button variant="primary">RSVP</Button>
```

**Avoid:**

- Do not use a raw button when a Button variant fits.

### EnvelopeIntro

```ts
import { EnvelopeIntro } from "@ws-fcd2c4ace465d2199110/aaaca736-8e62-4c8b-88cd-045178321fe7"
```

Use as the ceremonial opening screen for a digital invitation.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `monogram` | string | `—` |
| `date` | string | `—` |
| `prompt` | string | `—` |
| `onOpened` | function | `—` |

**Examples:**

_Invitation opening_
```tsx
<EnvelopeIntro monogram="J & A" date="20 June 2027" prompt="Tap the seal to open" />
```

**Avoid:**

- Do not place the envelope inside another card or trigger it automatically.

