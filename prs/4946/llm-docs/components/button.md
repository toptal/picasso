# Button

A Button indicates a possible user action.

## Props

### Button

| Name | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | `false` | Show button in the active state (left mouse button down) |
| disabled | `boolean` | `false` | Disables button |
| children | `ReactNode` | `null` | Content of Button component |
| fullWidth | `boolean` | `false` | Take the full width of a container |
| hovered | `boolean` | `false` | Set hovered style for the button |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Add an `<Icon />` along Button's children |
| iconPosition | `"left" \| "right"` | `left` | Icon can be positioned on the left or right |
| loading | `boolean` | `false` | Shows a loading indicator and disables click events |
| onClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when component is clicked |
| size | `"small" \| "medium" \| "large"` | `medium` | A button can have different sizes |
| variant | `"primary" \| "negative" \| "positive" \| "secondary" \| "transparent"` | `primary` | The variant to use |
| value | `string \| number` | - | HTML Value of Button component |
| title | `string` | - | HTML title of Button component |
| type | `"submit" \| "reset" \| "button"` | `button` | HTML type of Button component |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |
| as | `"symbol" \| "abbr" \| "address" \| "article" \| "aside" \| "b" \| "bdi" \| "bdo" \| "big" \| "blockquote" \| "caption" \| "cite" \| "code" \| "dd" \| "del" \| "details" \| "dfn" \| "dt" \| "em" \| "figcaption" \| ... 95 more ...` | `button` | The component used for the root node. Either a string to use a DOM element or a component. |

### Button.Circular

| Name | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | - | Show button in the active state (left mouse button down) |
| disabled | `boolean` | - | Disables button |
| focused | `boolean` | - | Set focused style for the button |
| hovered | `boolean` | - | Set hovered style for the button |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Add an `<Icon />` along Button's children |
| loading | `boolean` | - | Shows a loading indicator and disables click events |
| onClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when component is clicked |
| variant | `"primary" \| "flat" \| "transparent"` | `primary` | The variant to use |
| value | `string \| number` | - | HTML Value of Button component |
| responsive | `boolean` | - | Adjust button size to be bigger on screens under xl |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Button.Action

| Name | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | - | Show button in the active state (left mouse button down) |
| disabled | `boolean` | - | Disables button |
| focused | `boolean` | - | Set focused style for the button |
| hovered | `boolean` | - | Set hovered style for the button |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Add an `<Icon />` along Button's children |
| iconPosition | `"left" \| "right"` | `left` | Icon can be positioned on the left or right |
| loading | `boolean` | - | Shows a loading indicator and disables click events |
| onClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when component is clicked |
| value | `string \| number` | - | HTML Value of Button component |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Button.Group

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | List of `Button` components which you want to render as `ButtonGroup` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Button.Split

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content of Button component |
| **menu** | `ReactNode` | - | Content element that opens when anchor is clicked |
| onClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when component is clicked |
| size | `"small" \| "medium" \| "large"` | `medium` | A button can have different sizes |
| variant | `"primary" \| "secondary"` | `primary` | The variant to use |
| disabled | `boolean` | - | Is component disaled or not |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Button.Checkbox

| Name | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Show the control initially as checked |
| active | `boolean` | - | Show button in the active state (left mouse button down) |
| disabled | `boolean` | - | Disables button |
| focused | `boolean` | - | Set focused style for the button |
| hovered | `boolean` | - | Set hovered style for the button |
| size | `"small" \| "medium" \| "large"` | - | A button can have different sizes |
| value | `string` | - | HTML Value of Button component |
| onChange | `((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)` | - | Callback invoked when value is changed |
| **children** | `ReactNode` | - | Button text |
| id | `string` | - | The id of the input element |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Button.Radio

