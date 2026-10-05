// Tailwind 3's type for a theme. Tailwind 4 has none that a CommonJS entry can
// resolve, so its shape is spelled out here
type CustomThemeConfig = Record<string, unknown>

export const theme: Partial<
  CustomThemeConfig & {
    extend: Partial<CustomThemeConfig>
  }
>
