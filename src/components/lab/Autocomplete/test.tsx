import React, { ReactNode } from 'react'
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
  waitForDomChange
} from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../../Picasso'
import Autocomplete, { Props } from './Autocomplete'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const renderAutocomplete = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { placeholder, options, value, defaultValue, allowAny } = props

  return render(
    <Picasso loadFonts={false}>
      <Autocomplete
        placeholder={placeholder}
        options={options}
        value={value}
        defaultValue={defaultValue}
        allowAny={allowAny}
      >
        {children}
      </Autocomplete>
    </Picasso>
  )
}

afterEach(cleanup)

function getDropdownOptionsAsArray(
  container: HTMLElement
): Array<HTMLLIElement> {
  return Array.from(container.querySelectorAll('ul li'))
}

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input') as HTMLInputElement
}

describe('Autocomplete', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderAutocomplete(null, {
      placeholder: 'Start typing here...',
      options
    })
  })

  describe('static behavior', () => {
    test('default render', () => {
      const { container } = api

      expect(container).toMatchSnapshot()
    })

    test('render option text when passed `value` prop', () => {
      const { container } = renderAutocomplete(null, {
        options,
        value: 'UA'
      })

      const input = getInput(container)

      expect(input.value).toEqual('Ukraine')
      expect(input.placeholder).toEqual('Ukraine')

      expect(container).toMatchSnapshot()
    })

    test('render option text when passed `defaultValue` prop', () => {
      const { container } = renderAutocomplete(null, {
        options,
        defaultValue: 'LU'
      })

      const input = getInput(container)

      expect(input.value).toEqual('Lithuania')
      expect(input.placeholder).toEqual('Lithuania')

      expect(container).toMatchSnapshot()
    })
  })

  describe('dynamic behavior', () => {
    test('render options when start typing', () => {
      const input = api.getByPlaceholderText('Start typing here...')

      // should show only Croatia and Lithuania
      fireEvent.change(input, { target: { value: 't' } })

      const { container } = api

      const filteredOptions = getDropdownOptionsAsArray(container).map(
        li => li.textContent
      )

      expect(filteredOptions).toEqual(['Croatia', 'Lithuania'])
      expect(container).toMatchSnapshot()
    })

    describe('on focus', () => {
      test('without preselection', () => {
        const { container } = renderAutocomplete(null, {
          options
        })

        const input = getInput(container)

        fireEvent.focus(input)

        const firstOption = getDropdownOptionsAsArray(container)[0]
        // first option is highlighted

        expect(firstOption.classList.contains('Mui-selected')).toBe(true)
        expect(container).toMatchSnapshot()
      })

      test('with preselection', () => {
        const { container } = renderAutocomplete(null, {
          options,
          value: 'BY'
        })

        const input = getInput(container)

        fireEvent.focus(input)

        const selectedOption = getDropdownOptionsAsArray(container).find(
          li => li.textContent === 'Belarus'
        ) as HTMLLIElement

        // text clears, placeholder shows selected option text.
        expect(input.placeholder).toEqual('Belarus')
        expect(input.value).toEqual('')

        // selected option is highlighted and disabled
        expect(selectedOption.classList.contains('Mui-selected')).toBe(true)
        expect(selectedOption.classList.contains('Mui-disabled')).toBe(true)

        expect(container).toMatchSnapshot()
      })
    })

    describe('on blur', () => {
      test('on select option', () => {
        const { container } = renderAutocomplete(null, {
          options
        })

        const input = getInput(container)

        fireEvent.focus(input)

        const selectedOption = getDropdownOptionsAsArray(container).find(
          li => li.textContent === 'Slovakia'
        ) as HTMLLIElement

        fireEvent.click(selectedOption)

        // if text is empty and an option is selected, text turns into selected option text
        expect(input.value).toEqual('Slovakia')

        expect(container).toMatchSnapshot()
      })

      test('preselected option and random text entered when allowAny=true', async () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'HR',
          allowAny: true
        })

        const input = getInput(container)

        fireEvent.change(input, { target: { value: 'random text' } })

        fireEvent.blur(input)

        await waitForDomChange({ container })

        // If allowAny=true: text stays, and selection (if existed) is cleared
        expect(input.placeholder).toEqual('Placeholder text')

        expect(container).toMatchSnapshot()
      })

      test('preselected option and random text entered when allowAny=false', async () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'HR',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.change(input, { target: { value: 'random text' } })

        fireEvent.blur(input)

        await waitForDomChange({ container })

        // If allowAny=false: text turns into selected option text, or empty is no selection
        expect(input.placeholder).toEqual('Croatia')

        expect(container).toMatchSnapshot()
      })
    })

    test('on "Esc" key pressed', async () => {
      const { container } = renderAutocomplete(null, {
        placeholder: 'Placeholder text',
        options,
        defaultValue: 'HR',
        allowAny: false
      })

      const input = getInput(container)

      fireEvent.change(input, { target: { value: 'random text' } })

      fireEvent.keyDown(input, {
        key: 'Escape',
        keyCode: 27,
        which: 27
      })

      // text and selection are cleared. Placeholder is displayed.
      expect(container).toMatchSnapshot()
    })

    test('On "Backspace" key pressed with empty text', async () => {
      const { container } = renderAutocomplete(null, {
        placeholder: 'Placeholder text',
        options,
        defaultValue: 'HR',
        allowAny: false
      })

      const input = getInput(container)

      fireEvent.change(input, { target: { value: '' } })

      fireEvent.keyDown(input, {
        key: 'Backspace',
        keyCode: 8,
        which: 8
      })

      // If there was a selection, it is cleared and placeholder is displayed.
      expect(input.value).toEqual('')
      expect(input.placeholder).toEqual('Placeholder text')
      expect(container).toMatchSnapshot()
    })

    describe('On "arrow up/down" key press', () => {
      test('down', () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowDown',
          keyCode: 40,
          which: 40
        })

        const highlightedOption = getDropdownOptionsAsArray(container).find(
          li => li.textContent === 'Slovakia'
        ) as HTMLLIElement

        expect(highlightedOption.classList.contains('Mui-selected')).toBe(true)
        expect(container).toMatchSnapshot()
      })

      test('up', () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp',
          keyCode: 38,
          which: 38
        })

        const highlightedOption = getDropdownOptionsAsArray(container).find(
          li => li.textContent === 'Croatia'
        ) as HTMLLIElement

        expect(highlightedOption.classList.contains('Mui-selected')).toBe(true)
        expect(container).toMatchSnapshot()
      })

      test('Enter', () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp',
          keyCode: 38,
          which: 38
        })

        const highlightedOption = getDropdownOptionsAsArray(container).find(
          li => li.textContent === 'Croatia'
        ) as HTMLLIElement

        expect(highlightedOption.classList.contains('Mui-selected')).toBe(true)
        expect(input.value).toEqual('')
        expect(input.placeholder).toEqual('Lithuania')

        fireEvent.keyDown(input, {
          key: 'Enter',
          keyCode: 13,
          which: 13
        })

        expect(input.value).toEqual('Croatia')
        expect(input.placeholder).toEqual('Croatia')

        expect(container).toMatchSnapshot()
      })
    })
  })
})
