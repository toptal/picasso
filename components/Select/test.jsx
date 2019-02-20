import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../Picasso'
import Select from './index'

const renderSelect = (props = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Select {...props} value='val1' />
    </Picasso>
  )
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
