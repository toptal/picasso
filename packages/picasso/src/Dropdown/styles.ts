import { createStyles, Theme } from '@material-ui/core/styles'
import '../Popover/styles'

export default ({ screens, shadows, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    anchor: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    content: {
      fontSize: 'inherit',
      background: palette.common.white,

      maxHeight: '14.75rem', // 6.5 lines of menu to show
      overflowY: 'auto',
      boxShadow: shadows[0],
      [screens('small', 'medium')]: {
        maxHeight: '14.75rem' // 6.5 lines of menu to show
      },

      // height under which maxHeight menu starts to overflow
      // and needs to reduce height dynamically to avoid overflow
      '@media screen and (max-height: 585px)': {
        maxHeight: 'calc(50vh - 3.5rem)', // half of screen minus header and anchor

        [screens('small', 'medium')]: {
          maxHeight: 'calc(50vh - 3rem)' // half of viewport minus header and anchor
        }
      }
    },
    popper: {
      boxShadow: shadows[2]
    },
    contentVisible: {
      // Basically a whole content of a dropdown will be shown without a vertical scrollbar inside the dropdown
      maxHeight: 'none',

      // Will show a whole content on the `small` and `medium` screen with a vertical scrollbar if needed
      // For non desktop devices better if we have a scrollbar when a dropdown content is pretty long
      [screens('small', 'medium')]: {
        overflowY: 'scroll',
        maxHeight: '100vh'
      },
      '@media screen and (max-height: 585px)': {
        overflowY: 'scroll',
        maxHeight: '100vh'
      }
    }
  })
