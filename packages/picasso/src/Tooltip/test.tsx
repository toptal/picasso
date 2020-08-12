import React from 'react'
import { render } from '@testing-library/react'

import Tooltip from './Tooltip'

describe('Tooltip', () => {
  test('default render', () => {
    // If you don't provide `id` prop, it falls back to a randomly generated id.
    const { container } = render(
      <Tooltip
        id='aria-describedby-id-mock'
        content='Content goes here...'
        open
      >
        <span>Test</span>
      </Tooltip>
    )

    expect(container).toMatchSnapshot()
  })
})
