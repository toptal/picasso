import { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIAccordionSummary from '@material-ui/core/AccordionSummary'
import { StandardProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, ButtonOrAnchorProps {
  expandIcon?: ReactNode
  children?: ReactNode
  onClick?: () => void
}

// We can't create here intermediate object for AccordionSummary
// because MUI ExpansionPanel use type check to set Summary in the
// correct place of the markdown
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js#L144
export default withStyles(styles)(MUIAccordionSummary) as FunctionComponent<
  Props
>
