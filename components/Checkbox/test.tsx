import React from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Checkbox from './'

const renderCheckbox = (props = {}) => {
  return render(<Checkbox {...props} />)
}

afterEach(cleanup)

test('renders default checkbox without label', () => {
  const { container } = renderCheckbox()

  expect(container).toMatchSnapshot()
})

test('should render default checkbox with label', () => {
  const { container } = renderCheckbox({ label: 'Select item' })

  expect(container).toMatchSnapshot()
})

test('renders disabled state', () => {
  const { container } = renderCheckbox({ disabled: true })

  expect(container).toMatchSnapshot()
})

test('renders indeterminate state', () => {
  const { container } = renderCheckbox({ indeterminate: true })

  expect(container).toMatchSnapshot()
})

describe('checkbox interaction', () => {
  let onChange: () => void
  let api: RenderResult
  let label: string

  beforeEach(() => {
    label = 'Select item'
    onChange = jest.fn()
    api = renderCheckbox({ onChange, label })

    const { container } = api
    const checkboxLabel = container.querySelector('label')

    if (!checkboxLabel) {
      return
    }

    fireEvent.click(checkboxLabel)
  })

  test('should render checked checkbox', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should fire onChange event on click on label', () => {
    expect(onChange).toHaveBeenCalled()
  })
})
