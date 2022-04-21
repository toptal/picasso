import { ReactNode, FunctionComponent } from 'react'
import withStyles from '@mui/styles/withStyles'
import MUIAccordionSummary from '@mui/material/AccordionSummary'
import { StandardProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, ButtonOrAnchorProps {
  expandIcon?: ReactNode
  children?: ReactNode
  onClick?: () => void
}

// We can't create here intermediate object for AccordionSummary
// because MUI Accordion use type check to set Summary in the
// correct place of the markdown
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Accordion/Accordion.js#L144
export default withStyles(styles)(
  MUIAccordionSummary
) as FunctionComponent<Props>
