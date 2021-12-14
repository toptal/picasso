import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    iconWrapper: {
      marginRight: '0.75rem',
      marginTop: rem('-1px'),
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    sectionHeaderRow: {
      minHeight: '2.5rem',
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
      borderTop: `${sizes.borderWidth} solid ${palette.grey.lighter2}`
    }
  })
