import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Typography from '../Typography'
import Button from '../Button'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  id: number
  startDate: string
  endDate: string
  statusMessage?: string
  isErrorStatus?: boolean
  canEdit?: boolean
  canView?: boolean
  canUnsubmit?: boolean
  /** Callback invoked when the Edit button clicked on the timesheet record */
  onEdit: (timesheetId: number) => void
  /** Callback invoked when the View button clicked on the timesheet record */
  onView: (timesheetId: number) => void
  /** Callback invoked when the Unsubmit button clicked on the timesheet record */
  onUnsubmit: (timesheetId: number) => void
}

export class TimesheetItem extends React.Component<Props, {}> {
  static defaultProps = {}
  static displayName = 'TimesheetItem'

  renderInfo() {
    const {
      classes,
      startDate,
      endDate,
      statusMessage,
      isErrorStatus
    } = this.props

    return (
      <div className={classes.timesheetInfo}>
        <Typography variant='caption' inline>
          From
        </Typography>
        <Typography variant='caption' weight='bold' inline>
          {' '}
          {startDate}{' '}
        </Typography>
        <Typography variant='caption' inline>
          till
        </Typography>
        <Typography variant='caption' weight='bold' inline>
          {' '}
          {endDate}
        </Typography>
        {statusMessage && (
          <Typography
            variant='caption'
            weight={isErrorStatus ? 'bold' : 'regular'}
            className={isErrorStatus ? classes.overdueMessage : undefined}
            inline
          >
            {' '}
            {statusMessage}
          </Typography>
        )}
      </div>
    )
  }

  renderActionButtons() {
    const {
      classes,
      id,
      canUnsubmit,
      canEdit,
      canView,
      onUnsubmit,
      onEdit,
      onView
    } = this.props

    return (
      <div className={classes.controls}>
        {canUnsubmit && (
          <Button
            size='small'
            onClick={() => {
              onUnsubmit(id)
            }}
          >
            Unsubmit Timesheet
          </Button>
        )}
        {canEdit && (
          <Button
            size='small'
            onClick={() => {
              onEdit(id)
            }}
          >
            Edit
          </Button>
        )}
        {canView && (
          <Button
            size='small'
            onClick={() => {
              onView(id)
            }}
          >
            View
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.timesheet}>
        {this.renderInfo()}
        {this.renderActionButtons()}
      </div>
    )
  }
}

export default withStyles(styles)(TimesheetItem)