| Name | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Show the control initially as checked |
| active | `boolean` | - | Show button in the active state (left mouse button down) |
| disabled | `boolean` | - | Disables button |
| focused | `boolean` | - | Set focused style for the button |
| hovered | `boolean` | - | Set hovered style for the button |
| size | `"small" \| "medium" \| "large"` | - | A button can have different sizes |
| value | `string` | - | HTML Value of Button component |
| onChange | `((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)` | - | Callback invoked when value is changed |
| **children** | `ReactNode` | - | Button text |
| id | `string` | - | The id of the input element |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button>Default</Button>
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { SPACING_4, SPACING_2, palette } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Button>Primary (Default)</Button>

    <Button variant='negative'>Negative</Button>

    <Button variant='positive'>Positive</Button>

    <Button variant='secondary'>Secondary</Button>

    <Container
      top={SPACING_4}
      left={SPACING_4}
      padded={SPACING_2}
      inline
      style={{ backgroundColor: palette.blue.main }}
    >
      <Button variant='transparent'>Transparent</Button>
    </Container>
  </div>
)

export default Example
```

### States

```tsx
import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_2, palette } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary (Default)
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button>Normal</Button>
      <Button hovered>Hovered</Button>
      <Button focused>Focused</Button>
      <Button active>Active</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </Container>

    <Typography variant='heading' size='small'>
      Negative
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='negative'>Normal</Button>
      <Button hovered variant='negative'>
        Hovered
      </Button>
      <Button focused variant='negative'>
        Focused
      </Button>
      <Button active variant='negative'>
        Active
      </Button>
      <Button loading variant='negative'>
        Loading
      </Button>
      <Button disabled variant='negative'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Positive
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='positive'>Normal</Button>
      <Button hovered variant='positive'>
        Hovered
      </Button>
      <Button focused variant='positive'>
        Focused
      </Button>
      <Button active variant='positive'>
        Active
      </Button>
      <Button loading variant='positive'>
        Loading
      </Button>
      <Button disabled variant='positive'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='secondary'>Normal</Button>
      <Button hovered variant='secondary'>
        Hovered
      </Button>
      <Button focused variant='secondary'>
        Focused
      </Button>
      <Button active variant='secondary'>
        Active
      </Button>
      <Button loading variant='secondary'>
        Loading
      </Button>
      <Button disabled variant='secondary'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Transparent
    </Typography>
    <Container
      top={SPACING_4}
      inline
      style={{ backgroundColor: palette.blue.main }}
      padded={SPACING_2}
    >
      <Button variant='transparent'>Normal</Button>
      <Button hovered variant='transparent'>
        Hovered
      </Button>
      <Button focused variant='transparent'>
        Focused
      </Button>
      <Button active variant='transparent'>
        Active
      </Button>
      <Button loading variant='transparent'>
        Loading
      </Button>
      <Button disabled variant='transparent'>
        Disabled
      </Button>
    </Container>
  </div>
)

export default Example
```

### Disabled

The button shows that currently unable to be interacted with

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Button disabled>Disabled</Button>
    <Button disabled icon={<Settings16 />}>
      Disabled
    </Button>
  </div>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button size='small'>Small</Button>
    <Button size='medium'>Medium (default)</Button>
    <Button size='large'>Large</Button>
  </div>
)

export default Example
```

### Full width

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button fullWidth>Full width</Button>
  </div>
)

export default Example
```

### Button with text and Icon

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Button icon={<Settings16 />} size='small'>
      Cog
    </Button>
    <Button icon={<Settings16 />}>Cog</Button>
    <Button icon={<Settings24 />} size='large'>
      Cog
    </Button>
    <Button icon={<Settings16 />} iconPosition='right' size='small'>
      Check
    </Button>
    <Button icon={<Settings16 />} iconPosition='right'>
      Check
    </Button>
    <Button icon={<Settings24 />} iconPosition='right' size='large'>
      Check
    </Button>
  </div>
)

export default Example
```

### Button with loading state

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button size='small' loading>
      Button
    </Button>
    <Button size='medium' loading>
      Button
    </Button>
    <Button size='large' loading>
      Button
    </Button>
  </div>
)

export default Example
```

### Augmentation

Example show augmentation with Picasso Link component. You can use Link component from react-router-dom or some other custom component.

```tsx
import React, { forwardRef } from 'react'
import type { LinkProps } from '@toptal/picasso'
import { Button, Link } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso-icons'

