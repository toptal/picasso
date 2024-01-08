import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NonNativeSelectLimitFooter from './NonNativeSelectLimitFooter'

describe('NonNativeSelectLimitFooter', () => {
  it('renders null when no overflow', () => {
    const { container } = render(
      <NonNativeSelectLimitFooter totalCount={100} limit={120} />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders footer when overflow', () => {
    const { container } = render(
      <NonNativeSelectLimitFooter totalCount={100} limit={50} />
    )

    expect(container).toMatchSnapshot()
  })
})
