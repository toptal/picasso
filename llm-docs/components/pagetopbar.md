# PageTopBar

A PageTopBar component

## Props

### PageTopBar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Title which is displayed along the `Logo` |
| logoLink | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Link component to wrap `Logo` |
| logo | `ReactNode` | - | Logo to display |
| centerContent | `ReactNode` | - | Content for the center of the `Header` |
| leftContent | `ReactNode` | - | Content for the left side of the `Header` |
| rightContent | `ReactNode` | - | Content for the right side of the `Header` |
| actionItems | `ReactNode` | - | Action items |
| variant | `"dark" \| "light" \| "grey" \| "black"` | `dark` | Color variant |
| testIds | `{ hamburger?: string; }` | - | Test identifiers |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.TopBar.Menu

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Menu content |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.TopBar.Item

| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Pass icon to be used as part of item |
| selected | `boolean` | - | Highlights the item as selected |
| onClick | `((event: MouseEvent<HTMLElement, MouseEvent>) => void)` | - | Callback when item is clicked |
| onMouseEnter | `((event: MouseEvent<HTMLElement, MouseEvent>) => void)` | - | Callback when item is hovered |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Page.TopBarMenu

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **name** | `string` | - | User full name to display |
| meta | `ReactNode` | - | Additional content |
| avatar | `string` | - | Photo url |
| **children** | `ReactNode` | - | Menu content |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar title='Onboarding' />
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Page, Container, Stepper, Button, Menu, Bell16 } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='light'
        title='Light'
        actionItems={
          <Stepper
            hideLabels
            active={3}
            steps={['', '', '', 'Schedule Matching Call']}
          />
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='dark'
        title='Dark'
        actionItems={
          <Container right={SPACING_6}>
            <Button variant='transparent'>Create job</Button>
          </Container>
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='grey'
        title='Grey'
        actionItems={
          <Container right={SPACING_6}>
            <Button.Circular variant='transparent' icon={<Bell16 />} />
          </Container>
        }
        rightContent={
          <Page.TopBarMenu name='Jacqueline Roque'>
            <Menu>
              <Menu.Item>My Account</Menu.Item>
              <Menu.Item>Log Out</Menu.Item>
            </Menu>
          </Page.TopBarMenu>
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.TopBar
        variant='black'
        title='Black'
        actionItems={
          <Container right={SPACING_6}>
            <Button.Circular variant='transparent' icon={<Bell16 />} />
          </Container>
        }
        rightContent={
          <Page.TopBarMenu
            name='Jacqueline Roque'
            meta='Developer'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          >
            <Menu>
              <Menu.Item>My Account</Menu.Item>
              <Menu.Item>Log Out</Menu.Item>
            </Menu>
          </Page.TopBarMenu>
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page hamburgerId='hamburger-default-example'>
        <Page.TopBar
          variant='light'
          title='Light with menu'
          actionItems={
            <Container right={SPACING_6}>
              <Button variant='primary'>Create job</Button>
            </Container>
          }
          rightContent={
            <Page.TopBarMenu
              name='Jacqueline Roque'
              meta='Developer'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
            >
              <Menu>
                <Menu.Item>My Account</Menu.Item>
                <Menu.Item>Log Out</Menu.Item>
              </Menu>
            </Page.TopBarMenu>
          }
        />
      </Page>
    </Container>
  </div>
)

export default Example
```

### Left content

```tsx
import React from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import { Page, Container, Button, UserBadge, Typography } from '@toptal/picasso'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' },
]

const renderOption = ({ text }: AutocompleteItem) => (
  <UserBadge name={text || ''}>
    <Typography size='xsmall'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Onboarding'
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      leftContent={
        <Page.Autocomplete
          value=''
          placeholder='Users'
          options={options}
          renderOption={renderOption}
        />
      }
    />
  </div>
)

export default Example
```

### Right content

```tsx
import React from 'react'
import { Page, Menu, Container, Button } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      rightContent={<RightContent />}
      title='Onboarding'
    />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
    meta='Picasso Picasso Picasso Picasso Picasso Picasso'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

export default Example
```

### Center content

```tsx
import React from 'react'
import { Container, Button, Bell16, Page, Menu } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page hamburgerId='hamburger-center-example'>
      <Page.TopBar
        variant='grey'
        title='Onboarding'
        centerContent={
          <Page.TopBar.Menu>
            <Page.TopBar.Item>Item 1</Page.TopBar.Item>
            <Page.TopBar.Item>Item 2</Page.TopBar.Item>
            <Page.TopBar.Item>Item 3</Page.TopBar.Item>
          </Page.TopBar.Menu>
        }
        actionItems={
          <Container right={SPACING_6}>
            <Button.Circular variant='transparent' icon={<Bell16 />} />
          </Container>
        }
        rightContent={
          <Page.TopBarMenu
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          >
            <Menu>
              <Menu.Item>My Account</Menu.Item>
              <Menu.Item>Log Out</Menu.Item>
            </Menu>
          </Page.TopBarMenu>
        }
      />
    </Page>
  </div>
)

export default Example
```

### Extra header menu content

```tsx
import React from 'react'
import { Page, Menu, Container, Button, Tag } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      rightContent={<RightContent />}
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      title='Onboarding'
    />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
    meta={<Tag>Extra content</Tag>}
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

export default Example
```

### With link

```tsx
import React from 'react'
import { Link, Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Onboarding'
      logoLink={<Link href='https://www.toptal.com' className='flex' />}
    />
  </div>
)

export default Example
```

### Without title

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar />
  </div>
)

export default Example
```

### With custom logo

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => <Page.TopBar logo={logo} />

const logo = (
  <svg width='120' height='25' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.716 19V3.208h5.656V.324H.784v2.884H6.44V19h3.276Zm10.131.336c4.34 0 6.972-3.22 6.972-7.112 0-3.864-2.632-7.084-6.972-7.084-4.284 0-6.944 3.22-6.944 7.084 0 3.892 2.66 7.112 6.944 7.112Zm0-2.604c-2.492 0-3.892-2.1-3.892-4.508 0-2.38 1.4-4.48 3.892-4.48 2.52 0 3.92 2.1 3.92 4.48 0 2.408-1.4 4.508-3.92 4.508Zm11.504 7.42v-7.028c1.092 1.456 2.632 2.212 4.34 2.212 3.5 0 5.992-2.66 5.992-7.112S39.19 5.14 35.69 5.14c-1.764 0-3.332.84-4.34 2.184V5.476h-2.94v18.676h2.94Zm3.472-7.42c-1.372 0-2.828-.84-3.472-1.82V9.564c.644-1.008 2.1-1.82 3.472-1.82 2.324 0 3.808 1.876 3.808 4.48 0 2.632-1.484 4.508-3.808 4.508Zm14.919 2.604c5.04 0 7.224-2.66 7.224-5.768 0-4.06-3.668-5.012-6.748-5.796-2.212-.56-4.116-1.036-4.116-2.492 0-1.4 1.232-2.324 3.164-2.324 1.96 0 3.948.672 5.404 2.128l1.876-2.436c-1.736-1.68-4.088-2.604-7-2.604-4.088 0-6.804 2.38-6.804 5.46 0 3.948 3.584 4.844 6.636 5.6 2.268.588 4.256 1.092 4.256 2.772 0 1.232-1.064 2.548-3.752 2.548-2.604 0-4.62-1.204-5.908-2.576l-1.82 2.52c1.652 1.764 4.144 2.968 7.588 2.968Zm14.947 0c2.632 0 4.228-1.12 5.18-2.408l-1.932-1.792c-.756 1.036-1.792 1.596-3.108 1.596-2.464 0-4.088-1.876-4.088-4.508s1.624-4.48 4.088-4.48c1.316 0 2.352.532 3.108 1.596l1.932-1.792c-.952-1.288-2.548-2.408-5.18-2.408-4.116 0-7 2.996-7 7.084 0 4.116 2.884 7.112 7 7.112ZM74.01 19V9.788c.588-.952 2.24-1.792 3.472-1.792.364 0 .672.028.924.084V5.168c-1.764 0-3.388 1.008-4.396 2.296V5.476h-2.94V19h2.94Zm11.643.336c2.156 0 4.144-.672 5.488-1.96l-1.344-1.932c-.952.952-2.52 1.484-3.836 1.484-2.548 0-4.088-1.68-4.312-3.724h10.444v-.7c0-4.256-2.604-7.364-6.664-7.364-4.004 0-6.86 3.164-6.86 7.084 0 4.284 3.024 7.112 7.084 7.112Zm3.584-8.204H81.62c.14-1.652 1.288-3.584 3.808-3.584 2.66 0 3.752 1.988 3.808 3.584Zm10.635 8.204c2.156 0 4.144-.672 5.488-1.96l-1.344-1.932c-.952.952-2.52 1.484-3.836 1.484-2.548 0-4.088-1.68-4.312-3.724h10.444v-.7c0-4.256-2.604-7.364-6.664-7.364-4.004 0-6.86 3.164-6.86 7.084 0 4.284 3.024 7.112 7.084 7.112Zm3.584-8.204H95.84c.14-1.652 1.288-3.584 3.808-3.584 2.66 0 3.752 1.988 3.808 3.584ZM110.787 19V9.564c.672-.924 1.96-1.82 3.472-1.82 1.652 0 2.716.7 2.716 2.8V19h2.94V9.48c0-2.772-1.456-4.34-4.368-4.34-2.128 0-3.864 1.12-4.76 2.184V5.476h-2.94V19h2.94Z'
      fill='#FFF'
      fill-rule='nonzero'
    />
  </svg>
)

export default Example
```

## Page.TopBar.Menu

      Menu for center content of TopBar.
      
      Maximum 6 items is allowed.

      Both TopBarMenu and Sidebar menu items are displayed in hamburger on small screens.
    

### Default

```tsx
import React from 'react'
import { Page, Menu } from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-default-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item selected>Item 1</Page.TopBar.Item>
          <Page.TopBar.Item>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item>Item 3</Page.TopBar.Item>
          <Page.TopBar.Item>Item 4</Page.TopBar.Item>
          <Page.TopBar.Item>Item 5</Page.TopBar.Item>
          <Page.TopBar.Item>Item 6</Page.TopBar.Item>
          {/* This won't be rendered. Maximum of 6 items is allowed */}
          <Page.TopBar.Item>Item 7</Page.TopBar.Item>
        </Page.TopBar.Menu>
      }
      rightContent={
        <Page.TopBarMenu
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Menu>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Page.TopBarMenu>
      }
    />
  </Page>
)

