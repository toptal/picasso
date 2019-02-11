export default {
  root: {
    display: 'inline-block',

    '& $button + $button': {
      margin: '0'
    }
  },
  button: {
    '&:first-child': {
      borderTopRightRadius: 'unset',
      borderBottomRightRadius: 'unset',
      borderRight: 'none'
    },
    '&:last-child': {
      borderTopLeftRadius: 'unset',
      borderBottomLeftRadius: 'unset'
    },
    '&:not(:first-child):not(:last-child)': {
      borderRadius: 'unset',
      borderRight: 'none'
    }
  }
}
