import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      paddingLeft: '2rem',
      position: 'relative',

      // underline effect for the container
      '&::after': {
        position: 'absolute',
        content: '""',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: palette.grey.main,
        zIndex: 0
      }
    },
    rightPadding: {
      paddingRight: '2rem'
    },
    main: {
      padding: '1rem 0'
    }
  })
