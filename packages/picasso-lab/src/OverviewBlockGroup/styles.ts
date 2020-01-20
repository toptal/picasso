import { createStyles, Theme } from '@material-ui/core/styles'
import { spacingToRem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      '& > *': {
        flex: '1 0'
      },
      '& > $block + $block': {
        paddingLeft: spacingToRem('medium'),
        borderLeft: `1px solid ${palette.grey.lighter}`
      }
    },
    block: {}
  })
