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

function getDropdownOptionByText(
  container: HTMLElement,
  text: string
): HTMLLIElement {
  return getDropdownOptions(container).find(
    li => li.textContent === text
  ) as HTMLLIElement
}

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
        const { container } = renderAutocomplete(null, {
          options
        })

        const input = getInput(container)

        fireEvent.focus(input)

        // first option is highlighted
        const firstOption = getDropdownOptions(container)[0]

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

        const selectedOption = getDropdownOptions(container).find(
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

        const selectedOption = getDropdownOptions(container).find(
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
        key: 'Escape'
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
        key: 'Backspace'
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
          key: 'ArrowDown'
        })

        const highlightedOption = getDropdownOptions(container).find(
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
          key: 'ArrowUp'
        })

        const highlightedOption = getDropdownOptions(container).find(
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
          key: 'ArrowUp'
        })

        const highlightedOption = getDropdownOptions(container).find(
          li => li.textContent === 'Croatia'
        ) as HTMLLIElement

        expect(highlightedOption.classList.contains('Mui-selected')).toBe(true)
        expect(input.value).toEqual('')
        expect(input.placeholder).toEqual('Lithuania')

        fireEvent.keyDown(input, {
          key: 'Enter'
        })

        expect(input.value).toEqual('Croatia')
        expect(input.placeholder).toEqual('Croatia')

        expect(container).toMatchSnapshot()
      })

      test('navigate after option selected', async () => {
        const { container } = renderAutocomplete(null, {
          placeholder: 'Placeholder text',
          options,
          allowAny: false
        })

        const input = getInput(container)

        fireEvent.focus(input)
        fireEvent.click(getDropdownOptionByText(container, 'Croatia'))
        fireEvent.focus(input)
        fireEvent.keyDown(input, {
          key: 'ArrowUp'
        })

        // On option selected + immediately "arrow up/down" key press (no "blur" in between)
        // You can navigate the full list of options, and highlighted option was the one selected.
        expect(getDropdownOptions(container).length).toEqual(5)
        expect(
          getDropdownOptionByText(container, 'Croatia').classList.contains(
            'Mui-disabled'
          )
        ).toBe(true)
        expect(
          getDropdownOptionByText(container, 'Belarus').classList.contains(
            'Mui-selected'
          )
        ).toBe(true)

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe('controlled mode', () => {
    test('value is set', async () => {
      const { container } = renderAutocomplete(null, {
        options,
        value: 'HR'
      })

      const input = getInput(container)

      fireEvent.focus(input)
      fireEvent.click(getDropdownOptionByText(container, 'Belarus'))
      fireEvent.focus(input)

      // if value prop is present, the corresponding option is always selected, no matter what you do on UI.
      expect(input.placeholder).toEqual('Croatia')
      expect(container).toMatchSnapshot()
    })

    test('inputValue is set', async () => {
      const { container } = renderAutocomplete(null, {
        options,
        inputValue: 'ia'
      })

      const input = getInput(container)

      fireEvent.change(input, { target: { value: 'new text' } })
      fireEvent.click(getDropdownOptionByText(container, 'Croatia'))

      // the input text always matches it, no matter what you do on UI.
      expect(input.value).toEqual('ia')
      expect(container).toMatchSnapshot()
    })
  })

  test('minLength', async () => {
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

    expect(container).toMatchSnapshot()
  })

  test('inputComponent', async () => {
    const { container, getByPlaceholderText } = renderAutocomplete(null, {
      // eslint-disable-next-line react/display-name
      inputComponent: () => <input placeholder='myCustomInputComponent' />
    })

    const input = getByPlaceholderText('myCustomInputComponent')

    expect(input).not.toBeNull()

    expect(container).toMatchSnapshot()
  })

  test('noOptionsText', async () => {
    const { container, getByText } = renderAutocomplete(null, {
      noOptionsText: 'my no options text',
      defaultInputValue: 'non existing option'
    })

    const input = getInput(container)

    fireEvent.focus(input)
    const noExistingOptionsContainer = getByText('my no options text')

    expect(noExistingOptionsContainer).not.toBeNull()

    expect(container).toMatchSnapshot()
  })
})
