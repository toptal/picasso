import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, zIndex }: Theme) =>
  createStyles({
    root: {
      height: '100%',
      minWidth: '17em',
      width: '17em',
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      padding: '1em 0',

      [screens('small')]: {
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
    spacer: {
      order: 50,
      flex: 1,
      height: '100%'
    },
    light: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter}`
    },
    dark: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      backgroundColor: palette.grey.darker
    }
  })
