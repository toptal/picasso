import { Theme, createStyles } from '@material-ui/core/styles'

import { rem } from '../../styles'

const TAG_SELECTOR_GUTTER_SIZE = rem('6px')

export default ({ sizes: { input } }: Theme) =>
  createStyles({
    inputBase: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'auto',
      padding: TAG_SELECTOR_GUTTER_SIZE,
      marginRight: `-${TAG_SELECTOR_GUTTER_SIZE}`,
      marginBottom: `-${TAG_SELECTOR_GUTTER_SIZE}`,
      '& > *': {
        marginRight: TAG_SELECTOR_GUTTER_SIZE,
        marginBottom: TAG_SELECTOR_GUTTER_SIZE
      },
      '& > input': {
        width: 'auto',
        height: rem('24px'),
        paddingLeft: rem('4px'),
        paddingRight: '0',
        fontSize: '0.8125em'
      }
    },
    loaderAdornment: {
      marginRight: input.padding
    }
  })
