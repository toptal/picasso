import React, { ReactNode } from 'react'
import {
  render,
  fireEvent,
  cleanup,
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
  const {
    placeholder,
    options,
    value,
    defaultValue,
    allowAny,
    inputValue,
    minLength,
    inputComponent,
    noOptionsText
  } = props

  return render(
    <Picasso loadFonts={false}>
      <Autocomplete
        placeholder={placeholder}
        options={options}
        value={value}
        defaultValue={defaultValue}
        allowAny={allowAny}
        inputValue={inputValue}
        minLength={minLength}
        inputComponent={inputComponent}
        noOptionsText={noOptionsText}
      >
        {children}
      </Autocomplete>
    </Picasso>
  )
}

afterEach(cleanup)

function getDropdownOptions(container: HTMLElement): Array<HTMLLIElement> {
  return Array.from(container.querySelectorAll('ul li'))
}

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input') as HTMLInputElement
}

describe('Autocomplete', () => {
  describe('static behavior', () => {
    test('default render', () => {
      const { container } = renderAutocomplete(null, {
        placeholder: 'Start typing here...',
        options
      })

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
    })

    test('render option text when passed `defaultValue` prop', () => {
      const { container } = renderAutocomplete(null, {
        options,
        defaultValue: 'LU'
      })

      const input = getInput(container)

      expect(input.value).toEqual('Lithuania')
      expect(input.placeholder).toEqual('Lithuania')
    })
  })

  describe('dynamic behavior', () => {
    test('render options when start typing', () => {
      const { getByPlaceholderText, container } = renderAutocomplete(null, {
        placeholder: 'Start typing here...',
        options
      })
      const input = getByPlaceholderText('Start typing here...')

      // should show only Croatia and Lithuania
      fireEvent.change(input, { target: { value: 't' } })

      const filteredOptions = getDropdownOptions(container).map(
        li => li.textContent
      )

      expect(filteredOptions).toEqual(['Croatia', 'Lithuania'])
      expect(container).toMatchSnapshot()
    })

    describe('on focus', () => {
      test('without preselection', () => {
        const { container, getByText } = renderAutocomplete(null, {
          options
        })

        const input = getInput(container)

        fireEvent.focus(input)

        // first option is highlighted
        expect(
          getByText('Belarus').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('with preselection', () => {
        const { container, getByText } = renderAutocomplete(null, {
          options,
          value: 'BY'
        })

        const input = getInput(container)

        fireEvent.focus(input)

        // text clears, placeholder shows selected option text.
        expect(input.placeholder).toEqual('Belarus')
        expect(input.value).toEqual('')

        // selected option is highlighted and disabled
        expect(
          getByText('Belarus').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
        expect(
          getByText('Belarus').parentElement!.getAttribute('aria-disabled')
        ).toBe('true')
      })
    })

    describe('on blur', () => {
      test('on select option', () => {
        const { container, getByText } = renderAutocomplete(null, {
          options
        })

        const input = getInput(container)

        fireEvent.focus(input)
        fireEvent.click(getByText('Slovakia'))

        // if text is empty and an option is selected, text turns into selected option text
        expect(input.value).toEqual('Slovakia')
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
        key: 'Escape'
      })

      // text and selection are cleared. Placeholder is displayed.
      expect(input.placeholder).toEqual('Placeholder text')
      expect(input.value).toEqual('')
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
        key: 'Backspace'
      })

      // If there was a selection, it is cleared and placeholder is displayed.
      expect(input.value).toEqual('')
      expect(input.placeholder).toEqual('Placeholder text')
    })

    describe('On "arrow up/down" key press', () => {
      test('press down', () => {
        const { container, getByText } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowDown'
        })

        expect(
          getByText('Slovakia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('press up', () => {
        const { container, getByText } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')
      })

      test('press Enter', () => {
        const { container, getByText } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          defaultValue: 'LU',
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)

        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-selected')
        ).toBe('true')

        expect(input.value).toEqual('')
        expect(input.placeholder).toEqual('Lithuania')

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(input.value).toEqual('Croatia')
        expect(input.placeholder).toEqual('Croatia')
      })

      test('navigate after option selected', async () => {
        const { container, getByText } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)
        fireEvent.click(getByText('Croatia'))
        fireEvent.focus(input)
        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        // On option selected + immediately "arrow up/down" key press (no "blur" in between)
        // You can navigate the full list of options, and highlighted option was the one selected.
        expect(getDropdownOptions(container).length).toEqual(5)
        expect(
          getByText('Croatia').parentElement!.getAttribute('aria-disabled')
        ).toBe('true')
        expect(
          getByText('Belarus').parentElement!.getAttribute('aria-disabled')
        ).toBe('false')
      })
    })
  })

  describe('controlled mode', () => {
    test('with "value" prop', async () => {
      const { container, getByText } = renderAutocomplete(null, {
        options,
        value: 'HR'
      })

      const input = getInput(container)

      fireEvent.focus(input)
      fireEvent.click(getByText('Belarus'))
      fireEvent.focus(input)

      // if value prop is present, the corresponding option is always selected, no matter what you do on UI.
      expect(input.placeholder).toEqual('Croatia')
    })

    test('with "inputValue" prop', async () => {
      const { container, getByText } = renderAutocomplete(null, {
        options,
        inputValue: 'ia'
      })

      const input = getInput(container)

      fireEvent.change(input, { target: { value: 'new text' } })
      fireEvent.click(getByText('Croatia'))

      // the input text always matches it, no matter what you do on UI.
      expect(input.value).toEqual('ia')
    })
  })

  test('with "minLength" prop', async () => {
    const { container } = renderAutocomplete(null, {
      options,
      defaultInputValue: 'a',
      minLength: 1
    })

    const input = getInput(container)

    fireEvent.click(input)

    // @TODO: NB, this is actually a wrong behavior, different from how it works via browser... to be investigated
    // this would be correct if minLength == 2, but this is not the case
    expect(getDropdownOptions(container).length).toEqual(0)

    fireEvent.change(input, { target: { value: 'ia' } })
    fireEvent.focus(input)

    expect(getDropdownOptions(container).length).toEqual(3) // Slovakia, Croatia, Lithuania
  })

  test('with "inputComponent" prop', async () => {
    const { getByPlaceholderText } = renderAutocomplete(null, {
      // eslint-disable-next-line react/display-name
      inputComponent: () => <input placeholder='myCustomInputComponent' />
    })

    const input = getByPlaceholderText('myCustomInputComponent')

    expect(input).not.toBeNull()
  })

  test('with "noOptionsText" prop', async () => {
    const { container, getByText } = renderAutocomplete(null, {
      noOptionsText: 'my no options text',
      defaultInputValue: 'non existing option'
    })

    const input = getInput(container)

    fireEvent.focus(input)
    const noOptionsTextContainer = getByText('my no options text')

    expect(noOptionsTextContainer).not.toBeNull()
  })
})
