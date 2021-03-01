import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Autocomplete, { Props } from './Autocomplete'

jest.mock('ap-style-title-case')

const testOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const renderAutocomplete = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  return render(<Autocomplete {...props} />, undefined, picassoConfig)
}

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

const placeholder = 'Placeholder text'

describe('Autocomplete', () => {
  describe('static behavior', () => {
    it('renders', () => {
      const { container } = renderAutocomplete({
        placeholder: 'Start typing here...',
        options: testOptions,
        value: ''
      })

      expect(container).toMatchSnapshot()
    })

    it('render option text when passed `value` prop', () => {
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
    it('on focus', () => {
      const onFocus = jest.fn()
      const { getByPlaceholderText, queryByRole } = renderAutocomplete({
        placeholder,
        options: testOptions,
        value: '',
        onFocus
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.focus(input)

      // calls onFocus handler
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(queryByRole('menu')).not.toBeInTheDocument()

      fireEvent.click(input)
      expect(queryByRole('menu')).toMatchSnapshot()
    })

    it('on type', () => {
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

      expect(onChange).toHaveBeenCalledWith('t', { isSelected: false })
    })

    it('on select option', () => {
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

      fireEvent.click(input)

      fireEvent.click(getByText('Slovakia'))

      const optionSlovakia = testOptions.find(
        option => option.text === 'Slovakia'
      )

      expect(onSelect).toHaveBeenCalledWith(optionSlovakia, expect.anything())
      expect(onChange).toHaveBeenCalledWith('Slovakia', { isSelected: true })
    })

    it('on "Esc" key pressed', async () => {
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
      expect(onChange).toHaveBeenCalledWith('', { isSelected: false })
    })

    it('On "Backspace" key pressed with empty text', async () => {
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

    describe('on "arrow up/down" key press', () => {
      it('press down', () => {
        const { getByText, getByPlaceholderText } = renderAutocomplete({
          placeholder,
          options: testOptions,
          value: ''
        })

        const input = getByPlaceholderText(placeholder) as HTMLInputElement

        fireEvent.click(input)

        expect(
          getByText('Belarus')
            .closest('li')
            ?.getAttribute('aria-selected')
        ).toBe('true')

        fireEvent.keyDown(input, {
          key: 'ArrowDown'
        })

        expect(
          getByText('Croatia')
            .closest('li')
            ?.getAttribute('aria-selected')
        ).toBe('true')
      })

      it('press up', () => {
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
          getByText('Ukraine')
            .closest('li')
            ?.getAttribute('aria-selected')
        ).toBe('true')
      })

      it('when entered other option and press Enter then onOtherOptionSelect is called', () => {
        const onOtherOptionSelect = jest.fn()
        const { getByPlaceholderText } = renderAutocomplete({
          placeholder,
          options: [], // simulate situation when no option matches the input
          value: 'Other option!',
          onOtherOptionSelect
        })

        const input = getByPlaceholderText(placeholder) as HTMLInputElement

        fireEvent.focus(input)
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' })

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(onOtherOptionSelect).toHaveBeenCalledWith(
          'Other option!',
          expect.anything()
        )
      })
    })
  })

  it('with "inputComponent" prop', async () => {
    const { getByPlaceholderText } = renderAutocomplete({
      // eslint-disable-next-line react/display-name
      inputComponent: () => <input placeholder='myCustomInputComponent' />,
      value: ''
    })

    const input = getByPlaceholderText('myCustomInputComponent')

    expect(input).not.toBeNull()
  })

  it('with "noOptionsText" prop', async () => {
    const noOptionsText = 'my no options text'
    const { getByText, getByPlaceholderText } = renderAutocomplete({
      placeholder,
      noOptionsText,
      value: 'non existing option'
    })

    const input = getByPlaceholderText(placeholder) as HTMLInputElement

    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(getByText(noOptionsText)).not.toBeNull()
  })

  it('when "options" prop is null, no options are shown on focus', () => {
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

  it('renders options customly', async () => {
    const api = renderAutocomplete({
      placeholder: 'Start typing here...',
      options: testOptions,
      value: '',
      // eslint-disable-next-line react/display-name
      renderOption: () => <div>Custom renderer</div>
    })
    const input = api.getByPlaceholderText('Start typing here...')

    fireEvent.click(input)
    expect(api.baseElement.textContent).toContain('Custom renderer')
  })

  it('should not transform options text to title case when Picasso titleCase property is true', () => {
    const placeholder = 'Choose an option...'
    const { getByPlaceholderText } = renderAutocomplete(
      {
        options: testOptions,
        value: '',
        placeholder
      },
      {
        titleCase: true
      }
    )

    const input = getByPlaceholderText(placeholder)

    fireEvent.focus(input)

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('Autofill', () => {
    it('when autoComplete value is not passed and autofill is not enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: ''
      })
      const input = getByPlaceholderText('Start typing here...')

      expect(input.getAttribute('autocomplete')).toBe('off')
    })

    it('when autoComplete value is not passed and autofill is enabled', () => {
      const { getByPlaceholderText } = renderAutocomplete({
        placeholder: 'Start typing here...',
        value: '',
        enableAutofill: true
      })
      const input = getByPlaceholderText('Start typing here...')

      // disabled because of default value in Input
      expect(input.getAttribute('autocomplete')).toBe('none')
    })

    it('when autoComplete value is passed and autofill is not enabled', () => {
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

    it('when autoComplete value is passed and autofill is enabled', () => {
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

  describe('reset behavior', () => {
    it('when reset button clicked', () => {
      const {
        getByRole,
        getByText,
        getByPlaceholderText,
        queryByText
      } = renderAutocomplete({
        options: testOptions,
        placeholder,
        value: ''
      })

      const input = getByPlaceholderText(placeholder) as HTMLInputElement

      fireEvent.click(input)
      fireEvent.click(getByText('Slovakia'))
      fireEvent.click(getByRole('reset'))

      expect(queryByText('Slovakia')).not.toBeInTheDocument()
    })
  })
})
