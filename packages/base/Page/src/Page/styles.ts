export const createRootClassNames = (): string[] => [
  'flex flex-col h-full bg-gray-50',
  '[&>footer]:flex-[0] [&>header]:flex-[0]',
  '[&>header+*]:mt-[var(--header-height)]',
  '[--content-padding-horizontal:1em] md:[--content-padding-horizontal:2em]',
  '[--header-height:3.5rem] [--content-width-wide:90em] [--content-width:75em]',
]
