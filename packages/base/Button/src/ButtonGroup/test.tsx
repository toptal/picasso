import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { ButtonGroup } from '../ButtonGroup'

describe('ButtonGroup', () => {
  it('render', () => {
    const { container } = render(
      <ButtonGroup>
        <ButtonGroup.Item>One</ButtonGroup.Item>
        <ButtonGroup.Item active>Two</ButtonGroup.Item>
        <ButtonGroup.Item>Three</ButtonGroup.Item>
      </ButtonGroup>
    )

    expect(container).toMatchSnapshot()
  })
})
