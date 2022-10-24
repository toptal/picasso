import React from 'react'
import {
  Menu,
  Container,
  Typography,
  Afternoon16,
  Company16,
  Component16,
} from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <Container flex gap='medium'>
    <Container flex gap='small' direction='column'>
      <Typography variant='heading' size='small'>
        Regular
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item onClick={handleClick}>Label</Menu.Item>
        <Menu.Item disabled onClick={handleClick}>
          Label
        </Menu.Item>
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
        <Menu.Item disabled description='Description' onClick={handleClick}>
          Label
        </Menu.Item>
        <Menu.Item description='Description' onClick={handleClick}>
          Label
        </Menu.Item>
      </Menu>
    </Container>

    <Container flex gap='small' direction='column'>
      <Typography variant='heading' size='small'>
        With Icon
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item icon={<Afternoon16 />} onClick={handleClick}>
          Label
        </Menu.Item>
        <Menu.Item disabled icon={<Company16 />} onClick={handleClick}>
          Label
        </Menu.Item>
        <Menu.Item icon={<Component16 />} onClick={handleClick}>
          Label
        </Menu.Item>
      </Menu>
    </Container>

    <Container flex gap='small' direction='column'>
      <Typography variant='heading' size='small'>
        With Description and Icon
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item
          description='Description'
          icon={<Afternoon16 />}
          onClick={handleClick}
        >
          Label
        </Menu.Item>
        <Menu.Item
          disabled
          description='Description'
          icon={<Company16 />}
          onClick={handleClick}
        >
          Label
        </Menu.Item>
        <Menu.Item
          description='Description'
          icon={<Component16 />}
          onClick={handleClick}
        >
          Label
        </Menu.Item>
      </Menu>
    </Container>
  </Container>
)

export default Example
