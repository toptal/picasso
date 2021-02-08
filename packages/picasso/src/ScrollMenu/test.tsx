import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import ScrollMenu from './ScrollMenu'

describe('ScrollMenu', () => {
  it('renders', () => {
    const { container } = render(
      <ScrollMenu selectedIndex={1}>
        <div>first</div>
        <div>second</div>
      </ScrollMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
