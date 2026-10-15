---
'@toptal/picasso-typography-overflow': patch
---

### TypographyOverflow

- replace the layer that stopped Safari's native tooltip with an empty block after the text, added only in Safari, so links, buttons, text selection and `titleCase` work again in every browser
- remove `disableTooltipGuard`, links and other controls inside no longer need it. Drop the prop where you pass it
