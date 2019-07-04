import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    toggleText: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.5em'
    },
    icon: {
      fontSize: '0.6em',
      marginLeft: '1em',
      color: palette.primary.main,
      transform: 'rotate(90deg)'
    },
    expandedIcon: {
      transform: 'rotate(-90deg)'
    }
  })
