import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens }: Theme) =>
  createStyles({
    menu: {
      backgroundColor: palette.common.white
    },
    scrollView: {
      maxHeight: '14.75rem', // 6.5 lines of menu to show
      overflowY: 'auto',

      [screens('small', 'medium')]: {
        maxHeight: '14.75rem' // 6.5 lines of menu to show
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
