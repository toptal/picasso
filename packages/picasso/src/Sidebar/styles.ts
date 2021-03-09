import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, zIndex }: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '14.75rem',
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      padding: '1rem 0',
      fontSize: '1rem',

      [screens('small', 'medium')]: {
        width: '100vw',
        overflowY: 'scroll'
      }
    },
    responsiveWrapper: {
      position: 'fixed',
      top: '0.75em',
      left: '0.75em',
      zIndex: zIndex.appBar
    },
    responsiveWrapperContent: {
      maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

      [screens('small', 'medium')]: {
        maxHeight: 'calc(100vh - 3rem)' // viewport minus header height
      },

      // height under which maxHeight menu starts to overflow
      // and needs to reduce height dynamically to avoid overflow
      '@media screen and (max-height: 585px)': {
        maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

        [screens('small', 'medium')]: {
          maxHeight: 'calc(100vh - 3rem)' // viewport minus header height
        }
      }
    },
    spacer: {
      order: 50,
      flex: 1,
      height: '100%'
    },
    light: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter2}`,
      backgroundColor: palette.grey.lighter
    },
    dark: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      backgroundColor: palette.grey.darker
    }
  })
