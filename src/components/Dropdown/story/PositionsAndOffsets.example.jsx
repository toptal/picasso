import React from 'react'
import { Dropdown, Menu, Container, Typography } from '@toptal/picasso'

const DropdownDefaultExample = () => (
  <div>
    <Container bottom='xsmall'>
      <Typography>Anchor position</Typography>
    </Container>
    <Container flex inline bottom='medium'>
      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
        >
          Default
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          Top left
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          Bottom left
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>

    <Container bottom='xsmall'>
      <Typography>Menu position</Typography>
    </Container>
    <Container flex inline bottom='medium'>
      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
        >
          Default
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          Top left
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          Bottom left
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>

    <Container bottom='xsmall'>
      <Typography>Offsets</Typography>
    </Container>
    <Container flex inline bottom='medium'>
      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
        >
          Offset - default
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          offset={{ top: 'medium' }}
        >
          Offset - top
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right='large'>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          offset={{ left: 'medium' }}
        >
          Offset - left
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>
  </div>
)

export default DropdownDefaultExample
