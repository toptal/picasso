import React, { ReactNode } from 'react'
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
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
  const { placeholder, options, value, defaultValue } = props

  return render(
    <Picasso loadFonts={false}>
      <Autocomplete
        placeholder={placeholder}
        options={options}
        value={value}
        defaultValue={defaultValue}
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

      const input = container.querySelector('input') as HTMLInputElement

      expect(input.value).toEqual('Ukraine')
      expect(input.placeholder).toEqual('Ukraine')

      expect(container).toMatchSnapshot()
    })

    test('render option text when passed `defaultValue` prop', () => {
      const { container } = renderAutocomplete(null, {
        options,
        defaultValue: 'LU'
      })

      const input = container.querySelector('input') as HTMLInputElement

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

    test('on focus without preselection', () => {
      const { container } = renderAutocomplete(null, {
        options
      })

      const input = container.querySelector('input') as HTMLInputElement

      fireEvent.focus(input)

      const firstOption = getDropdownOptionsAsArray(container)[0]
      // first option is highlighted

      expect(firstOption.classList.contains('Mui-selected')).toBe(true)
      expect(container).toMatchSnapshot()
    })

    test('on focus with preselection', () => {
      const { container } = renderAutocomplete(null, {
        options,
        value: 'BY'
      })

      const input = container.querySelector('input') as HTMLInputElement

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

    test('on select option', () => {
      const { container } = renderAutocomplete(null, {
        options
      })

      const input = container.querySelector('input') as HTMLInputElement

      fireEvent.focus(input)

      const selectedOption = getDropdownOptionsAsArray(container).find(
        li => li.textContent === 'Slovakia'
      ) as HTMLLIElement

      fireEvent.click(selectedOption)

      expect(input.value).toEqual('Slovakia')

      expect(container).toMatchSnapshot()
    })
  })
})
