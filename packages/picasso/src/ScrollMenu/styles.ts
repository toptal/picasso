import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens }: Theme) =>
  createStyles({
    menu: {
      backgroundColor: palette.common.white
    },
    scrollView: {
      maxHeight: '10.125rem', // 4.5 lines of menu to show
      overflowY: 'auto',

      [screens('small')]: {
        maxHeight: '10.125rem'
      },

      '@media screen and (max-height: 585px)': {
        maxHeight: `calc(50vh - 4.8125rem)`
      }
    }
  })
