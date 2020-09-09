import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ typography }: Theme) => ({
  MuiAccordionSummary: {
    root: {
      fontSize: '1em',
      padding: '0.5625em 0 0.5625em',
      fontWeight: typography.fontWeights.semibold,
      minHeight: 'auto',
      '&$expanded': {
        minHeight: 'auto'
      },
      '&$disabled': {
        opacity: 1
      }
    },
    expandIcon: {
      margin: 0,
      padding: 0,

      '&$expanded': {
        transform: 'rotate(180deg)'
      }
    },
    content: {
      fontSize: '0.875em',
      margin: 0,
      '&$expanded': {
        margin: '0'
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {},
    content: {}
  })
