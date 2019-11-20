import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    spinnerBlue: {
      color: palette.primary.main
    },
    spinnerInherit: {
      color: 'inherit'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    label: {
      marginTop: '1rem'
    },
    inline: {
      display: 'inline-flex'
    }
  })
