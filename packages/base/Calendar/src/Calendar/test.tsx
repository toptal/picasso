import React from 'react'
import { fireEvent, render } from '@toptal/picasso-test-utils'
import { describe, expect, it } from '@jest/globals'

import { Calendar } from './Calendar'

describe('Calendar', () => {
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

  describe('when minDate and maxDate are empty form values', () => {
    it('keeps every day selectable', () => {
      const value = new Date(2019, 2, 14)
      const onChange = jest.fn()
      const emptyDate = '' as unknown as Date

      const { getByTestId } = render(
        <Calendar
          minDate={emptyDate}
          maxDate={emptyDate}
          value={value}
          onChange={onChange}
        />
      )

      fireEvent.click(getByTestId('day-button-1'))
      fireEvent.click(getByTestId('day-button-31'))
      expect(onChange).toHaveBeenCalledTimes(2)
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

  it('names each day with its full date', () => {
    const { getByRole } = render(
      <Calendar onChange={() => {}} activeMonth={new Date(2024, 4, 1)} />
    )

    expect(
      getByRole('button', { name: /Wednesday, May 15th, 2024/ })
    ).toBeInTheDocument()
  })

  describe('when navigating between months', () => {
    it('moves one month per click', () => {
      const { getByRole, getByText } = render(
        <Calendar onChange={() => {}} value={new Date(2019, 2, 14)} />
      )

      fireEvent.click(getByRole('button', { name: 'Next month' }))

      expect(getByText('April 2019')).toBeInTheDocument()

      fireEvent.click(getByRole('button', { name: 'Previous month' }))
      fireEvent.click(getByRole('button', { name: 'Previous month' }))

      expect(getByText('February 2019')).toBeInTheDocument()
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

  describe('when the displayed month would pass minDate or maxDate', () => {
    it('shows an activeMonth before minDate with its days disabled', () => {
      const onChange = jest.fn()
      const minDate = new Date(2024, 4, 5)

      const { getByRole, getByTestId, rerender } = render(
        <Calendar
          onChange={onChange}
          minDate={minDate}
          activeMonth={new Date(2024, 4, 1)}
        />
      )

      rerender(
        <Calendar
          onChange={onChange}
          minDate={minDate}
          activeMonth={new Date(2024, 3, 1)}
        />
      )

      expect(getByRole('grid', { name: 'April 2024' })).toBeInTheDocument()
      fireEvent.click(getByTestId('day-button-15'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('shows an activeMonth after maxDate with its days disabled', () => {
      const onChange = jest.fn()

      const { getByRole, getByTestId } = render(
        <Calendar
          onChange={onChange}
          maxDate={new Date(2024, 8, 5)}
          activeMonth={new Date(2024, 10, 1)}
        />
      )

      expect(getByRole('grid', { name: 'November 2024' })).toBeInTheDocument()
      fireEvent.click(getByTestId('day-button-15'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('shows the second of two months past maxDate with its days disabled', () => {
      const onChange = jest.fn()

      const { getByRole, getAllByTestId } = render(
        <Calendar
          onChange={onChange}
          numberOfMonths={2}
          value={new Date(2024, 5, 10)}
          maxDate={new Date(2024, 5, 20)}
        />
      )

      expect(getByRole('grid', { name: 'June 2024' })).toBeInTheDocument()
      expect(getByRole('grid', { name: 'July 2024' })).toBeInTheDocument()
      fireEvent.click(getAllByTestId('day-button-15')[1])
      expect(onChange).not.toHaveBeenCalled()
    })

    it('shows two months when minDate and maxDate share a month and nothing is picked', () => {
      const { getAllByRole } = render(
        <Calendar
          onChange={() => {}}
          numberOfMonths={2}
          minDate={new Date(2024, 5, 3)}
          maxDate={new Date(2024, 5, 20)}
        />
      )

      expect(getAllByRole('grid')).toHaveLength(2)
    })

    it('lists only the years between minDate and maxDate in the dropdown', () => {
      const { getAllByRole } = render(
        <Calendar
          onChange={() => {}}
          dropdownNavigation
          minDate={new Date(2019, 3, 1)}
          maxDate={new Date(2022, 5, 30)}
          activeMonth={new Date(2017, 0, 1)}
        />
      )

      const yearSelect = getAllByRole('combobox')[1]
      const years = Array.from(
        yearSelect.querySelectorAll('option'),
        option => option.value
      )

      expect(years).toEqual(['2019', '2020', '2021', '2022'])
      expect(yearSelect).toHaveValue('2019')
    })

    it('moves a year picked in the dropdown into the allowed months', () => {
      const { getAllByRole } = render(
        <Calendar
          onChange={() => {}}
          dropdownNavigation
          minDate={new Date(2019, 3, 1)}
          maxDate={new Date(2022, 5, 30)}
          value={new Date(2021, 11, 10)}
        />
      )

      const [monthSelect, yearSelect] = getAllByRole('combobox')

      fireEvent.change(yearSelect, { target: { value: '2022' } })

      expect(monthSelect).toHaveValue('5')
    })

    it('keeps a month picked in the dropdown within maxDate with two months shown', () => {
      const { getAllByRole, getByRole, queryByRole } = render(
        <Calendar
          onChange={() => {}}
          dropdownNavigation
          numberOfMonths={2}
          minDate={new Date(2019, 3, 1)}
          maxDate={new Date(2022, 5, 30)}
          value={new Date(2022, 5, 10)}
        />
      )

      fireEvent.change(getAllByRole('combobox')[0], { target: { value: '6' } })

      expect(getByRole('grid', { name: 'June 2022' })).toBeInTheDocument()
      expect(
        queryByRole('grid', { name: 'August 2022' })
      ).not.toBeInTheDocument()
    })
  })
})
