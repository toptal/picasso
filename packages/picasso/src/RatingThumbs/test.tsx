import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import RatingThumbs, { Props } from './RatingThumbs'

const renderRatingThumbs = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  return render(<RatingThumbs {...props} />)
}

describe('RatingThumbs', () => {
  it('default render', () => {
    const { container } = renderRatingThumbs(null, { name: 'foo' })

    expect(container).toMatchSnapshot()
  })
})
