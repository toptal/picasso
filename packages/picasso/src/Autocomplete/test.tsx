/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
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
  // { text: 'Bulgaria', value: 'BG' },
  // { text: 'Kyrgyzstan', value: 'KG' },
  // { text: 'Russia', value: 'RU' },
  // { text: 'Romania', value: 'RO' },
  // { text: 'Japan', value: 'JP' }
]

const renderAutocomplete = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  return render(
    <Autocomplete data-testid='autocomplete' {...props} />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Autocomplete', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })
  describe('static behavior', () => {
    it('renders', () => {
      const { container } = renderAutocomplete({
        options: testOptions,
        value: ''
      })

      expect(container).toMatchSnapshot()
    })

    it('renders a placeholder', () => {
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        placeholder: 'test'
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

      expect(input.placeholder).toEqual('test')
    })

    it('renders a loading indicator', () => {
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        loading: true
      })

      expect(getByTestId('loading-adornment')).not.toBeNull()
    })

    it('renders custom adornments', () => {
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        startAdornment: <div data-testid='start-adornment' />,
        endAdornment: <div data-testid='end-adornment' />
      })

      expect(getByTestId('start-adornment')).not.toBeNull()
      expect(getByTestId('end-adornment')).not.toBeNull()
    })

    it('renders an icon', () => {
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        icon: <div data-testid='icon' />
      })

      expect(getByTestId('icon')).not.toBeNull()
    })

    it('uses custom menu keys', () => {
      const getKey = jest.fn(({ value }) => value)

      renderAutocomplete({
        options: testOptions,
        value: '',
        getKey
      })

      expect(getKey).toHaveBeenCalledTimes(testOptions.length)
    })

    it('renders a value that exists in options', () => {
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: 'Ukraine'
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

      expect(input.value).toEqual('Ukraine')
    })

    it('with custom input component', async () => {
      const { getByTestId } = renderAutocomplete({
        value: '',
        // eslint-disable-next-line react/display-name
        inputComponent: () => <input data-testid='custom-input' />
      })

      const input = getByTestId('custom-input')

      expect(input).not.toBeNull()
    })

    it('shows default no options text when no options are available', () => {
      const { getByTestId, getByText } = renderAutocomplete({
        value: 'Picasso'
      })

      const input = getByTestId('autocomplete')

      fireEvent.focus(input)
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

      expect(getByText('No options')).not.toBeNull()
      expect(getByTestId('no-options-text')).not.toBeNull()
    })

    it('shows custom no options text when no options are available', () => {
      const noOptionsText = 'my no options text'
      const { getByText, getByTestId } = renderAutocomplete({
        noOptionsText,
        value: ''
      })

      const input = getByTestId('autocomplete')

      fireEvent.focus(input)
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

      expect(getByText(noOptionsText)).not.toBeNull()
      expect(getByTestId('no-options-text')).not.toBeNull()
    })

    it('renders custom options', async () => {
      const api = renderAutocomplete({
        options: testOptions,
        value: '',
        // eslint-disable-next-line react/display-name
        renderOption: () => <div>Custom renderer</div>
      })
      const input = api.getByTestId('autocomplete')

      fireEvent.click(input)
      expect(api.baseElement.textContent).toContain('Custom renderer')
    })

    it('should not transform options text to title case when Picasso titleCase property is true', () => {
      const { getByTestId } = renderAutocomplete(
        {
          options: testOptions,
          value: ''
        },
        {
          titleCase: true
        }
      )

      const input = getByTestId('autocomplete')

      fireEvent.focus(input)

      expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
    })
  })

  describe('dynamic behavior', () => {
    it('on focus', () => {
      const onFocus = jest.fn()
      const { getByTestId, queryByRole } = renderAutocomplete({
        options: testOptions,
        value: '',
        onFocus
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

      fireEvent.focus(input)

      // calls onFocus handler
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(queryByRole('menu')).not.toBeInTheDocument()

      fireEvent.click(input)
      expect(queryByRole('menu')).toMatchSnapshot()
    })

    it('on type', () => {
      const onChange = jest.fn()
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        onChange
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: 't' } })

      expect(onChange).toHaveBeenCalledWith('t', { isSelected: false })
    })

    it('on select option', () => {
      const onSelect = jest.fn()
      const onChange = jest.fn()
      const { getByText, getByTestId } = renderAutocomplete({
        options: testOptions,
        value: '',
        onSelect,
        onChange
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

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
      const { getByTestId } = renderAutocomplete({
        options: testOptions,
        value: 'Croatia',
        onChange
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

      fireEvent.focus(input)
      fireEvent.keyDown(input, {
        key: 'Escape'
      })

      // text should be tried to be cleared
      expect(onChange).toHaveBeenCalledWith('', { isSelected: false })
    })

    it('On "Backspace" key pressed with empty text', async () => {
      const { getByTestId, queryByRole } = renderAutocomplete({
        options: testOptions,
        value: ''
      })

      const input = getByTestId('autocomplete') as HTMLInputElement

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
        const { getByText, getByTestId } = renderAutocomplete({
          options: testOptions,
          value: ''
        })

        const input = getByTestId('autocomplete') as HTMLInputElement

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
        const { getByText, getByTestId } = renderAutocomplete({
          options: testOptions,
          value: ''
        })

        const input = getByTestId('autocomplete') as HTMLInputElement

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

      it('renders other option with default text', async () => {
        const { getByTestId, getByText } = renderAutocomplete({
          options: testOptions,
          value: 'Other option!',
          showOtherOption: true
        })
        const input = getByTestId('autocomplete')

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(getByText('Other option:')).not.toBeNull()
        expect(getByTestId('other-option')).toMatchSnapshot()
      })

      it('renders custom other options text and calls onOtherOptionSelect when selected', () => {
        const onOtherOptionSelect = jest.fn()
        const { getByTestId, getByText } = renderAutocomplete({
          options: testOptions,
          value: 'Other option!',
          showOtherOption: true,
          otherOptionText: 'my option:',
          onOtherOptionSelect
        })

        const input = getByTestId('autocomplete') as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(getByText('my option:')).not.toBeNull()

        const otherOption = getByTestId('other-option')

        expect(otherOption).toMatchSnapshot()

        fireEvent.click(otherOption)

        expect(onOtherOptionSelect).toHaveBeenCalledWith(
          'Other option!',
          expect.anything()
        )
      })

      it('renders custom other options', () => {
        const { getByTestId } = renderAutocomplete({
          options: testOptions,
          value: 'Other option!',
          showOtherOption: true,
          renderOtherOption: value => (
            <div data-testid='my-other-option'>{value}</div>
          )
        })

        const input = getByTestId('autocomplete') as HTMLInputElement

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        const myOtherOption = getByTestId('my-other-option')

        expect(myOtherOption).not.toBeNull()
        expect(myOtherOption).toMatchSnapshot()
      })
    })
  })

  describe('Autofill', () => {
    it('when autoComplete value is not passed and autofill is not enabled', () => {
      const { getByTestId } = renderAutocomplete({
        value: ''
      })
      const input = getByTestId('autocomplete')

      expect(input.getAttribute('autocomplete')).toBe('off')
    })

    it('when autoComplete value is not passed and autofill is enabled', () => {
      const { getByTestId } = renderAutocomplete({
        value: '',
        enableAutofill: true
      })
      const input = getByTestId('autocomplete')

      // disabled because of default value in Input
      expect(input.getAttribute('autocomplete')).toBe('none')
    })

    it('when autoComplete value is passed and autofill is not enabled', () => {
      const { getByTestId } = renderAutocomplete({
        value: '',
        autoComplete: 'country-name'
      })
      const input = getByTestId('autocomplete')

      // user should be able to override autocomplete value if needed
      // even when autoComplete itself is not enabled
      expect(input.getAttribute('autocomplete')).toBe('country-name')
    })

    it('when autoComplete value is passed and autofill is enabled', () => {
      const { getByTestId } = renderAutocomplete({
        value: '',
        enableAutofill: true,
        autoComplete: 'country-name'
      })
      const input = getByTestId('autocomplete')

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
