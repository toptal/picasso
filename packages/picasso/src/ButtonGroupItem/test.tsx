import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'
import Container from '../Container'

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = render(
      <Button.Group>
        <Container>
          <Button as={Button.GroupItem} />
        </Container>
        <Container>
          <Button as={Button.GroupItem} />
        </Container>
        <Container>
          <Button as={Button.GroupItem} />
        </Container>
      </Button.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
