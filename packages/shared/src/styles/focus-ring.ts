// The keyboard focus ring per state: whole class names, so Tailwind finds
// them, and one shadow class each, so `twMerge` lets one ring replace another
// TODO: [PI-4318] no canonical token for the focus ring
export const FOCUS_RING = {
  blue: {
    /** For a component's `focused` prop */
    focused:
      'shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
    focusVisible:
      'focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
    focusWithin:
      'focus-within:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
    /** On an element that shows the focus of a hidden control inside it */
    hasFocusVisible:
      'has-focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
    dataFocused:
      'data-focused:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
  },
  white: {
    /** For a component's `focused` prop */
    focused:
      'shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.white)_48%,transparent)]',
    focusVisible:
      'focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.white)_48%,transparent)]',
  },
} as const

// Inside the element, for one that its container clips, such as a menu item
export const INSET_FOCUS_RING = {
  blue: {
    focusVisible:
      'focus-visible:inset-shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
  },
  white: {
    focusVisible:
      'focus-visible:inset-shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.white)_48%,transparent)]',
  },
} as const
