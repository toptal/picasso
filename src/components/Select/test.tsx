import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso, { UserDefinedProps } from '../Picasso'
import Select, { Props } from './Select'

const renderSelect = (props: UserDefinedProps<Props>) => {
  const { options, native, value, width } = props

  return render(
    <Picasso loadFonts={false}>
      <Select options={options} native={native} value={value} width={width} />
    </Picasso>
  )
}

const OPTIONS = [
  {
    key: 1,
    value: 'val1',
    text: 'text1'
  },
  {
    key: 2,
    value: 'val2',
    text: 'text2'
  },
  {
    key: 3,
    value: 'val3',
    text: 'text3'
  }
]

afterEach(cleanup)

test('renders native select', () => {
  const { container } = renderSelect({
    native: true,
    options: OPTIONS,
    value: 'val1'
  })

  expect(container).toMatchSnapshot()
})

test('renders dropdown select', () => {
  const { container } = renderSelect({
    options: OPTIONS,
    value: 'val1'
  })

  expect(container).toMatchSnapshot()
})