export default Example
```

### With Icons

```tsx
import React from 'react'
import {
  Page,
  Menu,
  PortfolioDesigner16,
  Profile16,
  Globe16,
  Referral16,
  Award16,
  Box16,
} from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-withicons-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item icon={<PortfolioDesigner16 />}>
            Item 1
          </Page.TopBar.Item>
          <Page.TopBar.Item icon={<Profile16 />}>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Globe16 />}>Item 3</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Award16 />}>Item 4</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Referral16 />}>Item 5</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Box16 />}>Item 6</Page.TopBar.Item>
        </Page.TopBar.Menu>
      }
      rightContent={
        <Page.TopBarMenu
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Menu>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Page.TopBarMenu>
      }
    />
  </Page>
)

export default Example
```

### TopBar Menu with Sidebar

```tsx
import React from 'react'
import {
  Page,
  Menu,
  PortfolioDesigner16,
  Profile16,
  Globe16,
} from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-withsidebar-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item selected icon={<PortfolioDesigner16 />}>
            Item 1
          </Page.TopBar.Item>
          <Page.TopBar.Item icon={<Profile16 />}>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Globe16 />}>Item 3</Page.TopBar.Item>
        </Page.TopBar.Menu>
      }
      rightContent={
        <Page.TopBarMenu
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Menu>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Page.TopBarMenu>
      }
    />
    <Page.Sidebar>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item selected icon={<PortfolioDesigner16 />}>
          Home
        </Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  </Page>
)

export default Example
```
