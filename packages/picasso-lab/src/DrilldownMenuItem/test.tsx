import { render, TestingPicasso } from '@toptal/picasso/test-utils'
import React from 'react'

import DrilldownMenuItem from './'

const TestDrilldownMenuItem = () => {
  return (
    <TestingPicasso>
      <DrilldownMenuItem data-testid='item'>Item</DrilldownMenuItem>
    </TestingPicasso>
  )
}

describe('DrilldownMenuItem', () => {
  it('renders', () => {
    const { container } = render(<TestDrilldownMenuItem />)

    expect(container).toMatchSnapshot()
  })
})
