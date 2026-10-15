---
'@toptal/picasso-typography-overflow': patch
'@toptal/picasso-utils': minor
---

### TypographyOverflow

- replace the layer that stopped Safari's native tooltip with an empty block after the text, added only in Safari, so links, buttons, text selection and `titleCase` work again in every browser
- deprecate `disableTooltipGuard`, it has no effect now

### Utils

- add `isSafari` helper
