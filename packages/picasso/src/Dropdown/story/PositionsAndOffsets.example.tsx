import React from 'react'
import { Dropdown, Menu, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='xsmall'>
      <Typography>Popper placement</Typography>
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
          Default Dropdown (bottom right)
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
          placement='top-start'
        >
          Top left Dropdown
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
          placement='bottom-start'
        >
          Bottom left Dropdown
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
          Offset - default (no offset)
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
          offset={{ top: 'large' }}
        >
          Large offset - top
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
          offset={{ right: 'medium' }}
        >
          Medium offset - right
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>
  </div>
)

export default Example
