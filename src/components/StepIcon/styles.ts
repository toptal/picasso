import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiStepIcon: {
    text: {
      display: 'none'
    }
  }
}))

export default ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      height: '1.5em',
      width: '1.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${spacing.borderWidth} solid ${palette.grey.main}`,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: palette.common.white
    },
    active: {
      border: 'none',
      backgroundColor: palette.blue.main
    },
    completed: {
      border: 'none',
      backgroundColor: palette.green.main
    }
  })
