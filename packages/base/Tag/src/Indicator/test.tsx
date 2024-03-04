import type { ReactNode } from 'react'
import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Indicator'
import { Indicator } from './Indicator'

const renderIndicator = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { color } = props

  return render(<Indicator color={color} />)
}

describe('Indicator', () => {
  it('renders in red color', () => {
    const { container } = renderIndicator(null, { color: 'red' })

    expect(container).toMatchSnapshot()
  })
})
