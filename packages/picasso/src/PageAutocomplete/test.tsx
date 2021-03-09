import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import PageAutocomplete, { Props } from './PageAutocomplete'

jest.mock('ap-style-title-case')

const testOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const testIds = {
  menuItem: 'menu-item',
  scrollMenu: 'scroll-menu',
  otherOption: 'other-option',
  noOptions: 'no-options'
}

const renderAutocomplete = (props: OmitInternalProps<Props>) =>
  render(
    <PageAutocomplete data-testid='autocomplete' testIds={testIds} {...props} />
  )

describe('PageAutocomplete', () => {
  it('renders', () => {
    const { container } = renderAutocomplete({
      options: testOptions,
      value: ''
    })

    expect(container).toMatchSnapshot()
  })
})
