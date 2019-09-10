import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, screens }: Theme) =>
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
    paper: {
      [screens('small')]: {
        top: '2.5em !important'
      }
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
