import { Theme, createStyles } from '@material-ui/core/styles'

const barWidth = 4

export default ({ palette, sizes, spacing }: Theme) =>
  createStyles({
    root: {
      borderRadius: sizes.borderRadius.medium,
      border: `1px solid ${palette.grey.lighter2}`,
      padding: `${spacing(3)}px ${spacing(3)}px ${spacing(3)}px ${
        spacing(3) + barWidth
      }px`,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: palette.common.white,
      '&:before': {
        background: palette.yellow.main,
        display: 'block',
        height: '100%',
        left: 0,
        position: 'absolute',
        content: '""',
        top: 0,
        width: barWidth
      }
    }
  })
