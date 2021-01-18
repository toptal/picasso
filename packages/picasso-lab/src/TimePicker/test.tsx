import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import TimePicker from './TimePicker'

describe('TimePicker', () => {
  it('default render', () => {
    const time = '21:00'

    const { container } = render(
      <TimePicker value={time} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  it('custom time rendering', () => {
    const time = '22:50'
    const nextTime = '18:30'
    const handleChange = jest.fn()

    const { getByDisplayValue } = render(
      <TimePicker value={time} onChange={handleChange} />
    )

    const input = getByDisplayValue(time)

    fireEvent.change(input, { target: { value: nextTime } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
