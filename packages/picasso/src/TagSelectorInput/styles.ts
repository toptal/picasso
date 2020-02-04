import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export const TAG_SELECTOR_INPUT_GUTTER_SIZE = rem('6px')

export default () =>
  createStyles({
    inputBase: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'auto',
      paddingBottom: 0,
      paddingLeft: TAG_SELECTOR_INPUT_GUTTER_SIZE,
      paddingTop: TAG_SELECTOR_INPUT_GUTTER_SIZE,

      '& > input': {
        flexGrow: 1,
        minWidth: '2.5rem',
        width: 0,
        height: rem('24px'),
        paddingLeft: rem('4px'),
        paddingRight: '0',
        fontSize: '0.8125em',
        marginRight: rem('24px'),
        marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
      }
    },
    endAdornment: {
      position: 'absolute',
      right: '0.5rem',
      bottom: '0.75rem',
      marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
    }
  })
