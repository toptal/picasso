import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import styles from './styles'

// We can't create here intermediate object for ExpansionPanelSummary
// because MUI ExpansionPanel use type check to set Summary in the
// correct place of the markdown
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js#L144
export default withStyles(styles)(MUIExpansionPanelSummary)
