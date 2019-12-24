import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Indicator, { Props } from './Indicator'

const renderIndicator = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { color } = props

  return render(
    <Picasso loadFonts={false}>
      <Indicator color={color}>{children}</Indicator>
    </Picasso>
  )
}

describe('Indicator', () => {
  test('default render', () => {
    const { container } = renderIndicator(null, { color: 'red' })

    expect(container).toMatchSnapshot()
  })
})
