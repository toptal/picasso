import React from 'react'
import { Alert, Container, Menu } from '@toptal/picasso'

const mockOnClose = () => {
  window.alert('Close icon')
}
const mockOnMenuClick = () => {
  window.alert('Menu item clicked')
}

const actions = {
  primary: {
    onClick: () => window.alert('Primary action button'),
    label: 'Primary',
  },
  secondary: {
    onClick: () => window.alert('Secondary action button'),
    label: 'Secondary',
  },
}

const Example = () => (
  <Container flex direction='column'>
    <Container bottom='small'>
      <Alert actions={actions}>This is a warning alert with actions</Alert>
    </Container>
    <Container>
      <Alert
        onClose={mockOnClose}
        actions={{
          ...actions,
          primary: {
            ...actions.primary,
            menu: (
              <Menu data-testid='menu'>
                <Menu.Item onClick={mockOnMenuClick}>First item</Menu.Item>
                <Menu.Item onClick={mockOnMenuClick}>Second item</Menu.Item>
                <Menu.Item onClick={mockOnMenuClick}>Third item</Menu.Item>
              </Menu>
            ),
          },
        }}
      >
        Actions can also be split buttons with menus!
      </Alert>
    </Container>
  </Container>
)

export default Example
