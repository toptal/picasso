import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import type { Props } from './RatingIcon'
import RatingIcon from './RatingIcon'

const defaultProps: Props = {
  active: true,
  interactive: true,
  size: 'small',
}

const renderRatingIcon = (props = defaultProps) =>
  render(<RatingIcon {...props} />)

describe('RatingIcon', () => {
  it('renders', () => {
    const { container } = renderRatingIcon()

    expect(container).toMatchSnapshot()
  })
})
