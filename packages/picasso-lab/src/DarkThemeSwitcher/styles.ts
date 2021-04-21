import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    dark: {
      color: palette.common.white
    },
    light: {
      color: palette.common.black
    },
    iconSun: {
      marginTop: '4px',
      marginRight: '0.5rem',
      marginLeft: '0.5rem'
    },
    iconMoon: {
      marginRight: '0.5rem',
      marginLeft: '0.5rem'
    }
  })
