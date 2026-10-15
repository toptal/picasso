---
'@toptal/picasso-typography-overflow': patch
'@toptal/picasso-provider': minor
'@toptal/picasso-utils': minor
---

### TypographyOverflow

- replace the layer that stopped Safari's native tooltip with an empty block after the text, added only when Picasso reports Safari, so links, buttons, text selection and `titleCase` work again in every browser
- remove `disableTooltipGuard`, links and other controls inside no longer need it. Drop the prop where you pass it

### Picasso, PicassoLight

- detect Safari once after mount, mark `<html>` with `data-picasso-safari` and expose it through `useIsSafari`
- add `isSafari` helper

### Utils

- re-export `isSafari`
