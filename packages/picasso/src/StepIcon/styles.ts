import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStepIcon: {
    styleOverrides: {
      text: {
        display: 'none',
      },
    },
  },
}))

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      height: '1.5em',
      width: '1.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${sizes.borderWidth} solid ${palette.grey.main}`,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: palette.common.white,
    },
    active: {
      border: 'none',
      backgroundColor: palette.blue.main,
    },
    completed: {
      border: 'none',
      backgroundColor: palette.common.white,
      color: palette.green.dark,
    },
  })
