import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Indicator, { Props } from './Indicator'

const renderIndicator = (props: OmitInternalProps<Props>) => {
  const { color } = props

  return render(<Indicator color={color} />)
}

describe('Indicator', () => {
  test('default render', () => {
    const { container } = renderIndicator({ color: 'red' })

    expect(container).toMatchSnapshot()
  })
})
