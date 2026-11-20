import type { ComponentProps } from 'react'
import React from 'react'
import type * as ReactDayPicker from 'react-day-picker'
import { fireEvent, render } from '@toptal/picasso-test-utils'
import { beforeEach, describe, expect, it } from '@jest/globals'

import { Calendar } from './Calendar'

const mockOnMonthChange = jest.fn()

// Records the month changes react-day-picker reports, on top of Calendar's own
// handler, so a double-fire is caught
jest.mock('react-day-picker', () => {
  const actual = jest.requireActual<typeof ReactDayPicker>('react-day-picker')
  const { createElement } =
    jest.requireActual<Pick<typeof React, 'createElement'>>('react')

  return {
    ...actual,
    DayPicker: (props: ComponentProps<typeof actual.DayPicker>) =>
      createElement(actual.DayPicker, {
        ...props,
        onMonthChange: (month: Date) => {
          mockOnMonthChange(month)
          props.onMonthChange?.(month)
        },
      }),
  }
})

describe('Calendar', () => {
  beforeEach(() => {
    mockOnMonthChange.mockClear()
  })

  it('renders', () => {
    const value = new Date('12-12-2019')

    const { container } = render(<Calendar onChange={() => {}} value={value} />)

    expect(container).toMatchSnapshot()
  })

  describe('when initial value is set', () => {
    it('renders value month', () => {
      const value = new Date(2019, 2, 14)

      const { getByText } = render(
        <Calendar onChange={() => {}} value={value} />
      )

      const monthHeader = getByText('March 2019')

      expect(monthHeader).toBeInTheDocument()
    })
  })

  describe('when activeMonth is set', () => {
    it('renders active month', () => {
      const value = new Date(2019, 2, 14)
      const activeMonth = new Date(2019, 5, 14)

      const { getByText } = render(
        <Calendar activeMonth={activeMonth} onChange={() => {}} value={value} />
      )

      const monthHeader = getByText('June 2019')

      expect(monthHeader).toBeInTheDocument()
    })
  })

  describe('when maxDate is set', () => {
    describe('when we click on disabled button', () => {
      it('will not trigger onChange', () => {
        const minDate = new Date(2024, 6, 1)
        const maxDate = new Date(2024, 6, 10)
        const value = new Date(2024, 6, 2)
        const onChange = jest.fn()

        const { getByTestId } = render(
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={value}
            onChange={onChange}
          />
        )

        const disabledButton = getByTestId('day-button-11')

        fireEvent.click(disabledButton)
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('when minDate is set', () => {
    describe('when we click on disabled button', () => {
      it('will not trigger onChange', () => {
        const minDate = new Date(2024, 6, 10)
        const maxDate = new Date(2024, 6, 15)
        const value = new Date(2024, 6, 12)
        const onChange = jest.fn()

        const { getByTestId } = render(
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={value}
            onChange={onChange}
          />
        )

        const disabledButton = getByTestId('day-button-6')

        fireEvent.click(disabledButton)
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('when disableDays is set', () => {
    it('disables specified days', () => {
      const minDate = new Date('2015-12-01')
      const maxDate = new Date('2015-12-30')
      const value = new Date('2015-12-10')
      const onChange = jest.fn()

      const { getByTestId } = render(
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={onChange}
          disableDays={{ dayOfWeek: [0, 6] }}
        />
      )

      const disabledButton = getByTestId('day-button-12')

      fireEvent.click(disabledButton)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('when navigating between months', () => {
    it('reports each month change exactly once', () => {
      const { getByRole, getByText } = render(
        <Calendar onChange={() => {}} value={new Date(2019, 2, 14)} />
      )

      fireEvent.click(getByRole('button', { name: 'Next month' }))

      expect(getByText('April 2019')).toBeInTheDocument()
      expect(mockOnMonthChange).toHaveBeenCalledTimes(1)
      expect(mockOnMonthChange).toHaveBeenLastCalledWith(new Date(2019, 3, 1))

      fireEvent.click(getByRole('button', { name: 'Previous month' }))
      fireEvent.click(getByRole('button', { name: 'Previous month' }))

      expect(getByText('February 2019')).toBeInTheDocument()
      expect(mockOnMonthChange).toHaveBeenCalledTimes(3)
      expect(mockOnMonthChange).toHaveBeenLastCalledWith(new Date(2019, 1, 1))
    })

    it('renders a single set of navigation controls', () => {
      const { getAllByRole, container } = render(
        <Calendar
          onChange={() => {}}
          numberOfMonths={2}
          activeMonth={new Date(2019, 2, 1)}
        />
      )

      expect(getAllByRole('button', { name: 'Previous month' })).toHaveLength(1)
      expect(getAllByRole('button', { name: 'Next month' })).toHaveLength(1)
      expect(container.querySelector('.rdp-nav')).toBeNull()
    })

    it('renders no navigation buttons with dropdown navigation', () => {
      const { queryByRole, getAllByRole } = render(
        <Calendar
          onChange={() => {}}
          dropdownNavigation
          minDate={new Date(2018, 0, 1)}
          maxDate={new Date(2020, 11, 31)}
          value={new Date(2019, 2, 14)}
        />
      )

      expect(queryByRole('button', { name: 'Next month' })).toBeNull()
      expect(getAllByRole('combobox')).toHaveLength(2)
    })
  })

  describe('when range is selected', () => {
    it('calls onChange only once both ends are picked', () => {
      const onChange = jest.fn()

      const { getByTestId } = render(
        <Calendar
          range
          onChange={onChange}
          activeMonth={new Date(2019, 2, 1)}
        />
      )

      fireEvent.click(getByTestId('day-button-14'))
      expect(onChange).not.toHaveBeenCalled()

      fireEvent.click(getByTestId('day-button-10'))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([
        new Date(2019, 2, 10),
        new Date(2019, 2, 14),
      ])
    })
  })

  describe('when minDate is in the displayed month', () => {
    it('renders the leading outside days as disabled', () => {
      const onChange = jest.fn()

      const { getByTestId } = render(
        <Calendar
          onChange={onChange}
          minDate={new Date(2024, 7, 10)}
          value={new Date(2024, 7, 12)}
        />
      )

      fireEvent.click(getByTestId('day-button-outside-30'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
