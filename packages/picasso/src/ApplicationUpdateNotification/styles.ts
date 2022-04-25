import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

export default ({ palette, sizes, shadows }: Theme) =>
  createStyles({
    root: {
      borderRadius: sizes.borderRadius.medium,
      backgroundColor: palette.blue.dark,
      boxShadow: shadows[3],
      width: '27.5em',
      color: palette.common.white,
      overflow: 'hidden',
      padding: '1.5em'
    },
    message: {
      padding: 0,
      flexDirection: 'column'
    },
    icon: {
      opacity: 0.4,
      position: 'absolute',
      top: '-0.4em',
      left: '-0.5em',
      fill: palette.blue.darker
    },
    positionRelative: {
      position: 'relative'
    }
  })
