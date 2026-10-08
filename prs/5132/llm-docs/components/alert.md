# Alert

Use to alert user about important information

## Props

### Alert

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Main content of the Alert |
| variant | `"red" \| "green" \| "yellow" \| "blue"` | `yellow` | Style variant of Alert |
| onClose | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | - | Callback invoked when close is clicked |
| actions | `Actions` | - | Optional button actions |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Alert.Inline

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Main content of the Alert |
| variant | `"red" \| "green" \| "yellow" \| "blue"` | `yellow` | Style variant of Alert |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Container, Typography, Alert } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Yellow
        </Typography>
      </Container>
      <Alert>This is a warning alert.</Alert>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <Alert variant='red'>This is a critical warning alert.</Alert>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <Alert variant='blue'>This is a info alert.</Alert>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <Alert variant='green'>This is a success alert.</Alert>
    </Container>
  </div>
)

export default Example
```

### Closable alert

```tsx
import React from 'react'
import { Alert } from '@toptal/picasso'

const mockOnClose = () => {
  window.alert("You've clicked the close icon.")
}

const Example = () => (
  <Alert onClose={mockOnClose}>
    Enim dolore enim consequat dolor sunt tempor et aliqua amet ex sit laboris
    consequat cupidatat. Veniam irure do consequat officia. Tempor tempor duis
    est Lorem. Voluptate nisi labore elit velit do eu. Culpa officia aliquip
    dolor occaecat labore quis id proident aliquip. Consectetur dolor laboris
    labore nulla ex excepteur qui incididunt fugiat. Consectetur excepteur
    exercitation ullamco elit aliquip culpa velit minim aliqua qui ea ut. Magna
    ipsum aute sint dolor veniam qui ad. Ad adipisicing duis deserunt Lorem
    consectetur fugiat excepteur id occaecat sit reprehenderit amet. Nisi Lorem
    nostrud adipisicing Lorem aliquip deserunt irure. Eu duis aliquip in amet
    cillum est. Mollit veniam commodo veniam anim tempor tempor tempor ut.
    Labore irure est aliquip nisi adipisicing pariatur enim sunt cillum ullamco
    Lorem nulla.
  </Alert>
)

export default Example
```

### Alert with actions

```tsx
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
```

## Alert.Inline

```tsx
import React from 'react'
import { Container, Typography, Alert } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Yellow
        </Typography>
      </Container>
      <Alert.Inline>This is a warning inline alert.</Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <Alert.Inline variant='red'>
        This is a critical warning inline alert.
      </Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <Alert.Inline variant='blue'>This is a info inline alert.</Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <Alert.Inline variant='green'>
        This is a success inline alert.
      </Alert.Inline>
    </Container>
  </div>
)

export default Example
```
