import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    button: {
      '&+&': {
        marginLeft: '0.5em',
      },
    },
    ellipsis: {
      padding: '0 0.5em',
      cursor: 'default',
    },
  })
