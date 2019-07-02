import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette, spacing: { input, inputIcon } }: Theme) =>
  createStyles({
    root: {
      height: input.height,
      width: input.width,
      cursor: 'default',
      padding: `${input.padding} 0.375em`
    },
    input: {
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: 0,
      border: 'none'
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
    adornment: {
      color: palette.grey.dark,
      fontSize: '1em',
      minWidth: inputIcon.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    adornmentStart: {
      marginRight: '0.25em'
    },
    adornmentEnd: {
      marginLeft: '0.5em',
      justifyContent: 'flex-end',
      flexGrow: 1
    },
    adornmentDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    loader: {
      marginRight: '0.25em'
    },
    upload: {
      margin: '0 0.25em'
    }
  })
