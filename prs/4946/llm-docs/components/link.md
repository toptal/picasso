# Link

The Link component allows you to easily customize anchor elements with your theme colors and typography styles.

## Props

### Link

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| as | `"symbol" \| "object" \| "style" \| "title" \| "a" \| "abbr" \| "address" \| "area" \| "article" \| "aside" \| "audio" \| "b" \| "base" \| "bdi" \| "bdo" \| "big" \| "blockquote" \| "body" \| "br" \| ... 157 more ...` | `a` | The component used for the root node. Either a string to use a DOM element or a component. |
| variant | `"default" \| "action"` | `default` | Either it's a regular link or an _action_. |
| disabled | `boolean` | - | Indicates that the user cannot interact with the Link or its children |
| noUnderline | `boolean` | `false` | If true, underline decoration never applies |
| children | `ReactNode` | - | Content of the component |
| href | `string` | - | Destination the link points to |
| onClick | `(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void` | - | Callback invoked when component is clicked |
| color | `"blue" \| "white"` | `blue` | Controls color of the link |
| size | `"default" \| "inherit"` | `default` | Controls font size of Link, whenever you are using Link inside another text with a different font size you should inherit parents font size. |

### Default

```tsx
import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const DefaultLinkExample = () => (
  <Typography size='medium'>
    <Link href={window.parent.location.href + '#'}>Link</Link>
  </Typography>
)

export default DefaultLinkExample
```

### Action

```tsx
import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const ActionLinkExample = () => {
  const handleClick = () => {
    window.alert('Action is invoked!')
  }

  return (
    <Typography size='medium'>
      <Link variant='action' onClick={handleClick}>
        This is an action link!
      </Link>
    </Typography>
  )
}

export default ActionLinkExample
```

### Font size

You can modify Link's font size by wrapping it in `Typography`

```tsx
import type { MouseEvent } from 'react'
import React from 'react'
import { Link, Container, Typography } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const FontSizeExample = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    window.alert('Click handled just before redirect')
  }

  return (
    <div>
      <Container inline right={SPACING_8}>
        <Typography>
          Please{' '}
          <Link onClick={handleClick} href='https://toptal.com'>
            verify
          </Link>{' '}
          your email
        </Typography>
      </Container>
      <Container inline right={SPACING_8}>
        <Typography variant='heading' size='large'>
          Please{' '}
          <Link onClick={handleClick} href='https://toptal.com'>
            verify
          </Link>{' '}
          your email
        </Typography>
      </Container>
    </div>
  )
}

export default FontSizeExample
```

### Color

```tsx
import React from 'react'
import { Container, Link, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_6, palette } from '@toptal/picasso-utils'

const ColorLinkExample = () => (
  <div>
    <Container inline right={SPACING_8}>
      <Typography size='medium'>
        <Link href={window.parent.location.href + '#'}>Blue Link</Link>
      </Typography>
    </Container>
    <Container
      inline
      style={{ backgroundColor: palette.grey.darker }}
      padded={SPACING_6}
    >
      <Typography size='medium'>
        <Link color='white' href={window.parent.location.href + '#'}>
          White Link
        </Link>
      </Typography>
    </Container>
  </div>
)

export default ColorLinkExample
```

### Disabled

```tsx
import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const DisabledLinkExample = () => (
  <>
    <Typography size='medium'>
      <Link
        onClick={() => {
          console.log('foobar')
        }}
        disabled
      >
        Link
      </Link>
    </Typography>
    <Typography size='medium'>
      <Link
        onClick={() => {
          console.log('foobar')
        }}
        variant='action'
        disabled
      >
        Action Link
      </Link>
    </Typography>
  </>
)

export default DisabledLinkExample
```

### Routing

An example how to use `@toptal/picasso` Link with `react-router-dom` Link

```tsx
import React from 'react'
import { Link } from '@toptal/picasso'
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from 'react-router-dom'

const Index = () => {
  return <h2>Home</h2>
}

const About = () => {
  return <h2>About</h2>
}

const Users = () => {
  return <h2>Users</h2>
}

const RoutingExample = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link as={RouterLink} to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to='/about/'>
              About
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to='/users/'>
              Users
            </Link>
          </li>
        </ul>
      </nav>

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
    </div>
  </Router>
)

export default RoutingExample
```
