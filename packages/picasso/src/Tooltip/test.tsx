import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Container from '../Container'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
  test('default render', () => {
    // If you don't provide `id` prop, it falls back to a randomly generated id.
    const { container } = render(
      <Container>
        <Tooltip
          id='aria-describedby-id-mock'
          content='Content goes here...'
          open
        >
          <span>Test</span>
        </Tooltip>
      </Container>
    )

    expect(container).toMatchSnapshot()
  })
})
