import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Grid from './Grid'

const TestGrid = () => {
  return <Grid />
}

describe('Grid', () => {
  it('renders', () => {
    const { container } = render(<TestGrid />)

    expect(container).toMatchSnapshot()
  })
})
