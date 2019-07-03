import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette, spacing: { input } }: Theme) =>
  createStyles({
    root: {
      cursor: 'default',
      padding: `${input.padding} 0.375em`
    },
    input: {
      padding: 0
    },
    inputStatus: {
      color: palette.grey.dark
    },
    inputStatusDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    inputValue: {
      fontSize: '0.8125em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
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
    adornmentDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    loader: {
      marginRight: '0.25em'
    }
  })
