import createStyles from '@mui/styles/createStyles'

export default () =>
  createStyles({
    root: {
      flex: 0,
      boxShadow: 'none',
      order: 1,
      '& &': {
        flex: 1
      },
      // to cover text overflow in the sub-menu items
      maxWidth: '100%'
    },
    bottom: {
      order: 99
    }
  })
