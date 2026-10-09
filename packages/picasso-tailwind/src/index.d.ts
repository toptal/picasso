// Typed `any`, as the theme was while this file named Tailwind 3's
// `CustomThemeConfig` without importing it. Tailwind 4 has no theme type that a
// CommonJS entry can resolve
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomThemeConfig = any

export const theme: Partial<
  CustomThemeConfig & {
    extend: Partial<CustomThemeConfig>
  }
>
