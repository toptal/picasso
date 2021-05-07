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

  it('renders empty progress bar when value <0', () => {
    const { container } = render(<ProgressBar value={-50} />)

    expect(container).toMatchSnapshot()
  })

  it('renders full profress bar when value >100', () => {
    const { container } = render(<ProgressBar value={110} />)

    expect(container).toMatchSnapshot()
  })
})
