import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import styles from './styles'
import ExpansionPanelSummary from '../ExpansionPanelSummary'
import ExpansionPanelDetails from '../ExpansionPanelDetails'

const Accordion = props => {
  const { classes, Summary, Details, expanded, onChange } = props

  const isControlledVariant = expanded === undefined

  return (
    <MUIExpansionPanel elevation={0} expanded={expanded} onChange={onChange}>
      {Summary && (
        <ExpansionPanelSummary
          classes={{
            root: isControlledVariant ? classes.defaultSummary : null
          }}
          expandIcon={<ChevronRightIcon className={classes.expandIcon} />}
        >
          {Summary}
        </ExpansionPanelSummary>
      )}
      <ExpansionPanelDetails
        classes={{ root: isControlledVariant ? classes.defaultDetails : null }}
      >
        {Details}
      </ExpansionPanelDetails>
    </MUIExpansionPanel>
  )
}

Accordion.propTypes = {
  Details: PropTypes.element.isRequired,
  Summary: PropTypes.element,
  classes: PropTypes.shape({
    expandIcon: PropTypes.string
  }),
  expanded: PropTypes.bool,
  onChange: PropTypes.func
}

Accordion.defaultProps = {
  Summary: null,
  classes: null,
  expanded: undefined,
  onChange: () => {}
}

export default withStyles(styles)(Accordion)
