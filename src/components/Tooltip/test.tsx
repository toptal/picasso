import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { ClickAwayListener } from '../utils'
import Container from '../Container'
import Tooltip from './Tooltip'

afterEach(cleanup)

describe('Tooltip', () => {
  test('default render', () => {
    // If you don't provide `id` prop, it falls back to a randomly generated id.
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>
        <Container>
          <Tooltip
            id='aria-describedby-id-mock'
            content='Content goes here...'
            open
          >
            <span>Test</span>
          </Tooltip>
        </Container>
      </ClickAwayListener>
    )

    expect(container).toMatchSnapshot()
  })
})
