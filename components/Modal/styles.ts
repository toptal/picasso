import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: '2rem',
      top: '2rem',
      color: palette.grey[500],
      cursor: 'pointer',
      fontSize: '1.3rem',
      opacity: 0.3,

      '&:hover': {
        opacity: 1
      }
    }
  })
