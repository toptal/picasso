# Dropdown

Allows rendering of menus and custom content triggered by custom anchors

## Props

### Dropdown

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Anchor element that opens content on click |
| **content** | `ReactNode` | - | Content element that opens when anchor is clicked |
| placement | `"bottom-end" \| "bottom-start" \| "bottom" \| "left-end" \| "left-start" \| "left" \| "right-end" \| "right-start" \| "right" \| "top-end" \| "top-start" \| "top"` | - | The placement of the content element relative to anchor element. |
| disabled | `boolean` | - | Disabled |
| disableAutoFocus | `boolean` | - | Disable auto focus of first item in list or item |
| disableAutoClose | `boolean` | - | Disable close on generic close events |
| disablePortal | `boolean` | - | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| keepMounted | `boolean` | - | Always keep Popper's children in the DOM |
| onOpen | `(() => void)` | - | Callback invoked when component is opened |
| onClose | `(() => void)` | - | Callback invoked when component is closed |
| contentOverflow | `scroll \| visible` | `scroll` | Sets the desired behavior for an element's overflow. When `scroll` it limits max-height of a content of the dropdown. When `visible` it displays as much content as it possible without vertical scrollbar. |
| classes | `{ popper?: string; content?: string; } \| undefined` | - | Sets styles for the inner wrapper |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| contentStyle | `{ height?: string; maxHeight?: string; } \| undefined` | - | Control content element style |
| offset | `{ top?: PicassoSpacing \| ResponsiveSpacingType; bottom?: PicassoSpacing \| ResponsiveSpacingType; left?: PicassoSpacing \| ... 1 more ... \| undefined; right?: PicassoSpacing \| ... 1 more ... \| undefined; } \| undefined` | - | Offset of content element relative to anchor element |

### Dropdown.Arrow

| Name | Type | Default | Description |
|------|------|---------|-------------|
| size | `"small" \| "medium"` | `medium` | A Dropdown.Arrow can have different sizes |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu data-testid='menu'>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
```

### Button Anchor

```tsx
import React from 'react'
import { Dropdown, Button, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
    >
      <Button>
        Open Dropdown
        <Dropdown.Arrow />
      </Button>
    </Dropdown>
  </div>
)

export default Example
```

### Dropdown menu

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

### Multilevel menu

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

### Positions & Offsets

```tsx
import React from 'react'
import { Dropdown, Menu, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_6, SPACING_8 } from '@toptal/picasso-utils'

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
```

### Custom Anchor

```tsx
import React from 'react'
import { Dropdown, Menu, UserBadge } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu style={{ width: '15rem' }}>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
      offset={{ top: SPACING_2 }}
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Dropdown.Arrow />
    </Dropdown>
  </div>
)

export default Example
```

### Custom Content

```tsx
import React from 'react'
import {
  Dropdown,
  Form,
  Input,
  Container,
  Select,
  Button,
  Typography,
} from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

// Autofocus will force scrolling to the bottom of the portal, so we disable portal
const Example = () => (
  <div>
    <Dropdown content={<ComplexContent />} disableAutoClose disablePortal>
      Open Dropdown
      <Dropdown.Arrow />
    </Dropdown>
  </div>
)

const ComplexContent = () => {
  const { close } = Dropdown.useContext()

  return (
    <Container padded={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='medium'>
          Talent
        </Typography>
      </Container>
      <Form>
        <Form.Field>
          <Input autoFocus width='full' placeholder='Job title' />
        </Form.Field>
        <Form.Field>
          <Select placeholder='Select talent' options={OPTIONS} />
        </Form.Field>
      </Form>
      <Container flex top={SPACING_4} justifyContent='flex-end'>
        <Button onClick={close}>Close</Button>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Small Arrow Dropdown

```tsx
import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow size='small' />
    </Dropdown>
  </div>
)

export default Example
```

### Long Menu List

```tsx
import React from 'react'
import { Dropdown, Menu, Grid } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const menuItems = [
  'Add Infraction',
  'Convert to Sourcing Flow',
  'Reject Application',
  'Pause Application',
  'Reset Application',
  'Edit Details',
  'Talent Profile',
  'Communication',
  'Request Availability',
  'Referred Users',
  'Deactivate Talent',
  'Restore Talent',
  'Convert to...',
  'Talent Health Status',
  'Import Contract',
  'Workflows',
  'Hold Payments',
  'Remove Hold on Payments',
  'Payments',
  'Payment History',
  'Download IP History',
  'GDPR Report',
  'GDPR Remove Data',
  'Login as this Talent',
  'Apply to Different Vertical',
]

const menu = (
  <Menu>
    {menuItems.map((itemName, index) => (
      <Menu.Item onClick={handleClick} key={`${itemName}${String(index)}`}>
        {itemName}
      </Menu.Item>
    ))}
  </Menu>
)

const Example = () => (
  <Grid direction='row'>
    <Grid.Item>
      <Dropdown contentOverflow='scroll' content={menu}>
        Display the menu with a scrollbar
        <Dropdown.Arrow />
      </Dropdown>
    </Grid.Item>
    <Grid.Item>
      <Dropdown contentOverflow='visible' content={menu}>
        Display the menu without a scrollbar
        <Dropdown.Arrow />
      </Dropdown>
    </Grid.Item>
  </Grid>
)

export default Example
```

### Custom Style

```tsx
import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      contentStyle={{
        height: '100%',
        maxHeight: '20rem',
      }}
      content={
        <Menu data-testid='menu'>
          <Menu.Item onClick={handleClick}>Item 1</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 2</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 3</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 4</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 5</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 6</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 7</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 8</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 9</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 10</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 11</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
```
