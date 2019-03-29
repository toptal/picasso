import React, { ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import styles from './styles'
import ExpansionPanelSummary from '../ExpansionPanelSummary'
import ExpansionPanelDetails from '../ExpansionPanelDetails'
import { Classes } from '../styles/types'

interface Props {
  /** Always visible part of accordion */
  children?: ReactNode
  /** Collapsible content of `Accordion` */
  content: ReactNode
  /** Define accordion content state, whether it should be collapsed or displayed */
  expanded?: boolean
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void
  classes: Classes
}

export const Accordion: React.FunctionComponent<Props> = props => {
  const { children, content, expanded, onChange, classes } = props

  const isControlledVariant = expanded === undefined

  return (
    <MUIExpansionPanel elevation={0} expanded={expanded} onChange={onChange}>
      {children && (
        <ExpansionPanelSummary
          classes={{
            root: isControlledVariant ? classes.defaultSummary : ''
          }}
          expandIcon={<ChevronRightIcon className={classes.expandIcon} />}
        >
          {children}
        </ExpansionPanelSummary>
      )}
      <ExpansionPanelDetails
        classes={{ root: isControlledVariant ? classes.defaultDetails : '' }}
      >
        {content}
      </ExpansionPanelDetails>
    </MUIExpansionPanel>
  )
}

Accordion.defaultProps = {
  content: null,
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default withStyles(styles)(Accordion)
