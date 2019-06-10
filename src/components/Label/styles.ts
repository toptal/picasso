import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    deleteIcon: {
      display: 'flex',
      justifyContent: 'center',

      color: palette.text.primary,
      fontSize: '0.85em',
      margin: '0 0.5em 0 -0.5em',

      opacity: 0.5,

      '&:hover': {
        opacity: 1,
        color: palette.text.primary
      }
    }
  })