// variant & noUnderline are statically set in ActionLink
type ActionLinkProps = Omit<LinkProps, 'variant' | 'noUnderline'>

const ActionLink = forwardRef<HTMLAnchorElement, ActionLinkProps>(
  (props, ref) => <Link ref={ref} {...props} variant='action' noUnderline />
)

const ButtonAugmentationExample = () => (
  <div>
    <Button as={ActionLink} href='/#home'>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' icon={<Settings16 />}>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' variant='secondary'>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' disabled>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' loading>
      Link
    </Button>
  </div>
)

export default ButtonAugmentationExample
```

## Circular Button

Circular Style Button.

### Default

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Button.Circular icon={<Settings16 />} />
  </div>
)

export default Example
```

### Responsive

BASE design recommends using 24px icons on screens below the xl breakpoint

```tsx
import React from 'react'
import {
  Button,
  Container,
  Settings16,
  SettingsResponsive,
  Typography,
} from '@toptal/picasso'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Responsive
      </Typography>
      <Container padded='small'>
        <Button.Circular responsive icon={<SettingsResponsive />} />
      </Container>
    </Container>
    <Container inline left='medium'>
      <Typography variant='heading' size='small' align='center'>
        Default
      </Typography>
      <Container padded='small'>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6, palette } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Primary (Default)
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left={SPACING_6}>
      <Typography variant='heading' size='small' align='center'>
        Flat
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left={SPACING_6}>
      <Typography variant='heading' size='small' align='center'>
        Transparent
      </Typography>
      <Container
        style={{ backgroundColor: palette.blue.main }}
        inline
        padded={SPACING_4}
      >
        <Button.Circular variant='transparent' icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
```

### States

```tsx
import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_2, palette } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary (Default)
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Circular icon={<Settings16 />} />
      <Button.Circular hovered icon={<Settings16 />} />
      <Button.Circular focused icon={<Settings16 />} />
      <Button.Circular active icon={<Settings16 />} />
      <Button.Circular loading icon={<Settings16 />} />
      <Button.Circular disabled icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Flat
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Circular variant='flat' icon={<Settings16 />} />
      <Button.Circular variant='flat' hovered icon={<Settings16 />} />
      <Button.Circular variant='flat' focused icon={<Settings16 />} />
      <Button.Circular variant='flat' active icon={<Settings16 />} />
      <Button.Circular variant='flat' loading icon={<Settings16 />} />
      <Button.Circular variant='flat' disabled icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Transparent
    </Typography>
    <Container
      inline
      top={SPACING_4}
      bottom={SPACING_8}
      style={{ backgroundColor: palette.blue.main }}
      padded={SPACING_2}
    >
      <Button.Circular variant='transparent' icon={<Settings16 />} />
      <Button.Circular variant='transparent' hovered icon={<Settings16 />} />
      <Button.Circular variant='transparent' focused icon={<Settings16 />} />
      <Button.Circular variant='transparent' active icon={<Settings16 />} />
      <Button.Circular variant='transparent' loading icon={<Settings16 />} />
      <Button.Circular variant='transparent' disabled icon={<Settings16 />} />
    </Container>
  </div>
)

export default Example
```

## Action Button

Action Style Button.

### Default

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Button.Action>Default</Button.Action>
    <Button.Action icon={<Link16 />}>
      Default with icon on the left
    </Button.Action>
    <Button.Action icon={<Link16 />} iconPosition='right'>
      Default with icon on the right
    </Button.Action>
  </div>
)

