import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    '@global': {
      html: {
        boxSizing: 'initial',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale'
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        backgroundColor: palette.common.white
      },
      '@media print': {
        body: {
          backgroundColor: palette.common.white
        }
      },
      '#root': {
        display: 'flex',
        flex: 1
      }
    }
  })
