import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { rem } from '../styles'

PicassoProvider.override(() => ({
  MuiStepLabel: {
    label: {
      '&$active': {
        display: 'block'
      }
    },
    iconContainer: {
      paddingRight: 0
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    hidden: {
      display: 'none'
    },
    root: {
      marginLeft: '0.5em'
    },
    label: {
      fontSize: rem('11px'),
      fontWeight: 600,
      lineHeight: '1em',
      color: palette.grey.dark
    }
  })
