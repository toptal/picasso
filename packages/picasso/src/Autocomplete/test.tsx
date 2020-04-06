import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Autocomplete, { Props } from './Autocomplete'

const testOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const renderAutocomplete = (props: OmitInternalProps<Props>) => {
  const {
    placeholder,
    options,
    value,
    inputComponent,
    noOptionsText,
    renderOption,
    enableAutofill,
    autoComplete,
    onChange,
    onSelect,
    onOtherOptionSelect
  } = props

  return render(
    <Autocomplete
      placeholder={placeholder}
      options={options}
      value={value}
      inputComponent={inputComponent}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      enableAutofill={enableAutofill}
      autoComplete={autoComplete}
      onChange={onChange}
      onSelect={onSelect}
      onOtherOptionSelect={onOtherOptionSelect}
    />
  )
}

const placeholder = 'Placeholder text'

describe('Autocomplete', () => {
  describe('static behavior', () => {
    test('default render', () => {
      const { container } = renderAutocomplete({
        placeholder: 'Start typing here...',
        options: testOptions,
        value: ''
      })

      expect(container).toMatchSnapshot()
    })

    test('render option text when passed `value` prop', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder,
        options: testOptions,
        value: 'Ukraine'
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      expect(input.value).toEqual('Ukraine')
    })
  })

  describe('dynamic behavior', () => {
    test('on focus', () => {
      const { getByText, getByPlaceholderText, getByRole } = renderAutocomplete(
        {
          placeholder,
          options: testOptions,
          value: ''
        }
      )

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)

      const firstOptionListItem = getByText('Belarus').parentElement
      const menu = getByRole('menu')

      // first option is highlighted
      expect(firstOptionListItem!.getAttribute('aria-selected')).toBe('true')
      // menu contains all the options displayed
      expect(menu).toMatchSnapshot()
    })

    test('on type', () => {
      const onChange = jest.fn()
      const { getByPlaceholderText } = renderAutocomplete({
        options: testOptions,
        placeholder,
        value: '',
        onChange
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: 't' } })

      expect(onChange).toBeCalledWith('t', { isSelected: false })
    })

    test('on select option', () => {
      const onSelect = jest.fn()
      const onChange = jest.fn()
      const { getByText, getByPlaceholderText } = renderAutocomplete({
        options: testOptions,
        placeholder,
        value: '',
        onSelect,
        onChange
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.click(getByText('Slovakia'))

      const optionSlovakia = testOptions.find(
        option => option.text === 'Slovakia'
      )

      expect(onSelect).toBeCalledWith(optionSlovakia)
      expect(onChange).toBeCalledWith('Slovakia', { isSelected: true })
    })

    test('on "Esc" key pressed', async () => {
      const onChange = jest.fn()
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder,
        options: testOptions,
        value: 'Croatia',
        onChange
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.keyDown(input, {
        key: 'Escape'
      })

      // text should be tried to be cleared
      expect(onChange).toBeCalledWith('', { isSelected: false })
    })

    test('On "Backspace" key pressed with empty text', async () => {
      const { getByPlaceholderText, queryByRole } = renderAutocomplete({
        placeholder,
        options: testOptions,
        value: ''
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.keyDown(input, {
        key: 'Backspace'
      })

      const menu = queryByRole('menu')
      // should hide the options list

      expect(menu).toBeNull()
    })

    describe('On "arrow up/down" key press', () => {
      test('press down', () => {
        const { getByText, getByPlaceholderText } = renderAutocomplete({
          placeholder,
          options: testOptions,
          value: ''
        })

        const input = getByPlaceholderText(placeholder) as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowDown'
        })

        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('press up', () => {
        const { getByText, getByPlaceholderText } = renderAutocomplete({
          placeholder,
          options: testOptions,
          value: ''
        })

        const input = getByPlaceholderText(placeholder) as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        expect(
          getByText('Ukraine').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('when entered other option and press Enter then onOtherOptionSelect is called', () => {
        const onOtherOptionSelect = jest.fn()
        const { getByPlaceholderText } = renderAutocomplete({
          placeholder,
          options: [], // simulate situation when no option matches the input
          value: 'Other option!',
          onOtherOptionSelect
        })

        const input = getByPlaceholderText(placeholder) as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(onOtherOptionSelect).toBeCalledWith('Other option!')
      })
    })
  })

  test('with "inputComponent" prop', async () => {
    const { getByPlaceholderText } = renderAutocomplete({
      // eslint-disable-next-line react/display-name
      inputComponent: () => <input placeholder='myCustomInputComponent' />,
      value: ''
    })

    const input = getByPlaceholderText('myCustomInputComponent')

    expect(input).not.toBeNull()
  })

  test('with "noOptionsText" prop', async () => {
    const noOptionsText = 'my no options text'
    const { getByText, getByPlaceholderText } = renderAutocomplete({
      placeholder,
      noOptionsText,
      value: 'non existing option'
    })

    const input = getByPlaceholderText(placeholder) as HTMLInputElement

    fireEvent.focus(input)

    expect(getByText(noOptionsText)).not.toBeNull()
  })

  test('when "options" prop is null, no options are shown on focus', () => {
    const PLACEHOLDER_TEXT = 'Start typing here...'
    const NO_OPTIONS_TEXT = 'No options'

    const { getByPlaceholderText, queryByText } = renderAutocomplete({
      placeholder: PLACEHOLDER_TEXT,
      noOptionsText: NO_OPTIONS_TEXT,
      value: '',
      options: null
    })

    const input = getByPlaceholderText(PLACEHOLDER_TEXT)

    fireEvent.focus(input)
    expect(queryByText(NO_OPTIONS_TEXT)).toBeNull()
  })

  test('renders options customly', async () => {
    const api = renderAutocomplete({
      placeholder: 'Start typing here...',
      options: testOptions,
      value: '',
      // eslint-disable-next-line react/display-name
      renderOption: () => <div>Custom renderer</div>
    })
    const input = api.getByPlaceholderText('Start typing here...')

    fireEvent.focus(input)
    expect(api.baseElement.textContent).toContain('Custom renderer')
  })

  describe('Autofill', () => {
    test('when autoComplete value is not passed and autofill is not enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: ''
      })
      const input = getByPlaceholderText('Start typing here...')

      expect(input.getAttribute('autocomplete')).toBe('off')
    })

    test('when autoComplete value is not passed and autofill is enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: '',
        enableAutofill: true
      })
      const input = getByPlaceholderText('Start typing here...')

      // disabled because of default value in Input
      expect(input.getAttribute('autocomplete')).toBe('none')
    })

    test('when autoComplete value is passed and autofill is not enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: '',
        autoComplete: 'country-name'
      })
      const input = getByPlaceholderText('Start typing here...')

      // user should be able to override autocomplete value if needed
      // even when autoComplete itself is not enabled
      expect(input.getAttribute('autocomplete')).toBe('country-name')
    })

    test('when autoComplete value is passed and autofill is enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: '',
        enableAutofill: true,
        autoComplete: 'country-name'
      })
      const input = getByPlaceholderText('Start typing here...')

      expect(input.getAttribute('autocomplete')).toBe('country-name')
    })
  })
})
