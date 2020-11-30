import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import OverlayLoader, { Props } from './OverlayLoader'

const renderOverlayLoader = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  return render(<OverlayLoader size={props.size}>{children}</OverlayLoader>)
}

describe('OverlayLoader', () => {
  test('default render', () => {
    const { container, queryByText } = renderOverlayLoader('Loading data...', {
      size: 'small'
    })

    expect(queryByText('Loading data...')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
