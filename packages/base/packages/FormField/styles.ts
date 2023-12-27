/* eslint-disable import/no-extraneous-dependencies */
import { createStyles } from '@material-ui/core/styles'

const HORIZONTAL_COLUMN_WIDTH_PX = 272

export default () =>
  createStyles({
    root: {
      fontSize: '1rem',

      '& + &': {
        marginTop: '1em',
      },
      '& $error + $hint': {
        marginTop: 0,
      },
    },

    adornment: {
      position: 'relative',
      paddingRight: '2rem',
    },
    autoSaveIndicator: {
      position: 'absolute',
      top: 0,
      right: 0,

      '&$hasMultilineCounter': {
        top: '-0.875rem',
      },
    },

    horizontalLayout: {
      display: 'grid',
      gridTemplateColumns: `${HORIZONTAL_COLUMN_WIDTH_PX}px 1fr`,
      gap: '0 32px', // 0 and lg, respectively
      gridTemplateRows: 'auto auto',
      gridTemplateAreas: `
        "label input"
        "hint error"
      `,
      width: '100%',
    },

    horizontalLayoutAdornment: {
      gridArea: 'error',
    },

    // These classes might still be used in selectors
    hasMultilineCounter: {},
    hint: {},
    error: {},
  })
