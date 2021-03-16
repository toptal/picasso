import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette, sizes: { input } }: Theme) =>
  createStyles({
    root: {
      cursor: 'default',
      padding: `${input.padding} 0.375em`
    },
    input: {
      padding: 0
    },
    inputValue: {
      fontSize: '0.8125em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: palette.grey.dark
    },
    inputValueDisabled: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      color: alpha(palette.grey.dark!, 0.48)
    },
    inputValueSelected: {
      color: palette.common.black
    },
    nativeInput: {
      display: 'none'
    },
    button: {
      marginLeft: '0.5em'
    },
    adornmentStart: {
      marginLeft: '0.25em'
    },
    loader: {
      marginRight: '0.25em'
    }
  })
