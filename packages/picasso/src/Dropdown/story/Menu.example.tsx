import React from 'react'
import { Menu, Container, Typography } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <Container flex gap='medium'>
    <Container flex gap='small' direction='column'>
      <Typography variant='heading' size='small'>
        Regular
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item onClick={handleClick}>Label</Menu.Item>
        <Menu.Item onClick={handleClick}>Label</Menu.Item>
        <Menu.Item onClick={handleClick}>Label</Menu.Item>
      </Menu>
    </Container>

    <Container flex gap='small' direction='column'>
      <Typography variant='heading' size='small'>
        With Description
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item description='Description' onClick={handleClick}>
          Label
        </Menu.Item>
        <Menu.Item description='Description' onClick={handleClick}>
          Label
        </Menu.Item>
        <Menu.Item description='Description' onClick={handleClick}>
          Label
        </Menu.Item>
      </Menu>
    </Container>
  </Container>
)

export default Example
