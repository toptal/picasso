import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    toggleText: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.5rem'
    },
    iconWrapper: {
      transform: 'rotate(90deg)',
      fontSize: '0.6em',
      marginLeft: '1em'
    },
    icon: {
      color: palette.primary.main
    },
    expandedIcon: {
      transform: 'rotate(180deg)'
    }
  })
