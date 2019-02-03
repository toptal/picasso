import { Palette } from '@material-ui/core/styles/createPalette'

export default ({ palette }: { palette: Palette }) => ({
  flat: {
    backgroundColor: palette.grey[100],
    color: palette.grey[200]
  },
  success: {
    backgroundColor: palette.positive.light,
    color: palette.positive.main
  },
  error: {
    backgroundColor: palette.error.light,
    color: palette.error.main
  },

  deleteIcon: {
    display: 'flex',
    justifyContent: 'center',

    color: palette.primary.main,
    fontSize: '0.85em',
    margin: '0 0.5em 0 -0.5em',

    opacity: 0.5,

    '&:hover': {
      opacity: 1,
      color: palette.primary.main
    }
  }
})
