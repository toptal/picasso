import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders', () => {
    const { container } = render(<ProgressBar value={50} />)

    expect(container).toMatchSnapshot()
  })

  it('renders with percentage', () => {
    const { container } = render(<ProgressBar value={50} showPercentage />)

    expect(container).toMatchSnapshot()
  })
})
