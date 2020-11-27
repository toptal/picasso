import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'
import Container from '../Container'

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = render(
      <Button.Group>
        <Container>
          <Button as={Button.GroupItem} key='1' />
        </Container>
        <Container>
          <Button as={Button.GroupItem} key='2' />
        </Container>
        <Container>
          <Button as={Button.GroupItem} key='3' />
        </Container>
      </Button.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
