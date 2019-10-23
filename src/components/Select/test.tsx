import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import Select, { Props } from './Select'

const renderSelect = (props: OmitInternalProps<Props>) => {
  const {
    options,
    native,
    value,
    width,
    placeholder,
    multiple = false,
    onChange = () => {}
  } = props

  return render(
    <Picasso loadFonts={false}>
      <Select
        options={options}
        native={native}
        value={value}
        width={width}
        placeholder={placeholder}
        multiple={multiple}
        onChange={onChange}
      />
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

test('multi select can generate series of onChange events', async () => {
  const onChange = jest.fn(event => event.target.value)
  const placeholder = 'choose'

  const { getByPlaceholderText, getByText } = renderSelect({
    options: OPTIONS,
    placeholder,
    multiple: true,
    onChange
  })

  fireEvent.click(getByPlaceholderText(placeholder))
  fireEvent.click(getByText(OPTIONS[0].text))
  fireEvent.click(getByText(OPTIONS[1].text))

  expect(onChange).toHaveNthReturnedWith(1, [OPTIONS[0].value])
  expect(onChange).toHaveNthReturnedWith(2, [
    OPTIONS[0].value,
    OPTIONS[1].value
  ])
})

test('multi select renders list of selected options', async () => {
  const { queryByDisplayValue } = renderSelect({
    options: OPTIONS,
    multiple: true,
    value: [OPTIONS[0].value, OPTIONS[1].value]
  })

  expect(
    queryByDisplayValue(`${OPTIONS[0].text}, ${OPTIONS[1].text}`)
  ).toBeDefined()
})
