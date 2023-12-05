import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplate: '"label input" "hint error" / 272px 1fr',
      gap: '0px 32px',
    },
  })
