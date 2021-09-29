import { rem } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      padding: '20px',
      borderWidth: sizes.borderWidth,
      borderRadius: sizes.borderRadius.medium,
      borderColor: palette.grey.light2,
      borderStyle: 'dashed',
      backgroundColor: palette.common.white,
      color: palette.grey.dark,
      outline: 'none',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, background-color',
      gap: '0.5rem',
      '&:hover, &$hovered, &:focus, &$focused, &$dragActive': {
        borderColor: palette.blue.main,
        cursor: 'pointer'
      },
      '&$disabled': {
        backgroundColor: palette.grey.lighter,
        '&:hover': {
          cursor: 'no-drop',
          borderColor: palette.grey.light2
        }
      }
    },
    hint: {
      margin: 0,
      '& > *': {
        lineHeight: rem('16px')
      }
    },
    completed: {},
    error: {
      margin: 0
    },
    dragActive: {},
    hovered: {},
    disabled: {},
    focused: {}
  })
