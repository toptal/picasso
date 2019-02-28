import { Theme } from '@material-ui/core/styles'

export default ({ palette, layout }: Theme) => ({
  root: {
    backgroundColor: palette.primary.main
  },
  content: {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: layout.contentWidth,
    height: '3.75em',
    margin: '0 auto',
    padding: `0 ${layout.contentPaddingHorizontal}`
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
