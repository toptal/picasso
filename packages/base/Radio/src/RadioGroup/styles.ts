import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    gridItem: {
      lineHeight: 1,

      '&&': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  })
