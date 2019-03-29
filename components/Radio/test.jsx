import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Radio from './index'

const renderRadio = (props = {}) => {
  return render(<Radio {...props} />)
}

afterEach(cleanup)

describe('disabled radio button', () => {
  let onChange
  let api

  beforeEach(() => {
    onChange = jest.fn()

    api = renderRadio({
      onChange,
      disabled: true
    })
  })
  test('renders disabled version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('disables radio events', () => {
    const { container } = api

    fireEvent.click(container)
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('radio button', () => {
  test('renders default radio button', () => {
    const { container } = renderRadio()

    expect(container).toMatchSnapshot()
  })
})
