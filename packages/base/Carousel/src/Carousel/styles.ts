import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      '& .glider-slide': {
        minWidth: '100px',
      },
    },
    // important for gradient component to be on top of carousel
    container: { position: 'relative' },
  })
