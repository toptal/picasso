/* eslint-disable max-lines */
import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import NonNativeSelect from './NonNativeSelect'
import { SelectProps } from '../Select'

jest.mock('ap-style-title-case')

const renderSelect = (
  props: OmitInternalProps<SelectProps>,
  picassoConfig?: PicassoConfig
) => {
  const {
    options,
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
    <NonNativeSelect
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      options={options}
      renderOption={renderOption}
      getDisplayValue={getDisplayValue}
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

const getOptions = (element: Element) =>
  Array.from(element.querySelectorAll('[role="option"]')) as Element[]

const getHighlightedOption = (element: Element) =>
  element.querySelector('[role="option"][data-highlighted="true"]')

// eslint-disable-next-line max-lines-per-function
describe('NonNativeSelect', () => {
  it('renders', () => {
    const { container } = renderSelect({
      options: OPTIONS,
      value: 'val1'
    })

    expect(container).toMatchSnapshot()
  })

  it('opens menu on select click', () => {
    const placeholder = 'Choose an option...'

    const { getByPlaceholderText, getByRole } = renderSelect({
      options: OPTIONS,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    expect(getByRole('listbox')).toBeInTheDocument()
  })

  it('does not open menu on select focus', () => {
    const placeholder = 'Choose an option...'

    const { getByPlaceholderText, queryByRole } = renderSelect({
      options: OPTIONS,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.focus(selectInput)

    expect(queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens menu when select is focused and arrow down is pressed', () => {
    const placeholder = 'Choose an option...'

    const { getByPlaceholderText, queryByRole } = renderSelect({
      options: OPTIONS,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.focus(selectInput)
    fireEvent.keyDown(selectInput, { key: 'ArrowDown', code: 'ArrowDown' })

    expect(queryByRole('listbox')).toBeInTheDocument()
  })

  it('shows loader instead of options when opened in loading state', () => {
    const placeholder = 'Choose an option...'

    const {
      getByPlaceholderText,
      queryByTestId,
      queryAllByRole
    } = renderSelect({
      options: OPTIONS,
      placeholder,
      loading: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    expect(queryAllByRole('option')).toHaveLength(0)
    expect(queryByTestId('loader')).toBeInTheDocument()
  })

  it('filters options based on entered value to the input field', () => {
    const placeholder = 'Choose an option...'
    const searchPlaceholder = 'Search for an option'

    const { getByPlaceholderText, getByRole, getAllByRole } = renderSelect({
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

    const menu = getByRole('listbox')

    expect(menu).not.toHaveTextContent('Showing only first')
  })

  it('shows all options when input value is wiped', () => {
    const placeholder = 'Choose an option...'
    const searchPlaceholder = 'Search for an option'

    const { getByPlaceholderText, getAllByRole, getByRole } = renderSelect({
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
    expect(getAllByRole('option')).toHaveLength(1)

    fireEvent.change(searchInput, { target: { value: '' } })
    expect(getAllByRole('option')).toHaveLength(OPTIONS.length)

    const menu = getByRole('listbox')

    expect(menu).not.toHaveTextContent('Showing only first')
  })

  it('focuses search input when tab is pressed', () => {
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
    fireEvent.keyDown(selectInput, { key: ' ', code: 'Space' })
    fireEvent.keyDown(selectInput, {
      key: 'Tab',
      code: 'Tab'
    })

    const searchInput = getByPlaceholderText(searchPlaceholder)

    expect(searchInput).toEqual(document.activeElement)
  })

  it('focuses search input when a character is entered', () => {
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
    fireEvent.keyDown(selectInput, { key: ' ', code: 'Space' })
    fireEvent.keyDown(selectInput, {
      key: '2',
      code: 'Digit2'
    })

    const searchInput = getByPlaceholderText(
      searchPlaceholder
    ) as HTMLInputElement

    expect(searchInput).toEqual(document.activeElement)
  })

  it('closes menu when an option is selected', () => {
    const placeholder = 'Choose an option...'
    const { getByPlaceholderText, getByText, queryByRole } = renderSelect({
      options: OPTIONS,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)
    expect(queryByRole('listbox')).toBeInTheDocument()

    fireEvent.click(getByText(OPTIONS[0].text))
    expect(queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes opened menu after a click on select', () => {
    const placeholder = 'Choose an option...'
    const { getByPlaceholderText, queryByRole } = renderSelect({
      options: OPTIONS,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)
    expect(queryByRole('listbox')).toBeInTheDocument()
    fireEvent.click(selectInput)
    expect(queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('renders noOptionText if there are no matching options', () => {
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

    const menu = getByRole('listbox')

    expect(menu).toHaveTextContent(noOptionsText)

    expect(menu).not.toHaveTextContent('Showing only first')
  })

  it('renders description', () => {
    const placeholder = 'Choose an option...'

    const { getByPlaceholderText, getByRole } = renderSelect({
      options: OPTIONS_WITH_DESCRIPTIONS,
      placeholder
    })
    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const menu = getByRole('listbox')

    const options = getOptions(menu)

    options.forEach((option, index) =>
      expect(option.textContent).toEqual(
        `${OPTIONS_WITH_DESCRIPTIONS[index].text}${OPTIONS_WITH_DESCRIPTIONS[index].description}`
      )
    )
    expect(menu).toMatchSnapshot()
  })

  it('renders custom options', () => {
    const placeholder = 'Choose an option...'

    const { getByPlaceholderText, getByRole, getByTestId } = renderSelect({
      options: OPTIONS,
      placeholder,
      // eslint-disable-next-line react/display-name
      renderOption: ({ key, text }) => (
        <div data-testid={`custom-option-${key}`}>{text}</div>
      )
    })
    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const menu = getByRole('listbox')

    OPTIONS.forEach(option =>
      expect(getByTestId(`custom-option-${option.key}`)).toBeInTheDocument()
    )

    expect(menu).toMatchSnapshot()
  })

  it('keeps value in the hidden input when autofill is not enabled explicitly', () => {
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

  it('allows browser autofilling by input name', () => {
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

  it('renders custom selected option', () => {
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

  it('highlights selected option on menu appear', () => {
    const placeholder = 'Choose an option...'
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: OPTIONS[2].value,
      placeholder
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const highlightedOption = getHighlightedOption(container)

    expect(highlightedOption).not.toBeNull()
    expect(highlightedOption?.textContent).toEqual(OPTIONS[2].text)
  })
})

describe('NonNativeSelect (multiple)', () => {
  const spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('fires onChange event with a single option', () => {
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

  it('fires onChange event with multiple options', () => {
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

  it('renders list of selected options', () => {
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

  it('highlights first option if nothing is selected', () => {
    const placeholder = 'Choose an option...'
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: [],
      placeholder,
      multiple: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const highlightedOption = getHighlightedOption(container)

    expect(highlightedOption).not.toBeNull()
    expect(highlightedOption?.textContent).toEqual(OPTIONS[0].text)
  })

  it('highlights selected option when only one option is selected', () => {
    const placeholder = 'Choose an option...'
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      placeholder,
      value: [OPTIONS[2].value],
      multiple: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const highlightedOption = getHighlightedOption(container)

    expect(highlightedOption).not.toBeNull()
    expect(highlightedOption?.textContent).toEqual(OPTIONS[2].text)
  })

  it('highlights first option when multiple options are selected', () => {
    const placeholder = 'Choose an option...'
    const { container, getByPlaceholderText } = renderSelect({
      options: OPTIONS,
      value: [OPTIONS[1].value, OPTIONS[2].value],
      placeholder,
      multiple: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    const highlightedOption = getHighlightedOption(container)

    expect(highlightedOption).not.toBeNull()
    expect(highlightedOption?.textContent).toEqual(OPTIONS[0].text)
  })

  it('does not close when an option is selected', () => {
    const placeholder = 'Choose an option...'
    const { getByPlaceholderText, getByText, queryByRole } = renderSelect({
      options: OPTIONS,
      placeholder,
      multiple: true
    })

    const selectInput = getByPlaceholderText(placeholder)

    fireEvent.click(selectInput)

    expect(queryByRole('listbox')).toBeInTheDocument()

    fireEvent.click(getByText(OPTIONS[0].text))

    expect(queryByRole('listbox')).toBeInTheDocument()
  })

  it('does not transform options text to title case when Picasso titleCase property is true', () => {
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

  it('renders selected option when options set dynamically', () => {
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
      <NonNativeSelect
        options={OPTIONS}
        value={initialProps.value}
        placeholder={initialProps.placeholder}
      />
    )

    expect(selectInput.value).toBe(selectedOption.text)
  })

  it('renders reduced list of options if there are too many items to display', () => {
    const placeholder = 'Choose an option...'
    const searchPlaceholder = 'Search for an option'

    const optionsGenerator = (value: number, key: number) => ({
      value: `${key + 1}`,
      text: `Option ${key + 1}`
    })

    const { getByPlaceholderText, getByRole, getAllByRole } = renderSelect({
      options: Array.from({ length: 100 }, optionsGenerator),
      placeholder,
      searchPlaceholder,
      limit: 5,
      searchThreshold: -1
    })

    const selectInput = getByPlaceholderText(placeholder) as HTMLInputElement

    fireEvent.focus(selectInput)
    fireEvent.keyDown(selectInput, { key: 'Enter', code: 'Enter' })

    const searchInput = getByPlaceholderText(searchPlaceholder)

    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 'Option' } })

    expect(getAllByRole('option')).toHaveLength(5)

    const menu = getByRole('listbox')

    expect(menu).toHaveTextContent('Showing only first 5 of 100 items')
  })
})
