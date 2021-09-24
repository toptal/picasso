import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'

describe('ButtonGroup', () => {
  it('render', () => {
    const { container } = render(
      <Button.Group>
        <Button.Group.Item>One</Button.Group.Item>
        <Button.Group.Item active>Two</Button.Group.Item>
        <Button.Group.Item>Three</Button.Group.Item>
      </Button.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
