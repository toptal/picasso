/* eslint-disable max-lines */

import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Select, { Props } from './Select'

jest.mock('ap-style-title-case')

const renderSelect = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
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
    />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

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

const OPTIONS_WITH_DESCRIPTIONS = [
  {
    key: 1,
    value: 'val1',
    text: 'text1',
    description: 'description1'
  },
  {
    key: 2,
    value: 'val2',
    text: 'text2',
    description: 'description2'
  },
  {
    key: 3,
    value: 'val3',
    text: 'text3',
    description: 'description3'
  }
]

const getSelectedOptions = (element: Element) =>
  Array.from(element.querySelectorAll('[class$="selected"]')) as Element[]

it('renders native select', () => {
  const { container, getByText } = renderSelect({
    native: true,
    options: OPTIONS,
    placeholder: 'Choose an option...',
    value: 'val1'
  })

  const emptyOption = getByText('Choose an option...')

  expect(emptyOption).toBeDisabled()

  expect(container).toMatchSnapshot()
})

it('renders native select with the empty option enabled when enableReset is `true`', () => {
  const { container, getByText } = renderSelect({
    enableReset: true,
    native: true,
    options: OPTIONS,
    placeholder: 'Choose an option...',
    value: 'val1'
  })

  const emptyOption = getByText('Choose an option...')

  expect(emptyOption).not.toBeDisabled()

  expect(container).toMatchSnapshot()
})

it('renders select', () => {
  const { container } = renderSelect({
    options: OPTIONS,
    value: 'val1'
  })

  expect(container).toMatchSnapshot()
})

it('should NOT open menu when focus on select if there is NO search', () => {
  const placeholder = 'Choose an option...'
  const searchThreshold = OPTIONS.length + 1

  const { getByPlaceholderText, queryByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchThreshold
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.focus(selectInput)

  expect(queryByRole('menu')).not.toBeInTheDocument()
})

it('should open menu when click on select if there is NO search', () => {
  const placeholder = 'Choose an option...'
  const searchThreshold = OPTIONS.length + 1

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchThreshold
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.click(selectInput)

  expect(getByRole('menu')).toBeInTheDocument()
})

it('should NOT open menu when focus on select if there is a search', () => {
  const placeholder = 'Choose an option...'
  const searchThreshold = OPTIONS.length - 1

  const { getByPlaceholderText, queryByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchThreshold
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.focus(selectInput)

  expect(queryByRole('menu')).not.toBeInTheDocument()
})

it('should return back selected value when input value is edited', () => {
  const placeholder = 'Choose an option...'
  const expectedText = OPTIONS[1].text
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    value: [OPTIONS[1].value],
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder) as HTMLInputElement

  fireEvent.focus(selectInput)
  fireEvent.keyDown(selectInput, { key: ' ', code: '{space}' })

  const searchInput = getByPlaceholderText(searchPlaceholder)

  fireEvent.focus(searchInput)
  fireEvent.change(searchInput, { target: { value: 'some text' } })
  fireEvent.blur(searchInput)

  expect(selectInput.value).toBe(expectedText)
})

it('should filter options based on entered value to the input field', () => {
  const placeholder = 'Choose an option...'
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText, getAllByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder) as HTMLInputElement

  fireEvent.focus(selectInput)
  fireEvent.keyDown(selectInput, { key: 'Enter', code: 'Enter' })

  const searchInput = getByPlaceholderText(searchPlaceholder)

  fireEvent.focus(searchInput)
  fireEvent.change(searchInput, { target: { value: '3' } })

  expect(getAllByRole('option')).toHaveLength(1)
})

it('should show all options when input value is wiped', () => {
  const placeholder = 'Choose an option...'
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText, getAllByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder) as HTMLInputElement

  fireEvent.click(selectInput)

  const searchInput = getByPlaceholderText(searchPlaceholder)

  fireEvent.focus(searchInput)
  fireEvent.change(searchInput, { target: { value: '3' } })
  fireEvent.change(searchInput, { target: { value: '' } })

  expect(getAllByRole('option')).toHaveLength(OPTIONS.length)
})

it('should focus search input when tab is pressed', () => {
  const placeholder = 'Choose an option...'
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.focus(selectInput)
  fireEvent.keyDown(selectInput, { key: ' ', code: '{space}' })
  fireEvent.keyDown(selectInput, {
    key: 'Tab',
    code: 'Tab'
  })

  const searchInput = getByPlaceholderText(searchPlaceholder)

  expect(searchInput).toEqual(document.activeElement)
})

it('should focus search input when a character is entered', () => {
  const placeholder = 'Choose an option...'
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.focus(selectInput)
  fireEvent.keyDown(selectInput, { key: ' ', code: '{space}' })
  fireEvent.keyDown(selectInput, {
    key: '2',
    code: 'Digit2'
  })

  const searchInput = getByPlaceholderText(
    searchPlaceholder
  ) as HTMLInputElement

  expect(searchInput).toEqual(document.activeElement)
})

it('should render noOptionText if the value entered does not match any of the options', () => {
  const placeholder = 'Choose an option...'
  const noOptionsText = 'No results'
  const searchPlaceholder = 'Search for an option'

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    noOptionsText,
    placeholder,
    searchPlaceholder,
    searchThreshold: -1
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.click(selectInput)

  const searchInput = getByPlaceholderText(searchPlaceholder)

  fireEvent.focus(searchInput)
  fireEvent.change(searchInput, { target: { value: 'non-existent value' } })

  const menu = getByRole('menu')

  expect(menu).toHaveTextContent(noOptionsText)
})

