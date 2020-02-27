import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { Tooltip } from '@toptal/picasso'

import DatePicker from './DatePicker'

describe('DatePicker', () => {
  test('default render', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <DatePicker value={date} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('custom day rendering', () => {
    const date = new Date('12-12-2019')

    const { getByPlaceholderText, getByText } = render(
      <DatePicker
        placeholder='dateInput'
        value={date}
        onChange={() => {}}
        renderDay={({ children }) => {
          return <Tooltip content='tooltip content'>{children}</Tooltip>
        }}
      />
    )

    const input = getByPlaceholderText('dateInput')

    fireEvent.click(input)

    const day15 = getByText(/15/)

    // this line leads to a warning, wrapping into `act` doesn't help
    fireEvent.mouseOver(day15)

    const tooltip = getByText('tooltip content')

    expect(tooltip).toBeInTheDocument()
  })

  test('custom day rendering', () => {
    const date = new Date('2015-12-12')
    const handleChange = jest.fn()

    const { getByPlaceholderText } = render(
      <DatePicker placeholder='input' value={date} onChange={handleChange} />
    )

    const input = getByPlaceholderText('input')

    fireEvent.change(input, { target: { value: '' } })

    expect(handleChange).toBeCalledWith(null)
  })
})
