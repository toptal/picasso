import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    tooltipOptionText: {
      width: '100%',
    },
    tooltip: {
      // Style to push the tooltip to the right outside the select option text
      left: '0.5rem!important',
    },
  })
