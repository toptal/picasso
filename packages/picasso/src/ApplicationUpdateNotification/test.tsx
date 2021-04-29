import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import ApplicationUpdateNotification from './ApplicationUpdateNotification'

describe('ApplicationUpdateNotification', () => {
  it('renders', () => {
    const { container } = render(<ApplicationUpdateNotification />)

    expect(container).toMatchSnapshot()
  })
})
