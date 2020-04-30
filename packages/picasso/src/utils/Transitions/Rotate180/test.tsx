import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Rotate180 from './Rotate180'

describe('Rotate180', () => {
  test('render without transformation', () => {
    const { container } = render(
      <Rotate180 on={false}>
        <div>Rotating component</div>
      </Rotate180>
    )

    expect(container).toMatchSnapshot()
  })

  test('render with transformation', () => {
    const { container } = render(
      <Rotate180 on>
        <div>Rotating component</div>
      </Rotate180>
    )

    expect(container).toMatchSnapshot()
  })
})
