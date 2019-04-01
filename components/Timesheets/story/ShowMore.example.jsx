import React from 'react'
import { Timesheets } from '@toptal/picasso'

const TimesheetsShowMoreExample = () => {
  const [timesheets, setTimesheets] = React.useState(initialTimesheets)

  const handleShowMore = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setTimesheets(allTimesheets)
        resolve()
      }, 1500)
    })
  }

  return (
    <div>
      <Timesheets
        timesheets={timesheets}
        collapsedCount={3}
        onShowMore={handleShowMore}
        onEdit={id => console.log('Edit timesheet ', id)}
        onView={id => console.log('View timesheet ', id)}
        onUnsubmit={id => console.log('Unsubmit timesheet ', id)}
      />
    </div>
  )
}

const initialTimesheets = [
  {
    id: 1,
    startDate: 'Mon, 25 Feb 2019',
    endDate: 'Sun, 10 Mar 2019',
    canEdit: true,
    canView: true
  },
  {
    id: 2,
    startDate: 'Mon, 11 Feb 2019',
    endDate: 'Sun, 24 Feb 2019',
    canUnsubmit: true,
    canEdit: true,
    canView: true
  },
  {
    id: 3,
    startDate: 'Mon, 31 Dec 2018',
    endDate: 'Sun, 13 Jan 2019',
    canView: true
  }
]

const allTimesheets = [
  {
    id: 1,
    startDate: 'Mon, 25 Feb 2019',
    endDate: 'Sun, 10 Mar 2019',
    canEdit: true,
    canView: true
  },
  {
    id: 2,
    startDate: 'Mon, 11 Feb 2019',
    endDate: 'Sun, 24 Feb 2019',
    canUnsubmit: true,
    canEdit: true,
    canView: true
  },
  {
    id: 3,
    startDate: 'Mon, 31 Dec 2018',
    endDate: 'Sun, 13 Jan 2019',
    canView: true
  },
  {
    id: 4,
    startDate: 'Mon, 17 Dec 2018',
    endDate: 'Sun, 30 Dec 2018'
  },
  {
    id: 5,
    startDate: 'Mon, 03 Dec 2018',
    endDate: 'Sun, 16 Dec 2018',
    statusMessage: '(Submission overdue, no automatic processing available)',
    isErrorStatus: true,
    canUnsubmit: true,
    canEdit: true,
    canView: true
  },
  {
    id: 6,
    startDate: 'Mon, 22 Oct 2018',
    endDate: 'Sun, 04 Nov 2018',
    statusMessage: '(Not submitted)',
    isErrorStatus: false,
    canUnsubmit: true,
    canEdit: true,
    canView: true
  }
]

export default TimesheetsShowMoreExample
