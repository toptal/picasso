import muiShadows, { Shadows } from '@material-ui/core/styles/shadows'

const shadows: Shadows = [
  ...[
    'none',

    /** notification center, paper */
    '0 0 8px 0 rgba(0,0,0, 0.08)',

    /** modal */
    '0 4px 8px 0 rgba(0,0,0, 0.08)',

    /** nofication growl */
    '0 0 0 1px rgba(0, 0, 0, 0.04), 0 0 8px 0 rgba(0, 0, 0, 0.16)',

    /** tooltip */
    '0 0 4px 0 rgba(0,0,0, 0.24), 0 0 32px 0 rgba(0,0,0, 0.12)',

    /** dropdown menu */
    `0px 0px 0px 1px rgba(0, 0, 0, 0.04),
     0px 8px 12px -3px rgba(0, 0, 0, 0.08),
     0px 4px 8px -2px rgba(0, 0, 0, 0.04)`
  ],
  ...muiShadows.slice(5)
] as Shadows

export default shadows
