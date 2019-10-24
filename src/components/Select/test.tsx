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

test('multi select returns value in onChange event', async () => {
  const onChange = jest.fn(event => event.target.value)
  const placeholder = 'choose'
  const expectedValue = [OPTIONS[0].value]

  const { getByPlaceholderText, getByText } = renderSelect({
    options: OPTIONS,
    placeholder,
    multiple: true,
    onChange
  })

  fireEvent.click(getByPlaceholderText(placeholder))
  fireEvent.click(getByText(OPTIONS[0].text))

  expect(onChange).toHaveReturnedWith(expectedValue)
})

test('multi select adds value to the array of selected values in onChange event', async () => {
  const onChange = jest.fn(event => event.target.value)
  const placeholder = 'choose'
  const currentValue = [OPTIONS[0].value]
  const expectedValue = [OPTIONS[0].value, OPTIONS[1].value]

  const { getByPlaceholderText, getByText } = renderSelect({
    options: OPTIONS,
    placeholder,
    multiple: true,
    onChange,
    value: currentValue
  })

  fireEvent.click(getByPlaceholderText(placeholder))
  fireEvent.click(getByText(OPTIONS[1].text))

  expect(onChange).toHaveReturnedWith(expectedValue)
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
