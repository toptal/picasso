# Menu

Menu list.

## Props

### Menu

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"slide" \| "drilldown"` | `slide` | Switches between slide and drilldown variants |
| allowNestedNavigation | `boolean` | `true` | Whether or not to handle nested navigation |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Menu.Item

| Name | Type | Default | Description |
|------|------|---------|-------------|
| menu | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Adds an arrow to the item |
| disabled | `boolean` | - | Whether to render disabled item |
| disableGutters | `boolean` | - | Whether to render without internal padding |
| selected | `boolean` | - | Highlights the item as selected |
| checkmarked | `boolean` | - | Checkmarks the item |
| value | `string \| number \| readonly string[]` | - | Value of the item |
| variant | `"light" \| "dark"` | `light` | Variant of colors |
| nonSelectable | `boolean` | `false` | Disables changing colors on hover/focus |
| children | `ReactNode` | - | The main content of the item |
| description | `ReactNode` | - | The additional description |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Render an `<Icon />` |
| avatar | `ReactElement<AvatarProps, { ({ size, ...props }: Props): Element; displayName: string; }>` | - | Render an <Avatar /> |
| onClick | `((event: MouseEvent<HTMLElement, MouseEvent>) => void)` | - | Callback when item is clicked |
| onMouseEnter | `((event: MouseEvent<HTMLElement, MouseEvent>) => void)` | - | Callback when item is hovered |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
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
```

### Multilevel

```tsx
import React from 'react'
import {
  Afternoon16,
  Company16,
  Component16,
  Container,
  Menu,
  Typography,
} from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const SlideMenu = () => (
  <Menu>
    <Menu.Item>Label</Menu.Item>
    <Menu.Item
      menu={
        <Menu>
          <Menu.Item>Label inner</Menu.Item>
          <Menu.Item
            menu={
              <Menu>
                <Menu.Item>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const DrilldownMenu = () => (
  <Menu variant='drilldown'>
    <Menu.Item>Label</Menu.Item>
    <Menu.Item
      menu={
        <Menu variant='drilldown'>
          <Menu.Item>Label inner</Menu.Item>
          <Menu.Item
            menu={
              <Menu variant='drilldown'>
                <Menu.Item>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const SlideMenuWithIcon = () => (
  <Menu>
    <Menu.Item icon={<Afternoon16 />}>Label</Menu.Item>
    <Menu.Item
      icon={<Company16 />}
      menu={
        <Menu>
          <Menu.Item icon={<Afternoon16 />}>Label inner</Menu.Item>
          <Menu.Item
            icon={<Company16 />}
            menu={
              <Menu>
                <Menu.Item icon={<Component16 />}>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)
const DrilldownMenuWithDescIcon = () => (
  <Menu variant='drilldown'>
    <Menu.Item description='Description' icon={<Afternoon16 />}>
      Label
    </Menu.Item>
    <Menu.Item
      description='Description'
      icon={<Company16 />}
      menu={
        <Menu variant='drilldown'>
          <Menu.Item description='Description' icon={<Afternoon16 />}>
            Label inner
          </Menu.Item>
          <Menu.Item
            description='Description'
            icon={<Company16 />}
            menu={
              <Menu variant='drilldown'>
                <Menu.Item description='Description' icon={<Component16 />}>
                  Label inner
                </Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const Example = () => {
  return (
    <Container flex gap={SPACING_6}>
      <ExampleContainer title='Slide (default)'>
        <SlideMenu />
      </ExampleContainer>

      <ExampleContainer title='Drilldown'>
        <DrilldownMenu />
      </ExampleContainer>

      <ExampleContainer title='Slide with Icon'>
        <SlideMenuWithIcon />
      </ExampleContainer>

      <ExampleContainer title='Drilldown with Description and Icon'>
        <DrilldownMenuWithDescIcon />
      </ExampleContainer>
    </Container>
  )
}

const ExampleContainer = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <Container flex gap={SPACING_4} direction='column'>
      <Typography variant='heading' size='small'>
        {title}
      </Typography>
      <Container>{children}</Container>
    </Container>
  )
}

export default Example
```

### Dropdown

```tsx
import React from 'react'
import { Container, Dropdown, Form, Menu } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const menuForItemB1 = (
    <Menu>
      <Menu.Item>Item B1-1</Menu.Item>
      <Menu.Item>Item B1-2</Menu.Item>
    </Menu>
  )

  const menuForItemB2 = (
    <Menu>
      <Menu.Item>Item B2-1</Menu.Item>
      <Menu.Item>Item B2-2</Menu.Item>
    </Menu>
  )

  const menuForItemB = (
    <Menu>
      <Menu.Item menu={menuForItemB1}>Item B1</Menu.Item>
      <Menu.Item menu={menuForItemB2}>Item B2</Menu.Item>
    </Menu>
  )

  const sliderMenu = (
    <Menu>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item menu={menuForItemB}>Item B</Menu.Item>
    </Menu>
  )

  const drilldownMenu = (
    <Menu variant='drilldown'>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item menu={menuForItemB}>Item B</Menu.Item>
    </Menu>
  )

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Label>Default</Form.Label>
        <Dropdown content={sliderMenu}>
          Open Dropdown
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
      <Container>
        <Form.Label>Drilldown</Form.Label>
        <Dropdown content={drilldownMenu}>
          Open Dropdown
          <Dropdown.Arrow />
        </Dropdown>
      </Container>
    </Container>
  )
}

export default Example
```

## Menu.Item

An Item component

### Usage with react-router

```tsx
import React from 'react'
import { Menu } from '@toptal/picasso'
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const Example = () => (
  <Router>
    <div>
      <Menu>
        <Menu.Item as={Link} to='/'>
          Home
        </Menu.Item>
        <Menu.Item as={Link} to='/about'>
          About
        </Menu.Item>
        <Menu.Item as={Link} to='/users'>
          Contact
        </Menu.Item>
      </Menu>
    </div>
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/users'>
        <Users />
      </Route>
      <Route>
        <Index />
      </Route>
    </Switch>
  </Router>
)

export default Example
```
