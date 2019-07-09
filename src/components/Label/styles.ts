import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiChip: {
    root: {
      color: palette.grey.dark,
      backgroundColor: palette.common.white,
      border: `1px solid ${palette.grey.light}`,
      borderRadius: '6.25em',
      fontSize: '1em',
      height: '1.5em'
    },
    innerLabel: {
      fontSize: '0.75em'
    },
    icon: {
      marginLeft: '0.75em',
      marginRight: '-0.25em',
      color: palette.grey.dark
    },
    deleteIcon: {
      display: 'flex',
      justifyContent: 'center',

      color: palette.grey.dark,
      margin: '0 0.5em 0 -0.5em',

      '&:hover': {
        color: palette.grey.dark
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
