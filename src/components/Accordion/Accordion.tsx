import React, { ReactNode, FunctionComponent, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { StandardProps } from '../Picasso'
import ExpansionPanelSummary from '../ExpansionPanelSummary'
import ExpansionPanelDetails from '../ExpansionPanelDetails'
import styles from './styles'

interface Props extends StandardProps {
  /** Always visible part of accordion */
  children?: ReactNode
  /** Collapsible content of `Accordion` */
  content: ReactNode
  /** Define accordion content state, whether it should be collapsed or displayed */
  expanded?: boolean
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
}

export const Accordion: FunctionComponent<Props> = ({
  children,
  content,
  expanded,
  className,
  style,
  classes,
  onChange
}) => {
  const isControlledVariant = expanded === undefined

  return (
    <MUIExpansionPanel
      className={className}
      style={style}
      elevation={0}
      expanded={expanded}
      onChange={onChange}
    >
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
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default withStyles(styles)(Accordion)
