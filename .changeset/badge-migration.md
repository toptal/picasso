---
'@toptal/picasso-badge': major
---

### Badge

- Replace the `@mui/base/Badge` wrapper with a plain `<span>` composition (no `@base-ui/react` equivalent — Picasso was already mostly custom; see migration plan v3 §9.9)
- Lift React peer-dependency cap (drop `< 19.0.0`)

## Intentional visual changes

Storybook Happo: clean (all Badge stories byte-identical to master).

Cypress Happo diffs are not Badge regressions — neither component below imports `@toptal/picasso-badge`. The shifts are environmental/render variability triggered by the dependency-graph change (dropping `@mui/base`):

- `PageTopBarMenu / width-1441` — `color-delta: 0.01377`, `ssim: 0.00035`. Sub-perceptual (well under Happo's compare-threshold). PageTopBarMenu composes `Page.TopBar` + `UserBadge`; no `Badge` consumer chain.
- `CategoriesChart / default/with-column-hover` — `color-delta: 0.69023`, `ssim: 0.05961`. Recharts SVG tooltip hover screenshot; the test file already documents existing flakiness ("sometimes the screenshot was taken with mouse over the bar and it triggered tooltip"). CategoriesChart lives under `topkit-analytics-charts` and has no Badge reference anywhere in its module graph.
