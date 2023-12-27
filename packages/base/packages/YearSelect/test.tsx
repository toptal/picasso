import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import YearSelect from './YearSelect'

// Mock console error since toThrow() outputs the error message with stacktrace
let mockedConsoleError: jest.SpyInstance

describe('YearSelect', () => {
  beforeEach(() => {
    mockedConsoleError = jest.spyOn(console, 'error')
    mockedConsoleError.mockImplementation(() => {})
  })

  afterEach(() => {
    mockedConsoleError.mockRestore()
  })

  it('renders', () => {
    const { container } = render(
      <YearSelect from={2001} to={2005} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  it('render in descending order', () => {
    const placeholder = 'Select year'
    const { getByPlaceholderText, getByRole } = render(
      <YearSelect
        from={2005}
        to={2001}
        placeholder={placeholder}
        onChange={() => {}}
      />
    )

    fireEvent.click(getByPlaceholderText(placeholder))

    expect(getByRole('listbox')).toMatchSnapshot()
  })

  it('wrong range', () => {
    let from: number | null, to: number | null

    const errorMessage = () =>
      `Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`

    // casting is needed to trick typescript and pass null
    const tryRender = () =>
      render(
        <YearSelect
          onChange={() => {}}
          from={from as number}
          to={to as number}
        />
      )

    from = null
    to = 10
    expect(tryRender).toThrow(errorMessage())

    from = 10
    to = null
    expect(tryRender).toThrow(errorMessage())
  })
})
