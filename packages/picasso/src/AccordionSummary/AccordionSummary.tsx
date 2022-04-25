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

export default withStyles(styles)(
  MUIAccordionSummary
) as FunctionComponent<Props>
