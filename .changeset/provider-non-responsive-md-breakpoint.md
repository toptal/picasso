---
'@toptal/picasso-provider': minor
---

### Picasso, PicassoLight

- fix `useBreakpoint` reporting `false` for `md` at every viewport width under
  `responsive={false}`. `disableMobileBreakpoints()` blanks the `xs`/`sm`/`md`
  media queries but left `lg` starting at 1024px, so nothing matched between
  768px and 1023.98px and desktop-gated UI keyed off `md` —
  `useBreakpoint(['md', 'lg', 'xl'])` — rendered its mobile branch on desktop.
  `lg` now widens to `(max-width: 1439.98px)`, the desktop floor: desktop
  checks hold at every width, compact checks
  (`useBreakpoint(['xs', 'sm', 'md'])`) keep returning `false`. The default
  `responsive` path is unaffected

### FixViewport

- add `responsive` prop (`<Picasso>` passes it through); when `false` it pins
  the layout viewport to `width=768` instead of `width=device-width`, so mobile
  browsers evaluate CSS media queries (Tailwind's static `md:` variants
  included) at the width the JS breakpoints assume. Zoom stays enabled in this
  mode (WCAG 1.4.4); desktop browsers ignore `width`

### PicassoBreakpoints

- add `reset()` to restore the responsive defaults —
  `disableMobileBreakpoints()` is process-wide and one-way, so call `reset()`
  in an `afterEach` to keep `responsive={false}` tests from leaking
