import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) => {
  return createStyles({
    shape: {
      fill: palette.grey.main,
    },
    text: {
      fontSize: '1em',
      textTransform: 'uppercase',
      fill: palette.common.white,
      dominantBaseline: 'middle',
      textAnchor: 'middle',
    },
  })
}
