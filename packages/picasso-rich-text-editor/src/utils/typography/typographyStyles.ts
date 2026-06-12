// Static Tailwind class map keyed identically to the legacy JSS class names so
// `getTypographyClassName` can keep looking entries up by computed key.
// All body variants share the same look as the legacy MUI body1 variant.
export const typographyStyles: Record<string, string> = {
  // text-* tokens bundle the matching font-size + line-height pairs.
  bodyXxsmall: 'text-graphite-700 font-regular text-2xs',
  bodyXsmall: 'text-graphite-700 font-regular text-xxs',
  bodySmall: 'text-graphite-700 font-regular text-sm',
  bodyMedium: 'text-graphite-700 font-regular text-md',
  bodyLarge: 'text-black font-regular text-lg',
  // No token covers the em-relative inherit variant.
  bodyInherit: 'text-graphite-700 font-regular text-[1em] leading-[1.5em]',

  headingMedium: 'text-black font-semibold text-lg',

  regular: 'font-regular',
  semibold: 'font-semibold',
  inheritWeight: 'font-inherit',

  green: 'text-green-600',
  red: 'text-red-500',
  yellow: 'text-yellow-500',
  lightGrey: 'text-gray-400',
  grey: 'text-gray-500',
  'greyMain-2': 'text-gray-600',
  darkGrey: 'text-graphite-700',
  black: 'text-black',
  lightBlue: 'text-blue-400',
  invert: 'text-white',
  inherit: 'text-inheritColor',
  blue: 'text-blue-500',

  solid: 'underline decoration-solid',
  dashed: 'underline decoration-dashed',
  lineThrough: 'line-through',
}
