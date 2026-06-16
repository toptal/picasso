---
'@toptal/picasso-charts': major
---

### LineChart

- Re-implement styling without `@material-ui/core` + JSS; behavioral and visual parity preserved. The bottom-Y-axis-label rule now lives in `LineChart`'s self-contained `<style>` block, scoped to a per-instance marker class, replacing the `makeStyles`/`createStyles` JSS hook.
- **Breaking**: remove `@material-ui/core` from `peerDependencies` — `@toptal/picasso-charts` no longer requires consumers to install MUI v4. The styles are no longer registered as a themeable MUI hook (`makeStyles(…, { name: 'LineChart' })`), so any `PicassoProvider.override`/MUI-theme override targeting `LineChart` no longer applies.
- Widen the `react` peer range to `>=16.12.0` (drop the `<19.0.0` upper bound).
