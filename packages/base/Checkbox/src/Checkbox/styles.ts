// Visual box for `@base-ui/react/checkbox`'s Root `<span>`. Icon geometry stays
// in `em` so the mark scales with the box's `1rem` font-size. The checkmark and
// indeterminate dash are drawn with `::before` / `::after` pseudo-elements,
// driven by Base UI's mutually-exclusive `data-checked` / `data-indeterminate`
// state attributes (a checkbox is never both at once).
export const checkboxClassNames: string[] = [
  'relative box-border inline-block h-4 w-4 rounded-sm border border-solid',
  // `leading-4` pins line-height to 1rem; without it the line box falls back to
  // `normal` and grows the rendered box ~1px (legacy MuiCheckbox.root pinned this).
  'text-[1rem] leading-4',
  'cursor-pointer transition-all duration-350 ease-in-out',

  // Resting state colours
  'data-[unchecked]:bg-white data-[unchecked]:border-gray-500',
  'data-[checked]:bg-blue-500 data-[checked]:border-blue-500 data-[checked]:text-white',
  'data-[indeterminate]:bg-blue-500 data-[indeterminate]:border-blue-500 data-[indeterminate]:text-white',

  // Hover (enabled only — a disabled checkbox keeps its resting border).
  // color-mix replicates the legacy JSS `mix(blue.main, white, 0.16)` from the
  // blue-500 token (84% blue + 16% white = #446AD7).
  // TODO(tokens) [PI-4318]: no canonical token for the hover shade (blue-500
  // mixed 84/16 with white) — derived inline from blue-500 via color-mix.
  '[&[data-unchecked]:not([data-disabled]):hover]:border-gray-600',
  '[&[data-checked]:not([data-disabled]):hover]:bg-[color-mix(in_srgb,theme(colors.blue.500)_84%,white)]',
  '[&[data-checked]:not([data-disabled]):hover]:border-[color-mix(in_srgb,theme(colors.blue.500)_84%,white)]',
  '[&[data-indeterminate]:not([data-disabled]):hover]:bg-[color-mix(in_srgb,theme(colors.blue.500)_84%,white)]',
  '[&[data-indeterminate]:not([data-disabled]):hover]:border-[color-mix(in_srgb,theme(colors.blue.500)_84%,white)]',

  // Focus ring — matches outline(blue.main): 3px blue.main @ 0.48 alpha.
  // `data-[happo-focus]` mirrors the ring for Happo: happo-e2e stamps that
  // attribute on the activeElement at snapshot time, and `:focus-visible`
  // doesn't survive Happo's DOM serialization (the legacy ring was a real
  // class added by MUI's focusVisibleClassName, so it serialized naturally).
  // TODO(tokens) [PI-4318]: no canonical token for the focus-ring colour
  // (blue-500 @ 48% alpha) — derived inline from blue-500 via color-mix.
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',
  'data-[happo-focus]:shadow-[0_0_0_3px_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]',

  // Disabled
  'data-[disabled]:opacity-[0.48] data-[disabled]:cursor-default',

  // Checkmark (checked) — two rotated white bars. The legacy coordinates were
  // measured from the icon's OUTER (border-box) edge: the pseudo-elements lived
  // on a borderless inner div and resolved against the MuiButtonBase root. Here
  // they live on the bordered Root itself, where `absolute` resolves against
  // the padding box (1px inside the border) — hence the `- 1px` compensation.
  "data-[checked]:before:absolute data-[checked]:before:content-[''] data-[checked]:before:top-[calc(0.5em_-_1px)] data-[checked]:before:left-[calc(0.1875em_-_1px)] data-[checked]:before:h-[0.125em] data-[checked]:before:w-[0.1875em] data-[checked]:before:bg-white data-[checked]:before:[transform:rotate(45deg)]",
  "data-[checked]:after:absolute data-[checked]:after:content-[''] data-[checked]:after:top-[calc(0.4375em_-_1px)] data-[checked]:after:left-[calc(0.25em_-_1px)] data-[checked]:after:h-[0.125em] data-[checked]:after:w-[0.5625em] data-[checked]:after:bg-white data-[checked]:after:[transform:rotate(-45deg)]",

  // Indeterminate dash — one centred white bar
  "data-[indeterminate]:before:absolute data-[indeterminate]:before:content-[''] data-[indeterminate]:before:top-1/2 data-[indeterminate]:before:left-1/2 data-[indeterminate]:before:h-[0.125em] data-[indeterminate]:before:w-[0.625em] data-[indeterminate]:before:bg-white data-[indeterminate]:before:[transform:translate(-50%,-50%)]",
]
