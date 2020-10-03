import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export const TAG_SELECTOR_INPUT_GUTTER_SIZE = rem('6px')
const END_ADORNMENT_PADDING = '0.625em'
const END_ADORNMENT_HEIGHT = '1em'

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
        width: '0',
        height: rem('24px'),
        paddingLeft: rem('4px'),
        paddingRight: '0',
        marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
      }
    },
    withEndAdornment: {
      paddingRight: `calc(2*${END_ADORNMENT_PADDING} + ${END_ADORNMENT_HEIGHT})`
    },
    endAdornment: {
      position: 'absolute',
      top: `calc(50% - 0.5 * ${END_ADORNMENT_HEIGHT})`,
      right: '0.625em',
      height: END_ADORNMENT_HEIGHT
    }
  })
