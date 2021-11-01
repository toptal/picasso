import React from 'react'
import { Button, Menu, Container } from '@toptal/picasso'

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  return (
    <Container flex gap='small'>
      <Button.Split size='small' menu={menu}>
        Button
      </Button.Split>
      <Button.Split size='medium' menu={menu}>
        Button
      </Button.Split>
      <Button.Split size='large' menu={menu}>
        Button
      </Button.Split>
    </Container>
  )
}

export default Example
