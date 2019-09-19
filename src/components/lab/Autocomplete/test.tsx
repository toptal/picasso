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

      const filteredOptions = Array.from(
        container.querySelectorAll('ul li p')
      ).map(p => p.innerHTML)

      expect(filteredOptions).toEqual(['Croatia', 'Lithuania'])
      expect(container).toMatchSnapshot()
    })

    test('render options focus', () => {
      const { container } = renderAutocomplete(null, {
        options
      })

      const input = container.querySelector('input') as HTMLInputElement

      fireEvent.focus(input)

      expect(container).toMatchSnapshot()
    })
  })
})
