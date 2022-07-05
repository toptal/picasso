import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    grid: {
      marginTop: 0,
      marginBottom: 0,
    },

    gridItem: {
      lineHeight: 1,

      '&&': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  })
