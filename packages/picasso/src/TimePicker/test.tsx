import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import TimePicker from './TimePicker'

describe('TimePicker', () => {
  it('renders', () => {
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

  describe('when invalid time is entered', () => {
    it('calls onChange with empty value', () => {
      const time = '09:00'
      const handleChange = jest.fn()
      const { getByDisplayValue } = render(
        <TimePicker value={time} onChange={handleChange} />
      )

      const input = getByDisplayValue(time)

      fireEvent.change(input, { target: { value: '12:--' } })
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' }),
        })
      )

      const newTime = '12:12'

      fireEvent.change(input, { target: { value: newTime } })
      expect(handleChange).toHaveBeenCalledTimes(2)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: newTime }),
        })
      )
    })
  })
})
