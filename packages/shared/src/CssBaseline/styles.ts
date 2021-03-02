import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, typography }: Theme) =>
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
        /*
          font-family and font-size should also be set for portals
          (https://github.com/mui-org/material-ui-docs/blob/b44886b4283fcaaa8795499a1e0af7557db8f573/packages/material-ui/src/CssBaseline/CssBaseline.js#L16)
        */
        fontFamily: typography.body2.fontFamily,
        fontSize: typography.body2.fontSize,
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
