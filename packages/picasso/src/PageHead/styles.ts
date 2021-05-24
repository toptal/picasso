import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',

      // underline effect for the container
      '&::after': {
        position: 'absolute',
        content: '""',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: palette.grey.lighter2,
        zIndex: 0
      }
    },
    rightPadding: {
      paddingRight: '2rem'
    },
    main: {
      height: '3.375em'
    }
  })
