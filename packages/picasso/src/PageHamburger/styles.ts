import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ screens, zIndex }: Theme) =>
  createStyles({
    responsiveWrapper: {
      position: 'fixed',
      top: '0.75em',
      left: '0.75em',
      zIndex: zIndex.appBar,
    },
    hidden: {
      display: 'none',
    },
    responsiveWrapperContent: {
      maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

      [screens('small', 'medium')]: {
        maxHeight: 'calc(100vh - 3rem)', // viewport minus header height
      },

      // height under which maxHeight menu starts to overflow
      // and needs to reduce height dynamically to avoid overflow
      '@media screen and (max-height: 585px)': {
        maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

        [screens('small', 'medium')]: {
          maxHeight: 'calc(100vh - 3rem)', // viewport minus header height
        },
      },
    },
  })
