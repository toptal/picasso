import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { CalendarTooltip } from './CalendarTooltip'

describe('CalendarTooltip', () => {
  it('renders', () => {
    const tooltipIntervals = [
      {
        start: new Date('2022-06-26'),
        end: new Date('2022-06-30'),
        tooltip: '10 business days notice period',
      },
    ]

    const { container } = render(
      <CalendarTooltip
        tooltipIntervals={tooltipIntervals}
        date={new Date('2022-07-18')}
      >
        <span>13</span>
      </CalendarTooltip>
    )

    expect(container).toMatchSnapshot()
  })
})
