import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    toggleText: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.5rem'
    },
    textWrapper: {
      marginRight: rem('8px'),
      fontWeight: 'normal'
    },
    iconWrapper: {
      lineHeight: 0,
      transform: 'rotate(90deg)'
    },
    icon: {
      color: palette.grey.dark
    },
    expandedIcon: {
      transform: 'rotate(180deg)'
    }
  })
