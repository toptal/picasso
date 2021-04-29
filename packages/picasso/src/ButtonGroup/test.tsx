import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'

describe('ButtonGroup', () => {
  it('render', () => {
    const { container } = render(
      <Button.Group>
        <Button key='1'>One</Button>
        <Button key='2' active>
          Two
        </Button>
        <Button key='3'>Three</Button>
      </Button.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
