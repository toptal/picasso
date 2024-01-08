import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NonNativeSelectLoader from './NonNativeSelectLoader'

describe('NonNativeSelectLoader', () => {
  it('renders', () => {
    const { container } = render(<NonNativeSelectLoader />)

    expect(container).toMatchSnapshot()
  })
})
