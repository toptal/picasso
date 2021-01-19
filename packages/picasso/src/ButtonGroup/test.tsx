import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'

describe('ButtonGroup', () => {
  it('render', () => {
    const { container } = render(
      <Button.Group>
        <Button key='1' />
        <Button key='2' active />
        <Button key='3' />
      </Button.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
