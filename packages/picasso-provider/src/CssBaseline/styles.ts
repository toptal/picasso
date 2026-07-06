/**
 * Global CSS reset, migrated verbatim from the former MUI v4 JSS `@global`
 * stylesheet. CssBaseline injects this at runtime as an intentionally
 * UNLAYERED `<style>` element, which preserves the pre-migration cascade
 * precedence (an `@layer base` block would demote it below unlayered consumer
 * CSS) and keeps the reset gated by the provider's `reset` prop with zero
 * consumer CSS-entrypoint changes.
 *
 * Deliberate parity choices:
 * - `box-sizing: initial` is kept as-is (existing-violations carve-out — see
 *   docs/migration/references/design-patterns-addendum.md); un-migrated
 *   components still depend on the content-box cascade this establishes.
 * - `palette.common.white` is inlined as its computed value `#fff`.
 *
 * TODO: [PF-2221] promote to a true Tailwind `@layer base` preflight once
 * consumer Tailwind entrypoints are coordinated (provider migration brief).
 */
export const CSS_BASELINE = `html {
  box-sizing: initial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  background-color: #fff;
}
@media print {
  body {
    background-color: #fff;
  }
}
#root {
  display: flex;
  flex: 1;
}
`
