import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Select, { Props } from './Select'

const renderSelect = (props: OmitInternalProps<Props>) => {
  const {
    options,
    native,
    value,
    width,
    placeholder,
    multiple = false,
    onChange = () => {},
    renderOption,
    getDisplayValue,
    ...rest
  } = props

  return render(
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      options={options}
      renderOption={renderOption}
      getDisplayValue={getDisplayValue}
      native={native}
      value={value}
      width={width}
      placeholder={placeholder}
      multiple={multiple}
      onChange={onChange}
    />
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

const getCheckmarkedOptions = (element: Element) =>
  Array.from(element.querySelectorAll('li')).filter((opt: Element) =>
    opt.querySelector('[data-testid="select-checkmark"]')
  ) as Element[]

const getSelectedOprions = (element: Element) =>
  Array.from(element.querySelectorAll('[class$="selected"]')) as Element[]

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

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    value: [OPTIONS[1].value]
  })

  const input = getByPlaceholderText(placeholder) as HTMLInputElement

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 'some text' } })
  fireEvent.blur(input)

  expect(input.value).toBe(expectedText)
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

test('should render options customly', async () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    // eslint-disable-next-line react/display-name
    renderOption: ({ text }) => <div>{`Custom renderered ${text}`}</div>
  })
  const input = getByPlaceholderText(placeholder)

  fireEvent.focus(input)

  const menu = getByRole('menu')

  expect(menu).toMatchSnapshot()
})

test('should keep value in the hidden input when autofill is not enabled explicitly', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    name: 'country'
  })

  const input = getByPlaceholderText(placeholder)

  expect(input).not.toHaveAttribute('name')
  expect(input).toHaveAttribute('autocomplete', 'off')
})

test('should allow browser autofilling by input name', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    name: 'country',
    enableAutofill: true
  })

  const input = getByPlaceholderText(placeholder)

  expect(input).toHaveAttribute('name', 'country')
  expect(input).not.toHaveAttribute('autocomplete')
})

test('should render selected option customly', async () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    value: OPTIONS[0].value,
    placeholder,
    getDisplayValue: option => `${option ? option.text : 'None'} is selected`
  })

  const inputComponent = getByPlaceholderText(placeholder) as HTMLInputElement

  expect(inputComponent.value).toBe(`${OPTIONS[0].text} is selected`)
})

test('should highlight first and selected option when focus on select', () => {
  const placeholder = 'Choose an option...'
  const selectedValue = OPTIONS[2]
  const { container, getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    value: selectedValue.value,
    placeholder
  })

  const input = getByPlaceholderText(placeholder)
  fireEvent.focus(input)

  const selectedOptions = getSelectedOprions(container)
  expect(selectedOptions[0].textContent).toMatch(OPTIONS[0].text)
  expect(selectedOptions[1].textContent).toMatch(OPTIONS[2].text)
})

test('should not checkmark user selected options', () => {
  const placeholder = 'Choose an option...'
  const selectedValue = OPTIONS[1]
  const { container, getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    value: selectedValue.value,
    placeholder
  })

  const input = getByPlaceholderText(placeholder)
  fireEvent.focus(input)

  const checkmarkedOptions = getCheckmarkedOptions(container)

  expect(checkmarkedOptions.length).toBe(0)
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
    const placeholder = 'choose'

    const { getByPlaceholderText } = renderSelect({
      placeholder,
      options: OPTIONS,
      multiple: true,
      value: [OPTIONS[0].value, OPTIONS[1].value]
    })

    const inputComponent = getByPlaceholderText(placeholder) as HTMLInputElement

    expect(inputComponent.value).toBe(`${OPTIONS[0].text}, ${OPTIONS[1].text}`)
  })

  test('should highlight first option only when focus on select', () => {
    const placeholder = 'Choose an option...'
    const selectedOptions = [OPTIONS[2]]
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: selectedOptions.map(opt => opt.value),
      placeholder,
      multiple: true
    })

    const input = getByPlaceholderText(placeholder)
    fireEvent.focus(input)

    const selectedItems = container.querySelectorAll('[class$="selected"]')
    expect(selectedItems.length).toBe(1)
    expect(selectedItems.item(0).textContent).toMatch(OPTIONS[0].text)
  })

  test('should checkmark user selected options', () => {
    const placeholder = 'Choose an option...'
    const selectedOptions = [OPTIONS[2]]
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: selectedOptions.map(opt => opt.value),
      placeholder,
      multiple: true
    })

    const input = getByPlaceholderText(placeholder)
    fireEvent.focus(input)

    const checkmarkedOptions = getCheckmarkedOptions(container)

    expect(checkmarkedOptions.length).toBe(1)
    expect(checkmarkedOptions[0].textContent).toMatch(OPTIONS[2].text)
  })
})
