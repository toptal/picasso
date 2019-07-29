import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../../Picasso'
import MonthSelect from './MonthSelect'

afterEach(cleanup)

// Mock console error since toThrow() outputs the error message with stacktrace
let mockedConsoleError: any
beforeEach(() => {
  mockedConsoleError = jest.spyOn(console, 'error')
  mockedConsoleError.mockImplementation(() => {})
})

afterEach(() => {
  mockedConsoleError.mockRestore()
})

describe('MonthSelect', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <MonthSelect onChange={() => {}} from={1} to={12} />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('wrong range', () => {
    let from: number, to: number

    const errorMessage = () =>
      `Please check the values you have passed: from: ${from}, to: ${to}`
    const tryRender = () =>
      render(
        <Picasso loadFonts={false}>
          <MonthSelect onChange={() => {}} from={from} to={to} />
        </Picasso>
      )

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
