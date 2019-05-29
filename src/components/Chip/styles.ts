import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette, spacing }: Theme) => ({
  MuiChip: {
    root: {
      fontSize: 'inherit',
      backgroundColor: palette.common.white,
      borderRadius: '6.25em',
      border: `${spacing.borderWidth} solid ${palette.grey.light}`,
      color: palette.primary.main,
      height: '1.5em'
    },
    label: {
      paddingLeft: '0.75em',
      paddingRight: '0.75em'
    },
    icon: {
      marginLeft: '0.75em',
      marginRight: '-0.25em',
      color: palette.grey.main
    }
  }
}))

export default () =>
  createStyles({
    innerLabel: {
      fontSize: '0.75em',
      fontWeight: 600
    }
  })
