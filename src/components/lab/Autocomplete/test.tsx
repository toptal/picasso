import React from 'react'
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

function renderAutocomplete(props: OmitInternalProps<Props>) {
  return render(
    <Picasso loadFonts={false}>
      <Autocomplete
        placeholder={props.placeholder}
        options={props.options}
        renderOption={props.renderOption}
      />
    </Picasso>
  )
}

afterEach(cleanup)

describe('Autocomplete', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderAutocomplete({
      placeholder: 'Start typing here...',
      options
    })
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('render options when start typing', () => {
    const input = api.getByPlaceholderText('Start typing here...')

    // should show only Croatia and Lithuania
    fireEvent.change(input, { target: { value: 't' } })

    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('render option text when passed `value` prop', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Autocomplete
          placeholder='placeholder text'
          value='UA'
          options={options}
        />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})

describe('Autocomplete', () => {
  test('renders options customly', async () => {
    const api = renderAutocomplete({
      placeholder: 'Start typing here...',
      options,
      // eslint-disable-next-line react/display-name
      renderOption: () => <div>Custom renderer</div>
    })
    const input = api.getByPlaceholderText('Start typing here...')

    fireEvent.change(input, { target: { value: 't' } })
    expect(api.container.textContent).toContain('Custom renderer')
  })
})
