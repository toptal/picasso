import React, { useState } from 'react'
import {
  Menu,
  Dropdown,
  Grid,
  Typography,
  Container,
  Button
} from '@toptal/picasso'

const Example = () => {
  const handleClick = () => {
    console.log('Menu item is clicked')
  }

  const [selected, setSelected] = useState(false)

  const handleButtonClick = () => {
    setSelected(!selected)
  }

  const cMenu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item C1</Menu.Item>
      <Menu.Item onClick={handleClick} selected={selected}>
        Item C2
      </Menu.Item>
    </Menu>
  )

  const d3Menu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item D3-1</Menu.Item>
      <Menu.Item onClick={handleClick} selected={selected}>
        Item D3-2
      </Menu.Item>
      <Menu.Item onClick={handleClick}>Item D3-3</Menu.Item>
    </Menu>
  )

  const dMenu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item D1</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D2</Menu.Item>
      <Menu.Item onClick={handleClick} menu={d3Menu}>
        Item D3
      </Menu.Item>
      <Menu.Item onClick={handleClick}>Item D4</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D5</Menu.Item>
    </Menu>
  )

  return (
    <>
      <Container bottom='small'>
        <Button onClick={handleButtonClick}>
          Toggle selected: {selected ? 'true' : 'false'}
        </Button>
      </Container>
      <Grid spacing={32}>
        <Grid.Item>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Default:
            </Typography>
          </Container>
          <Container style={{ width: 240 }}>
            <Menu>
              <Menu.Item onClick={handleClick} selected={selected}>
                Item A
              </Menu.Item>
              <Menu.Item onClick={handleClick}>Item B</Menu.Item>
              <Menu.Item onClick={handleClick} menu={cMenu}>
                Item C
              </Menu.Item>
              <Menu.Item onClick={handleClick} menu={dMenu}>
                Item D
              </Menu.Item>
              <Menu.Item onClick={handleClick}>Item E</Menu.Item>
            </Menu>
          </Container>
        </Grid.Item>
        <Grid.Item>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Used in Dropdown:
            </Typography>
          </Container>
          <Dropdown
            content={
              <Menu>
                <Menu.Item onClick={handleClick} selected={selected}>
                  Item A
                </Menu.Item>
                <Menu.Item onClick={handleClick}>Item B</Menu.Item>
                <Menu.Item onClick={handleClick} menu={cMenu}>
                  Item C
                </Menu.Item>
                <Menu.Item onClick={handleClick} menu={dMenu}>
                  Item D
                </Menu.Item>
                <Menu.Item onClick={handleClick}>Item E</Menu.Item>
              </Menu>
            }
          >
            Open Dropdown
            <Dropdown.Arrow />
          </Dropdown>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default Example
