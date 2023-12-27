/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { headerBreakingPointXL } from '@toptal/picasso-page-top-bar/constants'

export default ({ spacing, palette, typography }: Theme) => {
  const itemSpacing = spacing(1)

  return createStyles({
    root: {
      [headerBreakingPointXL]: {
        color: palette.grey.main2,
        padding: 0,
        height: 'auto',
        width: 'auto',
        margin: 0,
        flex: '1 1 auto',
        '& + &:before': {
          backgroundColor: palette.grey.main2,
          content: '""',
          display: 'inline-block',
          height: itemSpacing,
          marginLeft: itemSpacing,
          marginRight: itemSpacing,
          width: 1,
        },
        '&:hover': {
          backgroundColor: 'transparent',
          color: palette.grey.light2,
        },
        '&:focus, &$selected': {
          backgroundColor: 'transparent',
          color: palette.common.white,
        },
        '& p': {
          fontSize: typography.fontSizes.small,
        },
      },
    },
    icon: {
      [headerBreakingPointXL]: {
        '& svg': {
          width: '1em',
        },
      },
    },
    selected: {},
  })
}
