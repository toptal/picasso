export default {
  root: {
    display: 'inline-block',

    '& Button': {
      margin: '0',
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
}
