import React, { Fragment, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Table from '../Table'
import Typography from '../Typography'
import TimesheetItem from '../TimesheetItem'
import Link from '../Link'
import { Classes } from '../styles/types'
import styles from './styles'

const INITIAL_ITEMS_COUNT = 3

interface Props {
  classes: Classes
  /** Number of timesheets records shown when the list is collapsed */
  initialItemsCount: number
  /** Timesheets list */
  timesheets: {
    id: number
    startDate: string
    endDate: string
    statusMessage?: string
    isErrorStatus?: boolean
    canEdit?: boolean
    canView?: boolean
    canUnsubmit?: boolean
  }[]
  /** Callback invoked when the Edit button clicked on the timesheet record */
  onEdit: (timesheetId: number) => void
  /** Callback invoked when the View button clicked on the timesheet record */
  onView: (timesheetId: number) => void
  /** Callback invoked when the Unsubmit button clicked on the timesheet record */
  onUnsubmit: (timesheetId: number) => void
  /** Callback invoked when the Show More Timesheets button clicked. You should load here more timesheets to show */
  onShowMore: () => void | Promise<void>
}

enum State {
  Collapsed,
  Loading,
  Full
}

export const Timesheets: React.FunctionComponent<Props> = React.memo(props => {
  const {
    classes,
    initialItemsCount,
    timesheets,
    onEdit,
    onView,
    onUnsubmit,
    onShowMore
  } = props

  const [state, setState] = useState(State.Collapsed)
  const timesheetsToShow =
    onShowMore && (state === State.Collapsed || state === State.Loading)
      ? timesheets.slice(0, initialItemsCount)
      : timesheets

  const handleShowMoreClick = async () => {
    if (!onShowMore) {
      return
    }

    const promise = onShowMore()

    if (promise) {
      setState(State.Loading)
      await promise
      setState(State.Full)
    } else {
      setState(State.Full)
    }
  }

  return (
    <Fragment>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>
              <Typography weight='bold'>Timesheets</Typography>
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {timesheetsToShow.map(timesheet => (
            <Table.Row key={timesheet.id}>
              <Table.Cell>
                <TimesheetItem
                  {...timesheet}
                  onUnsubmit={onUnsubmit}
                  onEdit={onEdit}
                  onView={onView}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {onShowMore && state === State.Collapsed && (
        <div className={classes.footer}>
          <Link
            onClick={handleShowMoreClick}
            underline='none'
            className={classes.showMoreLink}
          >
            <Typography variant='caption'>Show more timesheets</Typography>
            <ExpandMoreIcon className={classes.expandMoreIcon} />
          </Link>
        </div>
      )}

      {onShowMore && state === State.Loading && (
        <div className={classes.footer}>
          <Typography variant='caption'>Loading...</Typography>
        </div>
      )}
    </Fragment>
  )
})

Timesheets.defaultProps = {
  initialItemsCount: INITIAL_ITEMS_COUNT,
  onEdit: () => {},
  onUnsubmit: () => {},
  onView: () => {}
}

Timesheets.displayName = 'Timesheets'

export default withStyles(styles)(Timesheets)
