import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '3rem'
    },
    showMoreLink: {
      cursor: 'pointer'
    },
    expandMoreIcon: {
      fontSize: '0.75rem',
      color: palette.text.primary,
      marginLeft: '0.5em'
    }
  })
