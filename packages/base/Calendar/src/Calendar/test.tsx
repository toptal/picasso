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
})
