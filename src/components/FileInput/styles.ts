import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

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
      color: alpha(palette.grey.dark!, 0.48)
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
