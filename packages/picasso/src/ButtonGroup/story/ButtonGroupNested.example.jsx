import React from 'react'
import { Button, Tooltip, Dropdown, Menu, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Button.Group>
        <Tooltip content='First...'>
          <Button as={Button.GroupItem}>First</Button>
        </Tooltip>
        <Button>Second</Button>
        <Tooltip content='Third...'>
          <Button as={Button.GroupItem}>Third</Button>
        </Tooltip>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>First item</Menu.Item>
              <Menu.Item>
                <Button as={Button.GroupItem}>Third</Button>
              </Menu.Item>
              <Menu.Item>
                <Button>Third</Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Tooltip content='Forth...'>
            <Button as={Button.GroupItem}>
              Fourth
              <Dropdown.Arrow />
            </Button>
          </Tooltip>
        </Dropdown>
        <Button>Fifth</Button>
        <Tooltip content='Sixth...'>
          <Button as={Button.GroupItem}>Sixth</Button>
        </Tooltip>
      </Button.Group>
    </Container>

    <Button.Group>
      <Tooltip content='First...'>
        <Button as={Button.GroupItem} variant='secondary'>
          First
        </Button>
      </Tooltip>
      <Button variant='secondary'>Second</Button>
      <Tooltip content='Third...'>
        <Button as={Button.GroupItem} variant='secondary'>
          Third
        </Button>
      </Tooltip>
      <Dropdown
        content={
          <Menu>
            <Menu.Item>First item</Menu.Item>
            <Menu.Item>Second item</Menu.Item>
            <Menu.Item>Third item</Menu.Item>
          </Menu>
        }
      >
        <Tooltip content='Forth...'>
          <Button as={Button.GroupItem} variant='secondary'>
            Fourth
            <Dropdown.Arrow />
          </Button>
        </Tooltip>
      </Dropdown>
      <Button variant='secondary'>Fifth</Button>
      <Tooltip content='Sixth...'>
        <Button as={Button.GroupItem} variant='secondary'>
          Sixth
        </Button>
      </Tooltip>
    </Button.Group>
  </div>
)

export default Example
