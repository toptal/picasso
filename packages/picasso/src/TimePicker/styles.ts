import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      cursor: 'default',
    },
    icon: {
      background: palette.common.white,
      position: 'absolute',
      right: '0.625rem',
      pointerEvents: 'none',
      margin: 0,
      userSelect: 'none',
    },
    inputBase: {
      marginRight: '-8px', // override default margin for icon position

      // this workaround is needed to show the picker when we click our own clock icon
      // eventually, we could "display: none" this native icon and use native showPicker()
      // but currently not all browsers support the picker (e.g. Safari and Firefox), so for now we
      // hide the native icon (with its functionality available) behind our icon
      '&::-webkit-calendar-picker-indicator': {
        position: 'absolute',
        right: '0.5rem',
        cursor: 'pointer',
        background: 'none',
      },
    },
    inputMask: {
      fontSize: '0.8125rem',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none',
    },
  })