it('should render description', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS_WITH_DESCRIPTIONS,
    placeholder
  })
  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.click(selectInput)

  const menu = getByRole('menu')

  expect(menu).toMatchSnapshot()
})

it('should render options customly', async () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText, getByRole } = renderSelect({
    options: OPTIONS,
    placeholder,
    // eslint-disable-next-line react/display-name
    renderOption: ({ text }) => <div>{`Custom renderered ${text}`}</div>
  })
  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.click(selectInput)

  const menu = getByRole('menu')

  expect(menu).toMatchSnapshot()
})

it('should keep value in the hidden input when autofill is not enabled explicitly', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    name: 'country'
  })

  const selectInput = getByPlaceholderText(placeholder)

  expect(selectInput).not.toHaveAttribute('name')
  expect(selectInput).toHaveAttribute('autocomplete', 'off')
})

it('should allow browser autofilling by input name', () => {
  const placeholder = 'Choose an option...'

  const { getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    placeholder,
    name: 'country',
    enableAutofill: true
  })

  const selectInput = getByPlaceholderText(placeholder)

  expect(selectInput).toHaveAttribute('name', 'country')
  expect(selectInput).not.toHaveAttribute('autocomplete')
})

it('should render selected option customly', async () => {
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

it('should highlight selected option when open select options menu', () => {
  const placeholder = 'Choose an option...'
  const selectedValue = OPTIONS[2]
  const { container, getByPlaceholderText } = renderSelect({
    options: OPTIONS,
    value: selectedValue.value,
    placeholder
  })

  const selectInput = getByPlaceholderText(placeholder)

  fireEvent.click(selectInput)

  const selectedOptions = getSelectedOptions(container)

  expect(selectedOptions).toHaveLength(1)
  expect(selectedOptions[0].textContent).toMatch(OPTIONS[2].text)
})

describe('multiple select', () => {
  it('should fire onChange event with the value when clicked on option', async () => {
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

  it('should fire onChange event with the array of values when clicked on option when other selected', async () => {
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

  it('renders list of selected options', async () => {
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

  describe('when open select', () => {
    it('should highlight first option if nothing is selected', () => {
      const placeholder = 'Choose an option...'
      const { getByText, getByPlaceholderText } = renderSelect({
        options: OPTIONS,
        value: [],
        placeholder,
        multiple: true
      })

      const selectInput = getByPlaceholderText(placeholder)

      fireEvent.click(selectInput)

      expect(
        getByText(OPTIONS[0].text)
          .closest('li')
          ?.getAttribute('aria-selected')
      ).toBe('true')
    })

    it('should highlight selected option when only one option is selected', () => {
      const placeholder = 'Choose an option...'
      const selectedOptions = [OPTIONS[2]]
      const { getByText, getByPlaceholderText } = renderSelect({
        options: OPTIONS,
        value: selectedOptions.map(opt => opt.value),
        placeholder,
        multiple: true
      })

      const selectInput = getByPlaceholderText(placeholder)

      fireEvent.click(selectInput)

      expect(
        getByText(selectedOptions[0].text)
          .closest('li')
          ?.getAttribute('aria-selected')
      ).toBe('true')
    })

    it('should highlight first option when multiple options are selected', () => {
      const placeholder = 'Choose an option...'
      const selectedOptions = [OPTIONS[1], OPTIONS[2]]
      const { getByText, getByPlaceholderText } = renderSelect({
        options: OPTIONS,
        value: selectedOptions.map(opt => opt.value),
        placeholder,
        multiple: true
      })

      const selectInput = getByPlaceholderText(placeholder)

      fireEvent.click(selectInput)

      expect(
        getByText(OPTIONS[0].text)
          .closest('li')
          ?.getAttribute('aria-selected')
      ).toBe('true')
    })
  })

  it('should checkmark user selected options', () => {
    const placeholder = 'Choose an option...'
    const selectedOptions = [OPTIONS[0], OPTIONS[2]]
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: selectedOptions.map(opt => opt.value),
      placeholder,
      multiple: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    expect(container).toMatchSnapshot()
  })

  it('should not transform options text to title case when Picasso titleCase property is true', () => {
    const placeholder = 'Choose an option...'
    const { getByPlaceholderText } = renderSelect(
      {
        options: OPTIONS,
        value: OPTIONS[0].value,
        placeholder
      },
      {
        titleCase: true
      }
    )

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.focus(selectInput)

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  it('renders selected option when options set dynamically', async () => {
    const placeholder = 'Choose an option...'
    const selectedOption = OPTIONS[0]
    const initialProps = {
      placeholder,
      options: [],
      value: selectedOption.value
    }
    const { rerender, getByPlaceholderText } = renderSelect(initialProps)

    const selectInput = getByPlaceholderText(placeholder) as HTMLInputElement

    expect(selectInput.value).not.toBe(selectedOption.text)

    rerender(
      <Select
        options={OPTIONS}
        value={initialProps.value}
        placeholder={initialProps.placeholder}
      />
    )

    expect(selectInput.value).toBe(selectedOption.text)
  })
})
