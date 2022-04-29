import { createTheme } from '@mui/material/styles'
import { Shadows } from '@mui/material/styles/shadows'

const muiShadows = createTheme().shadows
const shadows = [
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

    /** scroll menu */
    '0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 12px -3px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)'
  ],
  ...muiShadows.slice(6)
] as Shadows

export default shadows
