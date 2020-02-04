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
        width: 'auto',
        height: rem('24px'),
        paddingLeft: rem('4px'),
        paddingRight: '0',
        fontSize: '0.8125em',
        marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
      }
    },
    withEndAdornment: {
      paddingRight: 'calc(2*0.625em + 1em)'
    },
    endAdornment: {
      position: 'absolute',
      top: 'calc(50% - 0.5em)',
      right: '0.625em',
      height: '1em'
    }
  })
