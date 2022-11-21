import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, zIndex }: Theme) => {
  const wrapperBoxShadow = `inset -1px 0px 0px 0px ${palette.grey.lighter2}`

  return createStyles({
    hamburger: {
      pointerEvents: 'none',
    },
    hidden: {
      display: 'none',
    },
    responsiveWrapper: {
      position: 'fixed',
      top: '0.75rem',
      left: '0.75rem',
      zIndex: zIndex.appBar,
    },
    responsiveWrapperContent: {
      backgroundColor: palette.grey.lighter,
      boxShadow: wrapperBoxShadow,
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
}