export default Example
```

### States

```tsx
import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { Link16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      No icon
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Action>Default</Button.Action>
      <Button.Action hovered>Hovered</Button.Action>
      <Button.Action focused>Focused</Button.Action>
      <Button.Action active>Active</Button.Action>
      <Button.Action loading>Loading</Button.Action>
      <Button.Action disabled>Disabled</Button.Action>
    </Container>
    <Typography variant='heading' size='small'>
      Icon on the left
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Action icon={<Link16 />}>Default</Button.Action>
      <Button.Action hovered icon={<Link16 />}>
        Hovered
      </Button.Action>
      <Button.Action focused icon={<Link16 />}>
        Focused
      </Button.Action>
      <Button.Action active icon={<Link16 />}>
        Active
      </Button.Action>
      <Button.Action loading icon={<Link16 />}>
        Loading
      </Button.Action>
      <Button.Action disabled icon={<Link16 />}>
        Disabled
      </Button.Action>
    </Container>
    <Typography variant='heading' size='small'>
      Icon on the right
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button.Action icon={<Link16 />} iconPosition='right'>
        Default
      </Button.Action>
      <Button.Action hovered icon={<Link16 />} iconPosition='right'>
        Hovered
      </Button.Action>
      <Button.Action focused icon={<Link16 />} iconPosition='right'>
        Focused
      </Button.Action>
      <Button.Action active icon={<Link16 />} iconPosition='right'>
        Active
      </Button.Action>
      <Button.Action loading icon={<Link16 />} iconPosition='right'>
        Loading
      </Button.Action>
      <Button.Action disabled icon={<Link16 />} iconPosition='right'>
        Disabled
      </Button.Action>
    </Container>
  </div>
)

export default Example
```

### Custom Background

```tsx
import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { Link16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      No icon
    </Typography>
    <Container
      top={SPACING_4}
      bottom={SPACING_8}
      style={{ background: 'lightyellow' }}
    >
      <Button.Action>Default</Button.Action>
      <Button.Action hovered>Hovered</Button.Action>
      <Button.Action focused>Focused</Button.Action>
      <Button.Action active>Active</Button.Action>
      <Button.Action loading>Loading</Button.Action>
      <Button.Action disabled>Disabled</Button.Action>
      <Button.Action icon={<Link16 />}>With Left Icon</Button.Action>
      <Button.Action icon={<Link16 />} iconPosition='right'>
        With Right Icon
      </Button.Action>
    </Container>
  </div>
)

export default Example
```

## Group of buttons

You can combine multiple buttons into a single container.

### Button group

```tsx
import React, { useState } from 'react'
import { Button } from '@toptal/picasso'

const Example = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <Button.Group>
        <Button.Group.Item active={active === 0} onClick={() => setActive(0)}>
          First
        </Button.Group.Item>
        <Button.Group.Item active={active === 1} onClick={() => setActive(1)}>
          Second
        </Button.Group.Item>
        <Button.Group.Item active={active === 2} onClick={() => setActive(2)}>
          Third
        </Button.Group.Item>
        <Button.Group.Item active={active === 3} onClick={() => setActive(3)}>
          Fourth
        </Button.Group.Item>
      </Button.Group>
    </div>
  )
}

export default Example
```

### Button group disabled

```tsx
import React, { useState } from 'react'
import { Button } from '@toptal/picasso'

const Example = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <Button.Group>
        <Button.Group.Item
          active={active === 0}
          onClick={() => setActive(0)}
          disabled
        >
          First
        </Button.Group.Item>
        <Button.Group.Item
          active={active === 1}
          onClick={() => setActive(1)}
          disabled
        >
          Second
        </Button.Group.Item>
        <Button.Group.Item
          active={active === 2}
          onClick={() => setActive(2)}
          disabled
        >
          Third
        </Button.Group.Item>
        <Button.Group.Item
          active={active === 3}
          onClick={() => setActive(3)}
          disabled
        >
          Fourth
        </Button.Group.Item>
      </Button.Group>
    </div>
  )
}

export default Example
```

### Nested Button Group

```tsx
import React from 'react'
import { Button, Tooltip, Dropdown, Menu } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button.Group>
      <Tooltip content='First...'>
        <span>
          <Button.Group.Item>First</Button.Group.Item>
        </span>
      </Tooltip>
      <Button.Group.Item>Second</Button.Group.Item>
      <Tooltip content='Third...'>
        <span>
          <Button.Group.Item>Third</Button.Group.Item>
        </span>
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
          <span>
            <Button.Group.Item>
              Fourth
              <Dropdown.Arrow />
            </Button.Group.Item>
          </span>
        </Tooltip>
      </Dropdown>
      <Button.Group.Item>Fifth</Button.Group.Item>
      <Tooltip content='Sixth...'>
        <span>
          <Button.Group.Item>Disabled</Button.Group.Item>
        </span>
      </Tooltip>
    </Button.Group>
  </div>
)

