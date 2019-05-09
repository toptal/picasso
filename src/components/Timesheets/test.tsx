import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitForElement
} from 'react-testing-library'

import Picasso from '../index'
import Timesheets from './index'

const renderTimesheets = (props: any) => {
  const { initialItemsCount, timesheets, onShowMore } = props

  return render(
    <Picasso loadFonts={false}>
      <Timesheets
        initialItemsCount={initialItemsCount}
        timesheets={timesheets}
        onShowMore={onShowMore}
      />
    </Picasso>
  )
}

afterEach(cleanup)

describe('Timesheets', () => {
  const initialItemsCount = 3
  const timesheets = [
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

  test('render with less than collasped count timesheets', () => {
    const { container } = renderTimesheets({
      initialItemsCount,
      timesheets: timesheets.slice(0, initialItemsCount - 1),
      onShowMore: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  test('render with more than collasped count timesheets', () => {
    const { container } = renderTimesheets({
      initialItemsCount,
      timesheets,
      onShowMore: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  describe('when no promise in onShowMore callback specified', () => {
    test('should render all timesheets after click show more', () => {
      const { container, getByText } = renderTimesheets({
        initialItemsCount,
        timesheets,
        onShowMore: () => {}
      })

      act(() => {
        fireEvent.click(getByText(/Show more/i))
      })

      expect(container).toMatchSnapshot()
    })

    test('should render all timesheets in non-collapsable mode', () => {
      const { container } = renderTimesheets({
        initialItemsCount,
        timesheets
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when promise in onShowMore callback specified', () => {
    test('should render Loading when click show more', () => {
      const promise = new Promise(() => {})

      const { container, getByText } = renderTimesheets({
        initialItemsCount,
        timesheets,
        onShowMore: () => promise
      })

      act(() => {
        fireEvent.click(getByText(/Show more/i))
      })
      expect(container).toMatchSnapshot()
    })

    test('should render all timesheets after click show more and promise resolved', async () => {
      let _resolve = () => {}
      const promise = new Promise(resolve => {
        _resolve = resolve
      })

      const { container, getByText } = renderTimesheets({
        initialItemsCount,
        timesheets,
        onShowMore: () => promise
      })

      act(() => {
        fireEvent.click(getByText(/Show more/i))
        _resolve()
      })

      // add one tick to make possible promise to be resolved
      // and callback inside the Timesheets component will
      // re-render the component
      await waitForElement(() => true)

      expect(container).toMatchSnapshot()
    })
  })
})
