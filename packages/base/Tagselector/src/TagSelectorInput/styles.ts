import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { highlightStyles as highlightAutofillStyles } from '@toptal/picasso-input'

export const TAG_SELECTOR_INPUT_GUTTER_SIZE = rem('4px')
const END_ADORNMENT_PADDING = '0.625em'
const END_ADORNMENT_HEIGHT = '1em'

export default (theme: Theme) =>
  createStyles({
    inputBase: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'auto',
      paddingBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE,
      paddingLeft: TAG_SELECTOR_INPUT_GUTTER_SIZE,
      paddingTop: TAG_SELECTOR_INPUT_GUTTER_SIZE,
      cursor: 'pointer',

      '& > input': {
        minWidth: '3em',
        flexGrow: 1,
        width: 0,
        height: rem('24px'),
        paddingLeft: rem('4px'),
        paddingRight: 0,
        marginBottom: 0,
      },
    },
    ...highlightAutofillStyles(theme),
    withEndAdornment: {
      paddingRight: `calc(2*${END_ADORNMENT_PADDING} + ${END_ADORNMENT_HEIGHT})`,
    },
    endAdornment: {
      position: 'absolute',
      top: `calc(50% - 0.5 * ${END_ADORNMENT_HEIGHT})`,
      right: '0.625em',
      height: END_ADORNMENT_HEIGHT,
    },
    horizontalLayout: {
      width: '100%',
    },
  })
