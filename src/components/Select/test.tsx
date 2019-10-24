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

test('renders select', () => {
  const { container } = renderSelect({
    options: OPTIONS,
    value: 'val1'
  })

  expect(container).toMatchSnapshot()
})

test('should open menu when focus on select', () => {
  const placeholder = 'Choose an option...'
  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder
  })

  const input = getByPlaceholderText(placeholder)

  fireEvent.focus(input)

  const menu = getByRole('menu')

  expect(menu).toMatchSnapshot()
})

test('should return back selected value when input value is edited', () => {
  const placeholder = 'Choose an option...'
  const expectedText = OPTIONS[1].text

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    value: [OPTIONS[1].value]
  })

  const input = getByPlaceholderText(placeholder)

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 'some text' } })
  fireEvent.blur(input)

  const inputComponent = getByRole('textbox') as HTMLInputElement

  expect(inputComponent.value).toBe(expectedText)
})

test('should reset selected value when input is wiped', () => {
  const placeholder = 'Choose an option...'
  const onChange = jest.fn(event => event.target.value)

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    value: [OPTIONS[1].value],
    onChange
  })

  const input = getByPlaceholderText(placeholder)

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: '' } })
  fireEvent.blur(input)

  expect(onChange).toHaveReturnedWith('')
})

test('should filter options based on entered value to the input field', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder
  })

  const input = getByPlaceholderText(placeholder)

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: '2' } })

  const menu = getByRole('menu')

  expect(menu).toMatchSnapshot()
})

describe('multiple select', () => {
  test('should fire onChange event with the value when clicked on option', async () => {
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

  test('should fire onChange event with the array of values when clicked on option when other selected', async () => {
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

  test('renders list of selected options', async () => {
    const { getByRole } = renderSelect({
      options: OPTIONS,
      multiple: true,
      value: [OPTIONS[0].value, OPTIONS[1].value]
    })

    const inputComponent = getByRole('textbox') as HTMLInputElement

    expect(inputComponent.value).toBe(`${OPTIONS[0].text}, ${OPTIONS[1].text}`)
  })
})
