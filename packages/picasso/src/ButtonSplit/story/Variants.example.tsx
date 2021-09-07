import React from 'react'
import { Button, Menu } from '@toptal/picasso'

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
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button.Split text='Primary' menu={menu} variant='primary' />
      <Button.Split text='Secondary' menu={menu} variant='secondary' />
    </div>
  )
}

export default Example
