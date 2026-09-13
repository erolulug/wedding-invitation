# Refine the wedding invitation envelope

## Goal
Replace the current envelope intro with a close visual match to the reference: a tall ivory paper envelope, delicate embossed botanical decoration, realistic fold lines, and a deep burgundy wax seal centered over the closure.

## Implementation
- Recreate the existing invitation from the GitHub repository in this project while preserving its names, date, languages, countdown, music control, invitation sections, and RSVP behavior.
- Redesign the closed envelope with a narrower portrait proportion, softly textured ivory paper, subtle depth and shadows, four balanced embossed floral sprays, and understated “tap to open” lettering.
- Refine the wax seal with an irregular pressed edge, layered highlights and shadows, a burgundy lacquer finish, and the existing couple monogram in warm gold.
- Replace the current glow-and-dissolve effect with a restrained physical sequence: seal responds to the tap, the flap lifts in perspective, the invitation card rises smoothly, then the envelope screen fades into the invitation.
- Support mouse, touch, keyboard activation, reduced-motion preferences, and narrow mobile screens without changing the rest of the invitation flow.
- Use the screenshot only as a visual reference; it will not be embedded in the finished page.

## Verification
- Check the closed envelope and full opening sequence in desktop and mobile previews.
- Confirm the seal remains easy to activate, the animation does not clip or shift the layout, and the invitation remains usable afterward.
- Confirm the project builds cleanly with no browser errors.

## Technical notes
The current repository builds the envelope from HTML layers, CSS clip paths, inline floral SVG, and JavaScript timing. The replacement will keep that lightweight approach while improving the geometry, material treatment, perspective transforms, and animation choreography.
