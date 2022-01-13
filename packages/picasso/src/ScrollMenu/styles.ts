import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, shadows }: Theme) =>
  createStyles({
    menu: {
      backgroundColor: palette.common.white,
      borderRadius: '0.25rem',
      fontSize: '0.875em',
      padding: '0.5rem 0',
      boxShadow: shadows[5]
    },
    withHeader: {
      paddingTop: '0.125rem'
    },
    withFooter: {
      paddingBottom: 0
    },
    notLastChild: {
      paddingBottom: '0.5rem'
    },
    scrollView: {
      maxHeight: '26.875rem', // ~8.5 lines of menu to show
      overflowY: 'auto',

      [screens('small', 'medium')]: {
        maxHeight: '26.875rem' // ~8.5 lines of menu to show
      },

      // height under which maxHeight menu starts to overflow
      // and needs to reduce height dynamically to avoid overflow
      '@media screen and (max-height: 585px)': {
        maxHeight: 'calc(50vh - 4.8125rem)', // half of viewport minus header and anchor

        [screens('small', 'medium')]: {
          maxHeight: 'calc(50vh - 4.3125rem)' // half of viewport minus header and anchor
        }
      }
    }
  })
