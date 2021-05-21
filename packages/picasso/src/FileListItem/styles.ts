import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingTop: rem('5px'),
      paddingBottom: rem('5px')
    },
    label: {
      lineHeight: rem('22px')
    },
    error: {
      lineHeight: rem('16px')
    }
  })
