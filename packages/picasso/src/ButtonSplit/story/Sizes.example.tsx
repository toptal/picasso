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
    <Container flex gap='1rem'>
      <Button.Split text='Button' size='small' menu={menu} />
      <Button.Split text='Button' size='medium' menu={menu} />
      <Button.Split text='Button' size='large' menu={menu} />
    </Container>
  )
}

export default Example
