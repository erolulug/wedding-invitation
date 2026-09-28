# Keep the envelope opening visible on mobile and tablet

## Changes
- Size the envelope from both screen width and screen height, so the opened flap and envelope body fit together inside short viewports.
- Reposition the envelope only during the open phases using its own dimensions instead of a fixed viewport offset.
- Preserve the current envelope artwork, timing, invitation content, and desktop presentation.

## Verification
- Run the complete seal-to-invitation sequence at representative phone and tablet dimensions.
- Confirm the opened flap, card, and envelope body remain visible without page scrolling or errors.
