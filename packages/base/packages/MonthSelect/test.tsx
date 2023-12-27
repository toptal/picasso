import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import MonthSelect from './MonthSelect'

// Mock console error since toThrow() outputs the error message with stacktrace
let mockedConsoleError: jest.SpyInstance

describe('MonthSelect', () => {
  beforeEach(() => {
    mockedConsoleError = jest.spyOn(console, 'error')
    mockedConsoleError.mockImplementation(() => {})
  })

  afterEach(() => {
    mockedConsoleError.mockRestore()
  })

  it('renders', () => {
    const { container } = render(
      <MonthSelect onChange={() => {}} from={1} to={12} />
    )

    expect(container).toMatchSnapshot()
  })

  it('wrong range', () => {
    let from: number, to: number

    const errorMessage = () =>
      `Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`
    const tryRender = () =>
      render(<MonthSelect onChange={() => {}} from={from} to={to} />)

    from = 12
    to = 11
    expect(tryRender).toThrow(errorMessage())

    from = 13
    expect(tryRender).toThrow(errorMessage())

    from = 0
    expect(tryRender).toThrow(errorMessage())

    to = 13
    expect(tryRender).toThrow(errorMessage())

    to = 0
    expect(tryRender).toThrow(errorMessage())
  })
})
