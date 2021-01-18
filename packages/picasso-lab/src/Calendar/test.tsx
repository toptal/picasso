import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Calendar from './Calendar'

describe('Calendar', () => {
  it('default render', () => {
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
})
