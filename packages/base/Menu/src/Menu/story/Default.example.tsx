import React from 'react'
import {
  Menu,
  Container,
  Typography,
  Afternoon16,
  Company16,
  Component16,
  Avatar,
} from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <Container flex gap={SPACING_6}>
    <Container flex gap={SPACING_4} direction='column'>
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

    <Container flex gap={SPACING_4} direction='column'>
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

    <Container flex gap={SPACING_4} direction='column'>
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

    <Container flex gap={SPACING_4} direction='column'>
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

    <Container flex gap={SPACING_4} direction='column'>
      <Typography variant='heading' size='small'>
        With avatar
      </Typography>
      <Menu data-testid='menu'>
        <Menu.Item
          description='Description'
          avatar={
            <Avatar
              alt='Jacqueline Roque. Pablo Picasso, 1954'
              src='./jacqueline-with-flowers-1954-square.jpg'
              name='Jacqueline Roque'
            />
          }
          onClick={handleClick}
        >
          Label
        </Menu.Item>
        <Menu.Item
          disabled
          avatar={
            <Avatar
              alt='Jacqueline Roque. Pablo Picasso, 1954'
              src='./jacqueline-with-flowers-1954-square.jpg'
              name='Jacqueline Roque'
            />
          }
          description='Description'
          onClick={handleClick}
        >
          Label
        </Menu.Item>
        <Menu.Item
          description='Description'
          avatar={
            <Avatar
              alt='Jacqueline Roque. Pablo Picasso, 1954'
              src='./jacqueline-with-flowers-1954-square.jpg'
              name='Jacqueline Roque'
            />
          }
          onClick={handleClick}
        >
          Label
        </Menu.Item>
      </Menu>
    </Container>
  </Container>
)

export default Example
