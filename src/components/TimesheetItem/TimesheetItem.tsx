import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import Button from '../Button'
import Link from '../Link'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
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

export class TimesheetItem extends Component<Props, {}> {
  static defaultProps = {}
  static displayName = 'TimesheetItem'

  renderInfo() {
    const {
      id,
      classes,
      startDate,
      endDate,
      statusMessage,
      canView,
      onView,
      isErrorStatus
    } = this.props

    const timesheetInfo = (
      <Fragment>
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
      </Fragment>
    )

    return (
      <div className={classes.timesheetInfo}>
        {canView ? (
          <Link
            underline='none'
            className={classes.timesheetInfoLink}
            onClick={() => onView(id)}
          >
            {timesheetInfo}
          </Link>
        ) : (
          timesheetInfo
        )}
      </div>
    )
  }

  renderActionButtons() {
    const { classes, id, canUnsubmit, canEdit, onUnsubmit, onEdit } = this.props

    return (
      <div className={classes.controls}>
        {canUnsubmit && (
          <Button size='small' onClick={() => onUnsubmit(id)}>
            Unsubmit Timesheet
          </Button>
        )}
        {canEdit && (
          <Button size='small' onClick={() => onEdit(id)}>
            Edit
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { classes, className, style } = this.props

    return (
      <div className={cx(classes.timesheet, className)} style={style}>
        {this.renderInfo()}
        {this.renderActionButtons()}
      </div>
    )
  }
}

export default withStyles(styles)(TimesheetItem)
