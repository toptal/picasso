import muiShadows, { Shadows } from '@material-ui/core/styles/shadows'

const shadows: Shadows = [
  ...[
    'none',
    '0 0 2px 0 rgba(0,0,0, 0.08)',
    '0 4px 8px 0 rgba(0,0,0, 0.08)',
    '0 4px 8px 0 rgba(0,0,0, 0.16)',
    '0 8px 16px 0 rgba(0,0,0, 0.32)'
  ],
  ...muiShadows.slice(5)
] as Shadows

export default shadows
