import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Calendar from './Calendar'

describe('Calendar', () => {
  it('renders', () => {
    const value = new Date('12-12-2019')

    const { container } = render(
      <Calendar
        activeMonth={new Date(2019, 1, 1)}
        onChange={() => {}}
        value={value}
      />
    )

    expect(container).toMatchSnapshot()
  })

  describe('when `range` property is set', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern').setSystemTime(new Date('2021-12-12'))
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('keeps active month same when value is changed', () => {
      const { rerender, getByText } = render(
        <Calendar range onChange={() => {}} value={undefined} />
      )

      expect(getByText('December 2021')).toBeInTheDocument()

      rerender(
        <Calendar
          range
          onChange={() => {}}
          value={[new Date('2022-01-01'), new Date('2022-01-02')]}
        />
      )

      expect(getByText('December 2021')).toBeInTheDocument()
    })
  })
})
