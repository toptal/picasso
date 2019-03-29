import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Table from '../Table'
import Typography from '../Typography'
import TimesheetItem from '../TimesheetItem'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
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
}

export const Timesheets: React.FunctionComponent<Props> = props => {
  const { timesheets, onEdit, onView, onUnsubmit } = props

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>
            <Typography weight='bold'>Timesheets</Typography>
          </Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {timesheets.map(timesheet => (
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
  )
}

Timesheets.defaultProps = {
  onEdit: () => {},
  onUnsubmit: () => {},
  onView: () => {}
}

Timesheets.displayName = 'Timesheets'

export default withStyles(styles)(Timesheets)
