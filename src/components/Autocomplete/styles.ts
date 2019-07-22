import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes: { input } }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: input.width
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    actionMenuItem: {
      borderTop: `1px solid ${palette.grey.light}`
    }
  })
