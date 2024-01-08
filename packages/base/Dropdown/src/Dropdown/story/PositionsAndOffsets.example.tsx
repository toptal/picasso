import React from 'react'
import { Dropdown, Menu, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_6, SPACING_8 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_2}>
      <Typography>Popper placement</Typography>
    </Container>
    <Container flex inline bottom={SPACING_6}>
      <Container right={SPACING_8}>
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

      <Container right={SPACING_8}>
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

      <Container right={SPACING_8}>
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

    <Container bottom={SPACING_2}>
      <Typography>Offsets</Typography>
    </Container>
    <Container flex inline bottom={SPACING_6}>
      <Container right={SPACING_8}>
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

      <Container right={SPACING_8}>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          offset={{ top: SPACING_8 }}
        >
          Large offset - top
          <Dropdown.Arrow />
        </Dropdown>
      </Container>

      <Container right={SPACING_8}>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>Second item</Menu.Item>
              <Menu.Item>Third item</Menu.Item>
            </Menu>
          }
          offset={{ right: SPACING_6 }}
        >
          Medium offset - right
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>
  </div>
)

export default Example
