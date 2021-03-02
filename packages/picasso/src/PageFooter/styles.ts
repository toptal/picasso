import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, layout }: Theme) =>
  createStyles({
    root: {
      backgroundColor: palette.grey.darker,
      width: '100%'
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 auto',
      padding: `0.5rem ${layout.contentPaddingHorizontal} 1.5rem`,
      maxWidth: layout.contentWidth,
      color: palette.common.white,
      fontSize: '0.875rem',
      lineHeight: '1em',

      [screens('small', 'medium', 'large')]: {
        flexDirection: 'column'
      },

      [screens('small', 'medium')]: {
        padding: `0.5rem ${layout.contentMobilePaddingHorizontal} 1.5rem`
      }
    },
    centered: {},
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem'
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',

      [screens('small', 'medium', 'large')]: {
        order: -1
      },

      [screens('small', 'medium')]: {
        flexDirection: 'column'
      }
    }
  })
