import { createStyles } from '@material-ui/core/styles'

import { horizontalLabelColumnWidth } from '../FieldsLayout'

export default () =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplate: `"label input" "hint error" / ${horizontalLabelColumnWidth} 1fr`,
      gap: '0px 32px',
    },
  })
