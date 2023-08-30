import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    '@global': {
      html: {
        overflow: 'auto',
        scrollbarGutter: 'stable',
      },
    },
  })
