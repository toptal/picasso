import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    '@global': {
      html: {
        boxSizing: 'border-box',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
      '*, *::before, *::after': {
        boxSizing: 'initial',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        backgroundColor: palette.common.white,
      },
      '@media print': {
        body: {
          backgroundColor: palette.common.white,
        },
      },
      '#root': {
        display: 'flex',
        flex: 1,
      },
    },
  })
