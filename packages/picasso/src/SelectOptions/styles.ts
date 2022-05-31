import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ shadows }: Theme) =>
  createStyles({
    menu: {
      borderRadius: '0.25rem',
      fontSize: '0.875em',
      padding: '0.5rem 0',
      boxShadow: shadows[5],
    },
    withHeader: {
      paddingTop: '0.125rem',

      '& > div:first-child': {
        paddingBottom: '0.5rem',
      },
    },
    withFooter: {
      paddingBottom: 0,
    },
  })
