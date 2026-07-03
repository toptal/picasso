interface RootStylesProps {
  disabled: boolean
  withLabel: boolean
}

export const createRootClassNames = ({
  disabled,
  withLabel,
}: RootStylesProps): string[] => [
  'group relative inline-flex shrink-0 items-start justify-center',
  'box-border h-[1rem] w-[1rem] p-0 text-[1rem]',
  'mx-0 my-[0.25rem]',
  'select-none align-middle',
  'transition-all duration-350 ease-in-out',
  disabled
    ? 'pointer-events-none cursor-default opacity-[0.48]'
    : 'cursor-pointer',
  ...(withLabel ? ['mr-[0.5rem]'] : []),
]

export const createInputClassNames = (): string[] => [
  'peer absolute left-0 top-0 z-[1] m-0 h-full w-full',
  'cursor-[inherit] p-0 opacity-0',
]

// The outer circle (`before`) and the inner dot (`after`) are absolutely
// positioned pseudo-elements; they resolve their size/position against the
// root span (the nearest positioned ancestor), not the zero-size icon span.
//
// The focus ring is driven by the root's `data-focused` attribute (set from
// React on :focus-visible) instead of a CSS pseudo-class: Cypress-Happo
// re-renders a serialized DOM where live pseudo-class state is lost, so the
// ring must survive as a DOM attribute.
const ICON_BASE = [
  'pointer-events-none',
  'transition-all duration-350 ease-in-out',
  "before:content-[''] before:pointer-events-none before:absolute",
  'before:left-1/2 before:top-1/2 before:h-full before:w-full',
  'before:[transform:translate(-50%,-50%)]',
  'before:rounded-full before:border before:border-solid',
  'before:transition-[border-color] before:duration-350 before:ease-in-out',
  // inner dot: zero-size box drawn by its own 2px border + background
  "after:content-[''] after:pointer-events-none after:absolute",
  'after:left-1/2 after:top-1/2',
  'after:[transform:translate(-50%,-50%)]',
  'after:rounded-full after:border-2 after:border-solid',
  'after:border-current after:bg-current',
  'after:transition-all after:duration-350 after:ease-in-out',
  // keyboard focus ring, mirrors shared `outline()` helper:
  // blue-500 at 48% alpha, derived via color-mix (no frozen rgba)
  'group-data-[focused]:before:shadow-[0_0_0_3px_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
]

// When `checked` is controlled (boolean), visibility is driven by React so
// the visual matches the React state even if the browser's native radio
// name-exclusivity unchecks the input (duplicate group names on one page).
// Only the uncontrolled case relies on the live `:checked` state via `peer`.
export const createUncheckedIconClassNames = (checked?: boolean): string[] => [
  ...ICON_BASE,
  checked === undefined ? 'peer-checked:hidden' : checked ? 'hidden' : '',
  'text-gray-500',
  'before:border-gray-500 before:bg-white',
  'after:opacity-0',
  'group-hover:before:border-gray-600',
]

export const createCheckedIconClassNames = (checked?: boolean): string[] => [
  ...ICON_BASE,
  checked === undefined ? 'hidden peer-checked:block' : checked ? '' : 'hidden',
  'text-white',
  'before:border-blue-500 before:bg-blue-500',
  'after:opacity-100',
  // hover tint: 16% white mixed into blue-500 (= #446AD7), token-derived
  'group-hover:before:border-[color-mix(in_srgb,theme(colors.white)_16%,theme(colors.blue.500))]',
  'group-hover:before:bg-[color-mix(in_srgb,theme(colors.white)_16%,theme(colors.blue.500))]',
]
