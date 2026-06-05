// Visual box for `@base-ui/react/checkbox`'s Root `<span>`. Icon geometry stays
// in `em` so the mark scales with the box's `1rem` font-size. The checkmark and
// indeterminate dash are drawn with `::before` / `::after` pseudo-elements,
// driven by Base UI's mutually-exclusive `data-checked` / `data-indeterminate`
// state attributes (a checkbox is never both at once).
export const checkboxClassNames: string[] = [
  'relative box-border inline-block h-4 w-4 rounded-sm border border-solid',
  'text-[1rem]',
  'cursor-pointer transition-all duration-350 ease-in-out',

  // Resting state colours
  'data-[unchecked]:bg-white data-[unchecked]:border-gray-500',
  'data-[checked]:bg-blue-500 data-[checked]:border-blue-500 data-[checked]:text-white',
  'data-[indeterminate]:bg-blue-500 data-[indeterminate]:border-blue-500 data-[indeterminate]:text-white',

  // Hover (enabled only — a disabled checkbox keeps its resting border)
  '[&[data-unchecked]:not([data-disabled]):hover]:border-gray-600',
  '[&[data-checked]:not([data-disabled]):hover]:bg-[#446AD7]', // TODO(tokens): mix(blue.main, white, 0.16)
  '[&[data-checked]:not([data-disabled]):hover]:border-[#446AD7]', // TODO(tokens): mix(blue.main, white, 0.16)
  '[&[data-indeterminate]:not([data-disabled]):hover]:bg-[#446AD7]', // TODO(tokens): mix(blue.main, white, 0.16)
  '[&[data-indeterminate]:not([data-disabled]):hover]:border-[#446AD7]', // TODO(tokens): mix(blue.main, white, 0.16)

  // Focus ring — matches outline(blue.main): 3px blue.main @ 0.48 alpha
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]',

  // Disabled
  'data-[disabled]:opacity-[0.48] data-[disabled]:cursor-default',

  // Checkmark (checked) — two rotated white bars
  "data-[checked]:before:absolute data-[checked]:before:content-[''] data-[checked]:before:top-[0.5em] data-[checked]:before:left-[0.1875em] data-[checked]:before:h-[0.125em] data-[checked]:before:w-[0.1875em] data-[checked]:before:bg-white data-[checked]:before:[transform:rotate(45deg)]",
  "data-[checked]:after:absolute data-[checked]:after:content-[''] data-[checked]:after:top-[0.4375em] data-[checked]:after:left-[0.25em] data-[checked]:after:h-[0.125em] data-[checked]:after:w-[0.5625em] data-[checked]:after:bg-white data-[checked]:after:[transform:rotate(-45deg)]",

  // Indeterminate dash — one centred white bar
  "data-[indeterminate]:before:absolute data-[indeterminate]:before:content-[''] data-[indeterminate]:before:top-1/2 data-[indeterminate]:before:left-1/2 data-[indeterminate]:before:h-[0.125em] data-[indeterminate]:before:w-[0.625em] data-[indeterminate]:before:bg-white data-[indeterminate]:before:[transform:translate(-50%,-50%)]",
]