export default Example
```

## Split Button

Combine dropdown with menu and a button.

### Variants

```tsx
import React from 'react'
import { Button, Menu, Container } from '@toptal/picasso'

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  return (
    <Container flex>
      <Button.Split menu={menu} variant='primary'>
        Primary
      </Button.Split>
      <Button.Split menu={menu} variant='secondary'>
        Secondary
      </Button.Split>
    </Container>
  )
}

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Button, Menu, Container } from '@toptal/picasso'

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  return (
    <Container flex>
      <Button.Split size='small' menu={menu}>
        Button
      </Button.Split>
      <Button.Split size='medium' menu={menu}>
        Button
      </Button.Split>
      <Button.Split size='large' menu={menu}>
        Button
      </Button.Split>
    </Container>
  )
}

export default Example
```

### States

```tsx
import type { ComponentProps } from 'react'
import React from 'react'
import { Button, Menu, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type ButtonSplitProps = ComponentProps<typeof Button.Split>

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  const renderStates = ({
    variant = 'primary',
  }: { variant?: ButtonSplitProps['variant'] } = {}) => {
    return (
      <>
        <Button.Split variant={variant} menu={menu}>
          Normal
        </Button.Split>

        <Button.Split
          variant={variant}
          menu={menu}
          actionButtonProps={{ hovered: true }}
        >
          Action Hovered
        </Button.Split>
        <Button.Split
          variant={variant}
          menu={menu}
          menuButtonProps={{ hovered: true }}
        >
          Menu Hovered
        </Button.Split>

        <Button.Split
          variant={variant}
          menu={menu}
          actionButtonProps={{ focused: true }}
        >
          Action Focused
        </Button.Split>

        <Button.Split
          variant={variant}
          menu={menu}
          menuButtonProps={{ focused: true }}
        >
          Menu Focused
        </Button.Split>

        <Button.Split
          variant={variant}
          menu={menu}
          actionButtonProps={{ active: true }}
        >
          Action Active
        </Button.Split>

        <Button.Split
          variant={variant}
          menu={menu}
          menuButtonProps={{ active: true }}
        >
          Menu Active
        </Button.Split>

        <Button.Split variant={variant} menu={menu} disabled>
          Disabled
        </Button.Split>
      </>
    )
  }

  return (
    <>
      <Typography variant='heading' size='small'>
        Primary (Default)
      </Typography>

      <Container flex top={SPACING_4} bottom={SPACING_4}>
        {renderStates()}
      </Container>
      <Typography variant='heading' size='small'>
        Secondary
      </Typography>
      <Container flex top={SPACING_4}>
        {renderStates({ variant: 'secondary' })}
      </Container>
    </>
  )
}

export default Example
```

## Checkbox Button

Checkbox Style Button.

### Default

```tsx
import type { ChangeEvent } from 'react'
import React from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Checkbox size='small' onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox size='medium' onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox size='large' onChange={handleClick}>
      Button
    </Button.Checkbox>
  </Container>
)

export default Example
```

### States

```tsx
import type { ChangeEvent } from 'react'
import React from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Checkbox hovered onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox focused onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox active onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox disabled onChange={handleClick}>
      Button
    </Button.Checkbox>
  </Container>
)

export default Example
```

## Radio Button

Radio Style Button.

### Default

```tsx
import type { ChangeEvent } from 'react'
import React from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Radio size='small' onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio size='medium' onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio size='large' onChange={handleClick}>
      Button
    </Button.Radio>
  </Container>
)

export default Example
```

### States

```tsx
import type { ChangeEvent } from 'react'
import React from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Radio hovered onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio focused onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio active onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio disabled onChange={handleClick}>
      Button
    </Button.Radio>
  </Container>
)

export default Example
```
