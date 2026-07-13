// Root-node classes for PicassoRootNode. Establishes a border-box island: the
// root is border-box and every descendant (plus their ::before/::after) inherits
// box-sizing from it — kept as the last line of defense for pages that don't
// import the `@toptal/picasso-tailwind/base` reset (the former `reset` opt-out).
// The Picasso font is applied to the whole subtree as a ZERO-SPECIFICITY default
// (`:where(&) *` = 0,0,0): it still beats user-agent fonts (author origin wins),
// but ANY authored font class beats it. The JSS-era `& * { fontFamily }` only
// won by injection order; a plain `[&_*]` font-sans utility (0,1,0) out-sorts
// component font classes in the Tailwind bundle and broke e.g. RichText's
// `[font-family:monospace]` code blocks. (Written un-joined here on purpose —
// Tailwind's extractor scans comments, and the exact class literal would emit
// a dead rule.)
export const root = [
  'flex-1',
  'box-border',
  '[:where(&)_*]:font-sans',
  '[&_*]:[box-sizing:inherit]',
  '[&_*::before]:[box-sizing:inherit]',
  '[&_*::after]:[box-sizing:inherit]',
].join(' ')
