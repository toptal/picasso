export const createRootClassNames = (): string[] => [
  'flex flex-col h-full bg-gray-50',
  '[&>footer]:flex-[0] [&>header]:flex-[0]',
  '[&>header+*]:mt-[var(--header-height)]',
]

// Page layout is driven by CSS custom properties, defaulted here on the root.
// Consumers override them per page via `className` (which wins by the cascade),
// e.g. `<Page className="[--content-width:80em]">`:
//   --content-width               max width of default-width content (75em)
//   --content-width-wide          max width when `<Page width="wide">` (90em)
//   --content-padding-horizontal  content side padding (1em, 2em from `md` up)
//   --header-height               Page.TopBar height (3.5rem)
export const createRootVariableClassNames = (): string[] => [
  '[--content-padding-horizontal:1em] md:[--content-padding-horizontal:2em]',
  '[--header-height:3.5rem] [--content-width-wide:90em] [--content-width:75em]',
]

// 768px = the `md` breakpoint: <Picasso responsive={false} /> pins the layout
// to tablet width instead of letting it shrink further
export const createRootMinWidthClassNames = (responsive?: boolean): string[] =>
  responsive === false ? ['min-w-[768px]'] : []
