import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import RatingIcon, { Props } from './RatingIcon'

const defaultProps: Props = {
  active: true,
  interactive: true,
  size: 'small'
}

const renderRatingIcon = (props = defaultProps) =>
  render(<RatingIcon {...props} />)

describe('RatingIcon', () => {
  it('renders active', () => {
    const { container } = renderRatingIcon()

    expect(container).toMatchSnapshot()
  })

  it('renders inactive', () => {
    const { container } = renderRatingIcon()

    expect(container).toMatchSnapshot()
  })
})
