import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, zIndex }: Theme) =>
  createStyles({
    hamburger: {
      pointerEvents: 'none',
    },
    hidden: {
      display: 'none',
    },
    responsiveWrapper: {
      position: 'fixed',
      top: '0.75em',
      left: '0.75em',
      zIndex: zIndex.appBar,
    },
    responsiveWrapperContent: {
      backgroundColor: palette.grey.lighter,
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter2}`,
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
