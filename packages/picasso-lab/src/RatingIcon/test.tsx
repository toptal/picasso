import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import RatingIcon, { Props } from './RatingIcon'

const ACTIVE_ICON_TEST_ID = 'active-rating-icon'
const INACTIVE_ICON_TEST_ID = 'inactive-rating-icon'

const defaultProps: Props = {
  active: true,
  interactive: true
}

const renderRatingIcon = (props = defaultProps) =>
  render(<RatingIcon {...props} />)

describe('RatingIcon', () => {
  it('renders properly', () => {
    const { container } = renderRatingIcon()

    expect(container).toMatchSnapshot()
  })

  it('is active', () => {
    const { getByTestId, queryByTestId } = renderRatingIcon()

    expect(getByTestId(ACTIVE_ICON_TEST_ID)).toBeInTheDocument()
    expect(queryByTestId(INACTIVE_ICON_TEST_ID)).not.toBeInTheDocument()
  })

  it('is inactive', () => {
    const { getByTestId, queryByTestId } = renderRatingIcon({
      ...defaultProps,
      active: false
    })

    expect(getByTestId(INACTIVE_ICON_TEST_ID)).toBeInTheDocument()
    expect(queryByTestId(ACTIVE_ICON_TEST_ID)).not.toBeInTheDocument()
  })
})
