import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `1px solid ${palette.grey.light2}`
    },
    fileListItem: {
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingTop: rem('4px'),
      paddingBottom: rem('4px')
    }
  })
