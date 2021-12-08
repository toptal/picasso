import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Container from './Container'

describe('Container', () => {
  it('renders default container', () => {
    const { container } = render(<Container>Some text</Container>)

    expect(container).toMatchSnapshot()
  })
})
