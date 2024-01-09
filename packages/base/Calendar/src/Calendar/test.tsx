import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import Calendar from './Calendar'

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
})
