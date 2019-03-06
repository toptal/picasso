import { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => ({
  closeButton: {
    position: 'absolute' as 'absolute',
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
