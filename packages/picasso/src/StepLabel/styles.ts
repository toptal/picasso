import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStepLabel: {
    label: {
      display: 'flex',

      '&$active': {
        display: 'flex'
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
