import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    counter: {
      position: 'absolute',
      bottom: 0,
      left: '0.8em',
      color: palette.grey.main2,
      fontSize: '0.625em',
      width: 'calc(100% - 2.6em)',
      display: 'grid',
      zIndex: 0,
      backgroundColor: 'white',
      height: '1.9em',
      lineHeight: '1.9em',

      '&::before': {
        content: '""',
        width: 'calc(100% + 0.7em)',
        height: '1px',
        display: 'inline-block',
        background: palette.grey.lighter2
      }
    },

    counterError: {
      color: palette.red.main
    }
  })
