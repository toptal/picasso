import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { CalendarIndicators } from './CalendarIndicators'

describe('CalendarIndicators', () => {
  it('renders', () => {
    const indicatedIntervals = [
      { start: new Date('2022-07-11'), end: new Date('2022-07-16') },
      { start: new Date('2022-07-18'), end: new Date('2022-07-23') },
    ]

    const { container } = render(
      <CalendarIndicators
        indicatedIntervals={indicatedIntervals}
        date={new Date('2022-07-18')}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
