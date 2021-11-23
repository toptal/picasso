import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import PageAutocomplete, { Props } from './PageAutocomplete'

const testOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const testIds = {
  resetButton: 'reset-adornment',
  input: 'autocomplete'
}

const renderAutocomplete = (props: OmitInternalProps<Props>) =>
  render(<PageAutocomplete testIds={testIds} {...props} />)

describe('PageAutocomplete', () => {
  it('renders', () => {
    const { container } = renderAutocomplete({
      options: testOptions,
      value: ''
    })

    expect(container).toMatchSnapshot()
  })
})
