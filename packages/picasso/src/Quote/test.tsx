import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Quote from './Quote'

describe('Quote', () => {
  it('renders', () => {
    const { container } = render(<Quote>test example string</Quote>)

    expect(container).toMatchSnapshot()
  })
})
