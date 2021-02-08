import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      height: '2.75em',
      padding: '0 1rem',
      margin: '0 1rem',

      '$nestedMenu &': {
        padding: '0 0 0 2rem',
        marginRight: '1rem'
      },

      '$nestedMenuWithIcon &': {
        padding: '0 0 0 2.875rem',
        marginRight: '1rem'
      }
    },
    roundedBorder: {
      borderRadius: sizes.borderRadius.small
    },
    light: {
      color: palette.grey.dark,

      '&:hover': {
        color: palette.blue.main,
        '&$selected, $selected': {
          color: palette.blue.main,
          backgroundColor: palette.grey.light
        }
      },
      // to cover cases when Sidebar.Item or Sidebar.Menu has a wrapper component
      '&$selected, $selected': {
        color: palette.blue.main,
        backgroundColor: palette.grey.light
      },

      '&:focus': {
        color: palette.blue.main,
        '&$selected, $selected': {
          color: palette.blue.main,
          backgroundColor: palette.grey.light
        }
      }
    },
    dark: {
      '&:hover': {
        color: palette.common.white,
        '&$selected, $selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      },
      '&$selected, $selected': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark
      },

      '&:focus': {
        color: palette.common.white,
        '&$selected, $selected': {
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
    collapsibleWrapper: {
      padding: '0 0 0 1rem',
      margin: '0 1rem'
    },
    nestedMenu: {},
    nestedMenuWithIcon: {},
    content: {
      // to cover text overflow in the sub-menu header item
      maxWidth: '100%'
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
    collapsible: {
      margin: 0,
      padding: 0
    }
  })
