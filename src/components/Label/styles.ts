import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette, spacing }: Theme) => ({
  MuiChip: {
    root: {
      fontSize: '1em',
      color: palette.grey.dark,
      backgroundColor: palette.common.white,
      borderRadius: '6.25em',
      border: `${spacing.borderWidth} solid ${palette.grey.light}`,
      height: '1.5em'
    },
    label: {
      paddingLeft: '0.75em',
      paddingRight: '0.75em'
    },
    icon: {
      marginLeft: '0.75em',
      marginRight: '-0.25em',
      color: 'inherit'
    },
    deletable: {
      '&:focus': {
        backgroundColor: 'inherit'
      }
    },
    deleteIcon: {
      display: 'flex',
      justifyContent: 'center',
      color: 'inherit',
      margin: '0 0.5em 0 -0.5em',

      '&:hover': {
        color: 'inherit'
      }
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
<<<<<<< HEAD
    disabled: {
=======
    icon: {},
    deleteIcon: {},
    rootDisabled: {
>>>>>>> 9aae0eb8... refactor(Label): remove Chip component
      borderColor: palette.grey.lighter,
      color: palette.grey.main,
      pointerEvents: 'none'
    },
<<<<<<< HEAD

    white: {
      background: 'none',
      color: palette.common.white
=======
    deleteIconDisabled: {
      cursor: 'default'
    },
    innerLabel: {
      fontSize: '0.75em',
      fontWeight: 600
>>>>>>> 9aae0eb8... refactor(Label): remove Chip component
    }
  })
