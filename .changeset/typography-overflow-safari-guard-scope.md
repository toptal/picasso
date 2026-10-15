---
'@toptal/picasso-typography-overflow': patch
'@toptal/picasso-utils': minor
---

### TypographyOverflow

- render the layer that stops Safari's native tooltip only in desktop Safari, so links, buttons and text selection inside TypographyOverflow work again in other browsers
- keep links and other controls inside above the layer, so they stay clickable in Safari without `disableTooltipGuard` while the text next to them is still covered
- apply `titleCase` to the text again, also when the layer is rendered

### Utils

- add `isSafari` helper
