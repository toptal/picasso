import { Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ palette, sizes }: Theme) => ({
  MuiChip: {
    root: {
      fontSize: '1rem',
      color: palette.grey.dark,
      backgroundColor: palette.common.white,
      borderRadius: '6.25em',
      border: `${sizes.borderWidth} solid ${palette.grey.light2}`,
      height: '1.5em'
    },
    label: {
      paddingLeft: '0.75em',
      paddingRight: '0.75em',
      display: 'flex',
      alignItems: 'center'
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
