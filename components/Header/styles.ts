import { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => ({
  root: {
    height: '3.75em',
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.primary.main,
    padding: '0 1.5em'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    width: '1px',
    height: '1.75em',
    backgroundColor: palette.common.white,
    opacity: 0.8
  },
  title: {
    color: palette.common.white
  }
})
