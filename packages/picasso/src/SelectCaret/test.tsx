import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import SelectCaret from './SelectCaret'

describe('SelectCaret', () => {
  it('renders', () => {
    const { container } = render(<SelectCaret />)

    expect(container).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { container } = render(<SelectCaret disabled />)

    expect(container).toMatchSnapshot()
  })
})
