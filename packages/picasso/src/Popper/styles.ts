import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ zIndex, screens }: Theme) =>
  createStyles({
    root: {
      zIndex: zIndex.modal,
      [screens('small', 'medium')]: {
        width: '100vw',
        maxWidth: '100vw',
        padding: 0,
        margin: 0
      },
      '&[x-out-of-boundaries]': {
        display: 'none'
      }
    }
  })
