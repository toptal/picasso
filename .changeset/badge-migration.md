---
'@toptal/picasso-badge': major
---

### Badge

- Replace the `@mui/base/Badge` wrapper with a plain `<span>` composition (no `@base-ui/react` equivalent — Picasso was already mostly custom; see migration plan v3 §9.9)
- Lift React peer-dependency cap (drop `< 19.0.0`)

## Intentional visual changes

- Storybook Happo: clean. Cypress Happo: 1 sub-perceptual diff at `PageTopBarMenu / width-1441` (`color-delta: 0.01377`, `ssim: 0.00035`) attributable to CSS bundle-order shift after dropping `@mui/base`; PageTopBarMenu does not render Picasso `Badge`, so this is a side-effect of the dependency removal, not a Badge regression.
