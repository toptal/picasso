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
      color: palette.text.secondary,

      '&:hover': {
        color: palette.action.hover,
        '&$selected': {
          color: palette.action.active,
          backgroundColor: palette.secondary.light
        }
      },

      '&$selected': {
        color: palette.action.selected,
        backgroundColor: palette.secondary.light
      },

      '&:focus': {
        color: palette.action.focus,
        '&$selected': {
          color: palette.action.active,
          backgroundColor: palette.secondary.light
        }
      }
    },
    dark: {
      color: palette.text.secondary,

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
      color: palette.text.secondary
    },
    darkExpandIcon: {
      color: palette.text.secondary
    },
    expandIconDisabled: {
      color: palette.action.disabled
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
