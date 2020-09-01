import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, zIndex }: Theme) =>
  createStyles({
    root: {
      height: '100%',
      // minWidth: '17rem',
      // width: '17rem',
      minWidth: '236px',
      width: '236px',
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
      top: '0.375em',
      left: '0.375em',
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
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter}`,
      backgroundColor: 'rgb(243, 244, 246)'
    },
    dark: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      backgroundColor: palette.grey.darker
    }
  })
