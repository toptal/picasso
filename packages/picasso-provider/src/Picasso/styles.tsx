// Root-node classes for PicassoRootNode. Establishes a border-box island: the
// root is border-box and every descendant (plus their ::before/::after) inherits
// box-sizing from it — preserved even when the global reset is off (reset={false}).
// The Picasso font is forced onto the whole subtree (was `& * { fontFamily }`;
// `font-sans` resolves to the former `typography.fontFamily` proxima-nova stack).
export const root = [
  'flex-1',
  'box-border',
  '[&_*]:font-sans',
  '[&_*]:[box-sizing:inherit]',
  '[&_*::before]:[box-sizing:inherit]',
  '[&_*::after]:[box-sizing:inherit]',
].join(' ')
