import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Indicator, { Props } from './Indicator'

const renderIndicator = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { color } = props

  return render(<Indicator color={color} />)
}

describe('Indicator', () => {
  it('renders', () => {
    const { container } = renderIndicator(null, { color: 'red' })

    expect(container).toMatchSnapshot()
  })
})
