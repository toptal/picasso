import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes: { borderWidth, input } }: Theme) =>
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
      borderTop: `${borderWidth} solid ${palette.grey.light}`
    }
  })
