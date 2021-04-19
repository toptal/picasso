import React from 'react'
import { Container, Form, Menu } from '@toptal/picasso'

const Example = () => {
  const menuForItemB1 = (
    <Menu>
      <Menu.Item>Item B1-1</Menu.Item>
      <Menu.Item>Item B1-2</Menu.Item>
    </Menu>
  )

  const menuForItemB2 = (
    <Menu>
      <Menu.Item>Item B2-1</Menu.Item>
      <Menu.Item>Item B2-2</Menu.Item>
    </Menu>
  )

  const menuForItemB = (
    <Menu>
      <Menu.Item menu={menuForItemB1}>Item B1</Menu.Item>
      <Menu.Item menu={menuForItemB2}>Item B2</Menu.Item>
    </Menu>
  )

  const regularMenu = (
    <Menu>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item menu={menuForItemB}>Item B</Menu.Item>
    </Menu>
  )

  return (
    <Container flex>
      <Container right='small'>
        <Form.Label>Default</Form.Label>
        <Container style={{ width: '240px' }}>{regularMenu}</Container>
      </Container>
    </Container>
  )
}

export default Example
