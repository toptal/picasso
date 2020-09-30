import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      height: '2.75em',
      padding: '0 1rem',

      '&:hover': {
        backgroundColor: 'initial'
      },

      '&:focus': {
        backgroundColor: 'initial'
      },
      '$nonCollapsibleMenu &': {
        paddingLeft: '2rem',
        marginRight: '0rem'
      },
      '$details &': {
        paddingLeft: '2rem',
        marginRight: '0rem'
      }
    },
    roundedBorder: {
      borderRadius: sizes.borderRadius.small
    },
    light: {
      color: palette.grey.dark,

      '&:hover': {
        color: palette.blue.main,
        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.grey.light
        }
      },

      '&$selected': {
        color: palette.blue.main,
        backgroundColor: palette.grey.light
      },

      '&:focus': {
        color: palette.blue.main,
        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.grey.light
        }
      }
    },
    dark: {
      '&:hover': {
        color: palette.common.white,
        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      },
      '&$selected': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark
      },

      '&:focus': {
        color: palette.common.white,
        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      }
    },
    selected: {},
    label: {},
    withIcon: {
      marginLeft: '0.875em'
    },
    summary: {
      padding: 0
    },
    details: {
      fontSize: 'inherit',
      marginBottom: '0'
    },
    content: {
      fontSize: 'inherit'
    },
    expandIcon: {
      fontSize: '1em'
    },
    lightExpandIcon: {
      color: palette.grey.dark
    },
    darkExpandIcon: {
      color: palette.grey.main
    },
    expandIconDisabled: {
      color: palette.grey.main
    },
    noWrap: {
      flex: 1,
      minWidth: 0
    },
    nonCollapsibleMenu: {}
  })
