import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup } from 'react-testing-library'

import Select from './index'

const renderSelect = (props = {}) => {
  return render(<Select {...props} value='val1' />)
}

const OPTIONS = [
  {
    value: 'val1',
    text: 'text1'
  },
  {
    value: 'val2',
    text: 'text2'
  },
  {
    value: 'val3',
    text: 'text3'
  }
]

afterEach(cleanup)

test('renders native select', () => {
  const { container } = renderSelect({
    native: true,
    options: OPTIONS
  })

  expect(container).toMatchSnapshot()
})

test('renders dropdown select', () => {
  const { container } = renderSelect({
    options: OPTIONS
  })

  expect(container).toMatchSnapshot()
})
