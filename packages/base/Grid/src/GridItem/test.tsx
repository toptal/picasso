import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import GridItem from './GridItem'

const TestGridItem = () => {
  return <GridItem />
}

describe('GridItem', () => {
  it('renders', () => {
    const { container } = render(<TestGridItem />)

    expect(container).toMatchSnapshot()
  })
})
