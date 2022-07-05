import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    root: {
      fontSize: '1rem',

      '& + &': {
        marginTop: '1em',
      },
      '& $error + $hint': {
        marginTop: 0,
      },
    },

    hint: {},

    error: {},
  })
