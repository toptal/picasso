import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    popper: {
      '&[x-placement*="top-start"]': {
        left: '-8px !important'
      },
      '&[x-placement*="top-end"]': {
        left: '8px !important'
      }
    }
  })
