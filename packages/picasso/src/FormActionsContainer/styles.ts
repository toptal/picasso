import { createStyles } from '@material-ui/core/styles'

import { HORIZONTAL_LABEL_COLUMN_WIDTH_REM } from '../FieldsLayout'

export default () =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplate: `"label input" "hint error" / ${HORIZONTAL_LABEL_COLUMN_WIDTH_REM}rem 1fr`,
      gap: '0px 32px',
    },
  })
