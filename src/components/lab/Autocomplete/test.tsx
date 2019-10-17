import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../../Picasso'
import Autocomplete, { Props } from './Autocomplete'

const options = [
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
    onSelect
  } = props

  return render(
    <Picasso loadFonts={false}>
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
      />
    </Picasso>
  )
}

afterEach(cleanup)

const placeholder = 'Placeholder text'

describe('Autocomplete', () => {
  describe('static behavior', () => {
    test('default render', () => {
      const { container } = renderAutocomplete({
        placeholder: 'Start typing here...',
        options,
        value: ''
      })

      expect(container).toMatchSnapshot()
    })

    test('render option text when passed `value` prop', () => {
      const { getByDisplayValue } = renderAutocomplete({
        placeholder,
        options,
        value: 'Ukraine'
      })

      const input = getByDisplayValue('Ukraine') as HTMLInputElement

      expect(input.value).toEqual('Ukraine')
    })
  })

  describe('dynamic behavior', () => {
    test('on focus', () => {
      const { getByText, getByDisplayValue, getByRole } = renderAutocomplete({
        placeholder,
        options,
        value: ''
      })

      const input = getByDisplayValue('') as HTMLInputElement

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
        options,
        placeholder,
        value: '',
        onChange
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: 't' } })

      expect(onChange).toBeCalledWith('t')
    })

    test('on select option', () => {
      const onSelect = jest.fn()
      const { getByText, getByPlaceholderText } = renderAutocomplete({
        options,
        placeholder,
        value: '',
        onSelect
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.click(getByText('Slovakia'))

      const optionSlovakia = options.find(option => option.text === 'Slovakia')

      expect(onSelect).toBeCalledWith(optionSlovakia)
    })

    test('on "Esc" key pressed', async () => {
      const onChange = jest.fn()
      const { getByDisplayValue } = renderAutocomplete({
        placeholder,
        options,
        value: 'Croatia',
        onChange
      })

      const input = getByDisplayValue('Croatia') as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.keyDown(input, {
        key: 'Escape'
      })

      // text should be tried to be cleared
      expect(onChange).toBeCalledWith('')
    })

    test('On "Backspace" key pressed with empty text', async () => {
      const { getByDisplayValue, queryByRole } = renderAutocomplete({
        placeholder,
        options,
        value: ''
      })

      const input = getByDisplayValue('') as HTMLInputElement

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
        const { getByText, getByDisplayValue } = renderAutocomplete({
          placeholder,
          options,
          value: ''
        })

        const input = getByDisplayValue('') as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowDown'
        })

        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('press up', () => {
        const { getByText, getByDisplayValue } = renderAutocomplete({
          placeholder,
          options,
          value: ''
        })

        const input = getByDisplayValue('') as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        expect(
          getByText('Ukraine').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('press Enter', () => {
        const onSelect = jest.fn()
        const { getByText, getByDisplayValue } = renderAutocomplete({
          placeholder,
          options,
          value: '',
          onSelect
        })

        const input = getByDisplayValue('') as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowDown'
        })

        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        const optionCroatia = options.find(option => option.text === 'Croatia')

        expect(onSelect).toBeCalledWith(optionCroatia)
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

  test('renders options customly', async () => {
    const api = renderAutocomplete({
      placeholder: 'Start typing here...',
      options,
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

      expect(input.getAttribute('autocomplete')).toBe('none')
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

      expect(input.getAttribute('autocomplete')).toBe('none')
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
