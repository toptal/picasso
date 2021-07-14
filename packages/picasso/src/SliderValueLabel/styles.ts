import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    popper: {
      '&[x-placement*="top-start"], &[x-placement*="bottom-start"]': {
        left: '-8px !important'
      },
      '&[x-placement*="top-end"], &[x-placement*="bottom-end"]': {
        left: '8px !important'
      }
    }
  })
