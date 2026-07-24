---
'@toptal/picasso-dropdown': patch
---

### Dropdown

- `offset` now resolves through the shared static spacing-class table from `@toptal/picasso-utils` (the same table Container's spacing props use): spacing tokens and deprecated size strings become static Tailwind margin classes; deprecated raw numbers stay inline rem styles. Computed margins are unchanged
- fix the inverted responsive-offset cascade: per-breakpoint offset objects emitted their media queries largest-first, so on wide viewports the smallest specified breakpoint won. The bug shipped with the feature; an org-wide audit found zero users of the responsive object form. With Tailwind's mobile-first variants, `offset={{ top: { sm: SPACING_2, lg: SPACING_8 } }}` now correctly applies the `lg` value on `lg`+ screens
- responsive offsets are now correct on SSR first paint — the classes live in the build-time Tailwind CSS, where the previous runtime `<style>` bridge was client-only (reachable in SSR HTML with `keepMounted` + `disablePortal`)
- token/string offsets moved from inline styles to classes, so consumer CSS targeting the popper can now override the offset margins (inline styles previously always won)
- responsive offsets no longer react to `disableMobileBreakpoints()` — they use the fixed Tailwind screens, matching Container's responsive spacing props
