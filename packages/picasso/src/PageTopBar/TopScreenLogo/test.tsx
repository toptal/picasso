import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import TopScreenLogo from './TopScreenLogo'

describe('Page.TopBar.TopScreenLogo', () => {
  it('renders', () => {
    const { container } = render(<TopScreenLogo />)

    expect(container).toMatchSnapshot()
  })
})
