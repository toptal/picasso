# Page

A Page component

## Props

### Page

| Name | Type | Default | Description |
|------|------|---------|-------------|
| fullWidth | `boolean` | - | DEPRECATED! Component becomes responsive with width 100% and overrides width prop |
| width | `"wide" \| "full"` | - | Define container width `wide` \| `full` |
| centered | `boolean` | - | Horizontally centers the content |
| **children** | `ReactNode` | - | Children components (`Page.TopBar`, `Page.Content`, `Page.Footer`) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.Helmet

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | content that goes to the document head |

### Page.Content

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Custom components that render content of page |
| flex | `boolean` | `true` | Use flexbox |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.Article

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Custom components that render content of page |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.Footer

| Name | Type | Default | Description |
|------|------|---------|-------------|
| copyrightContent | `ReactNode` | `<CopyrightContent />` | Content for copyright. You can override default if needed. |
| rightContent | `ReactNode` | `null` | Content for the right side of the `Footer` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.Banner

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Children components |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Page.Autocomplete

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"light" \| "dark"` | `dark` | The variant to use |
| otherOptionText | `string` | - | Text prefix for other option |
| renderOtherOption | `((value: string) => ReactNode)` | - | Callback responsible for rendering the other option given the input's value |
| noOptionsText | `string \| null` | - | Label to show when no options were found (pass "null" to hide label completely) |
| renderOption | `((option: Item, index: number) => ReactNode)` | - | Callback responsible for rendering the option given the option and its index in the list of options |
| poweredByGoogle | `boolean` | - | Show the "Powered By Google" label |
| **value** | `string` | - | The value of the selected option, required for a controlled component. |
| onChange | `((value: string, options: ChangedOptions) => void)` | - | Callback invoked when `input` element value is changed |
| onSelect | `((item: Item, event: MouseEvent<Element, MouseEvent> \| KeyboardEvent<Element>) => void)` | - | Callback invoked when selection changes |
| onKeyDown | `((event: KeyboardEvent<HTMLInputElement>, inputValue: string) => void)` | - | Callback invoked when key is pressed |
| size | `"medium" \| "large"` | - | Component size |
| disabled | `boolean` | - | Whether a component is disabled |
| placeholder | `string` | - | Placeholder for value |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Focus event handler |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Blur event handler |
| closeOnSelect | `boolean` | - | Whether to close popper upon selection |
| onOtherOptionSelect | `((value: string, event: MouseEvent<Element, MouseEvent> \| KeyboardEvent<Element>) => void)` | - | Callback invoked when other option selected |
| menuWidth | `string` | - | Width of the menu |
| loading | `boolean` | - | Shows the loading icon when options are loading |
| showOtherOption | `boolean` | - | Allow to show the other option in the list of options |
| options | `Item[] \| null` | - | List of options |
| getDisplayValue | `((item: Item \| null) => string)` | - | A function that takes a display value from the option item |
| startAdornment | `ReactNode` | - | ReactNode for labels that will be used as start InputAdornment - |
| endAdornment | `ReactNode` | - | ReactNode for labels that will be used as end InputAdornment - |
| status | `"error" \| "success" \| "warning" \| "default"` | - | Indicate `Autocomplete` status |
| icon | `ReactNode` | - | Specify icon which should be rendered inside Input |
| inputComponent | `ComponentType<InputProps>` | - | Custom input component |
| getKey | `((item: Item) => string)` | - | Provide unique key for each option |
| enableAutofill | `boolean` | - | Specifies whether the autofill enabled or not, disabled by default |
| enableReset | `boolean` | - | Whether to render reset icon when there is a value in the input |
| onResetClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when reset button was clicked |
| popperContainer | `HTMLElement` | - | DOM element that wraps the Popper |
| popperOptions | `PopperOptions` | - | Options provided to the popper.js instance |

### Default

Page has centered content and restricted width of 1200px or 75rem

```tsx
import React from 'react'
import {
  Page,
  Container,
  Menu,
  Typography,
  Tooltip,
  Button,
  Globe16,
  Profile16,
  Home16,
  HeartbeatResponsive,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar
        rightContent={<RightContent />}
        actionItems={<ActionItems />}
        centerContent={<CenterContent />}
        title='Default example'
      />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const CenterContent = () => (
  <Page.TopBar.Menu>
    <Page.TopBar.Item>Item 1</Page.TopBar.Item>
    <Page.TopBar.Item>Item 2</Page.TopBar.Item>
    <Page.TopBar.Item>Item 3</Page.TopBar.Item>
  </Page.TopBar.Menu>
)

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item selected icon={<Home16 />}>
        Home
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const ActionItems = () => (
  <Tooltip content='Your Operational Issues'>
    <Button.Circular
      variant='transparent'
      responsive
      icon={<HeartbeatResponsive color='light-grey' />}
      data-testid='operational-issues-button'
      onClick={() => {}}
    />
  </Tooltip>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Default example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
```

### Wide width

Page has centered content and restricted width of 1440px or 90rem

```tsx
import React from 'react'
import { Page, Container, Menu, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page width='wide'>
      <Page.TopBar rightContent={<RightContent />} title='Wide width example' />
      <Page.Content>
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Wide width example
      </Typography>
    </Container>

    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
```

### Full width

```tsx
import React from 'react'
import { Page, Container, Menu, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page width='full'>
      <Page.TopBar rightContent={<RightContent />} title='Full width example' />
      <Page.Content>
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Full width example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
```

### Scroll with overflow

```tsx
import React from 'react'
import { Page, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ maxHeight: '30rem', overflowY: 'scroll' }}>
    <Page>
      <Page.TopBar title='Scrollable example' />
      <Page.Content>
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Scrollable example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci
      phasellus egestas tellus rutrum tellus pellentesque eu. Elementum
      facilisis leo vel fringilla est ullamcorper eget nulla. Massa id neque
      aliquam vestibulum. Lorem donec massa sapien faucibus et molestie ac
      feugiat sed. In aliquam sem fringilla ut morbi tincidunt augue interdum
      velit. Erat velit scelerisque in dictum non. Eros donec ac odio tempor
      orci dapibus. Ac tortor vitae purus faucibus ornare suspendisse. Amet
      commodo nulla facilisi nullam vehicula. Lacus vel facilisis volutpat est
      velit egestas dui id. Tortor dignissim convallis aenean et tortor at
      risus. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum.
      Nisl suscipit adipiscing bibendum est ultricies integer. Dolor magna eget
      est lorem ipsum dolor. Cursus eget nunc scelerisque viverra mauris. Id
      nibh tortor id aliquet lectus proin. Amet consectetur adipiscing elit duis
      tristique. Cursus risus at ultrices mi tempus imperdiet nulla malesuada
      pellentesque. Nascetur ridiculus mus mauris vitae ultricies leo. In nulla
      posuere sollicitudin aliquam ultrices sagittis orci. Volutpat blandit
      aliquam etiam erat velit. Mi proin sed libero enim sed faucibus turpis in.
      Odio morbi quis commodo odio. Convallis aenean et tortor at risus viverra
      adipiscing at in. Lorem donec massa sapien faucibus et molestie ac. Non
      enim praesent elementum facilisis leo vel fringilla est ullamcorper.
      Interdum velit euismod in pellentesque massa placerat duis ultricies
      lacus. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Nisl
      rhoncus mattis rhoncus urna neque. Pretium lectus quam id leo in vitae
      turpis massa. Diam phasellus vestibulum lorem sed risus ultricies
      tristique nulla. Dui faucibus in ornare quam viverra orci sagittis. Sed
      nisi lacus sed viverra. Phasellus vestibulum lorem sed risus ultricies
      tristique nulla. Amet mauris commodo quis imperdiet massa tincidunt nunc
      pulvinar. Eu nisl nunc mi ipsum. Arcu dictum varius duis at consectetur
      lorem. Cras semper auctor neque vitae tempus quam pellentesque. Tincidunt
      praesent semper feugiat nibh sed. Ullamcorper dignissim cras tincidunt
      lobortis feugiat vivamus. Consequat mauris nunc congue nisi vitae. Fusce
      ut placerat orci nulla. Sit amet nisl suscipit adipiscing bibendum est.
      Nibh tortor id aliquet lectus proin.
    </Typography>
  </Container>
)

export default Example
```

### With Banner

```tsx
import React from 'react'
import { Page, Container, Menu, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ maxHeight: '30rem' }}>
    <Page>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
      <Page.Banner>
        We are now in the process of reviewing your profile. After your profile
        has been checked, we will reach to you via email about next steps.
      </Page.Banner>
      <Page.Content>
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Banner example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
```

### With Compound Banner

```tsx
import React from 'react'
import { Page, Container, Menu, Typography, Link } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
const { Banner } = Page

const Example = () => (
  <div style={{ maxHeight: '30rem' }}>
    <Page>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
      <Banner>
        You need to sign STA agreement in order to be able to hire talent.
        <Banner.Actions>
          <Link variant='action'>Sign STA Agreement</Link>
        </Banner.Actions>
      </Banner>
      <Banner>
        It looks like your credit card or ACH payment method is not working.
        Please update your payment information.
        <Banner.Actions>
          <Link variant='action'>Update Billing Details</Link>
        </Banner.Actions>
      </Banner>
      <Page.Content>
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Compound banner example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
```

### With Banner and Sidebar

```tsx
import React from 'react'
import {
  Page,
  Container,
  Menu,
  Typography,
  Overview16,
  Jobs16,
  Candidates16,
  Billing16,
  LegalInfo16,
  Participants16,
  Referrals16,
  Resources16,
  Team16,
  ReferralBonus16,
  Help16,
  Logo,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const containerHeight = '30rem'

const Example = () => (
  <div style={{ height: containerHeight, overflowY: 'scroll' }}>
    <Page hamburgerId='banner-and-sidebar-example'>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
      <Page.Banner>
        We are now in the process of reviewing your profile. After your profile
        has been checked, we will reach to you via email about next steps.
      </Page.Banner>
      <Page.Content>
        <Sidebar />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Banner example
      </Typography>
    </Container>
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
  </Container>
)

const Paragraph = () => (
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci
    phasellus egestas tellus rutrum tellus pellentesque eu. Elementum facilisis
    leo vel fringilla est ullamcorper eget nulla. Massa id neque aliquam
    vestibulum. Lorem donec massa sapien faucibus et molestie ac feugiat sed. In
    aliquam sem fringilla ut morbi tincidunt augue interdum velit. Erat velit
    scelerisque in dictum non. Eros donec ac odio tempor orci dapibus. Ac tortor
    vitae purus faucibus ornare suspendisse. Amet commodo nulla facilisi nullam
    vehicula. Lacus vel facilisis volutpat est velit egestas dui id. Tortor
    dignissim convallis aenean et tortor at risus. Mauris in aliquam sem
    fringilla ut morbi tincidunt augue interdum. Nisl suscipit adipiscing
    bibendum est ultricies integer.
  </Typography>
)

const Sidebar = () => (
  <Page.Sidebar
    collapsible
    wrapperMaxHeight={`calc(${containerHeight} - 3.5rem)`}
  >
    <Page.Sidebar.Logo collapsedLogo={<Logo emblem />} fullLogo={<Logo />} />
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Billing16 />} disabled>
        Billing
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        badge={{ content: 5 }}
        icon={<LegalInfo16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Terms and Conditions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Support</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        badge={{ content: 10 }}
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
      <Page.Sidebar.Item badge={{ content: 10 }} icon={<Resources16 />}>
        Menu item with surprisingly long text content
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>

    <Page.Sidebar.Menu bottom>
      <Page.Sidebar.Item icon={<Candidates16 />}>
        Opportunities
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<ReferralBonus16 />}>
        Referral Bonus
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Help16 />}>Help</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

export default Example
```

## Page.Helmet

Manipulate with document head

This component is a wrapper around react-helmet-async, you can use Page.Helmet as a drop-in replacement

      <Page.Helmet>
        <title>My custom title</title>
      </Page.Helmet>

ℹ️ You must wrap your application with `<PicassoProvider>` component to make `<Page.Helmet>` work properly.

Please refer to the original [react-helmet-async documentation](https://www.npmjs.com/package/react-helmet-async).

If you are using **Next.js** please disable usage of `react-helmet-async` by passing `disableHelmet` prop to the `<PicassoProvider>`. After that, refer to the [next/head documentation](https://nextjs.org/docs/api-reference/next/head).

## Page.Content

Use to layout correctly your content in Page

### Default

```tsx
import React from 'react'
import { Page, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page.Content>
      <Content />
    </Page.Content>
  </div>
)

const Content = () => (
  <Container
    top={SPACING_4}
    bottom={SPACING_4}
    left={SPACING_4}
    right={SPACING_4}
  >
    <Typography align='center' variant='heading' size='large'>
      Default example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

export default Example
```

## Page.Article

Use as a page content container

### Default

```tsx
import React from 'react'
import styled from 'styled-components'
import { Page, Container, Typography } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso-icons'

const RightSidebar = styled(Container)`
  border-left: 1px solid ${palette.grey.lighter};
  min-width: 200px;
  flex: 0;
`

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page hamburgerId='hamburger-article-example'>
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Content />
        </Page.Article>
        <SidebarTips />
      </Page.Content>
    </Page>
  </div>
)

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const SidebarTips = () => (
  <RightSidebar>
    <Container
      top={SPACING_4}
      bottom={SPACING_4}
      left={SPACING_4}
      right={SPACING_4}
    >
      <Typography variant='heading' size='small'>
        Some Tips
      </Typography>
      <Container top={SPACING_4}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Container>
    </Container>
  </RightSidebar>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Typography align='center' variant='heading' size='large'>
      Default example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

export default Example
```

## Page.Footer

A Footer component

### Default

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.Footer />
  </Page>
)

export default Example
```

### Right content

```tsx
import React from 'react'
import { Page, Link } from '@toptal/picasso'
import styled from 'styled-components'
import { screens } from '@toptal/picasso-utils'

const StyledLink = styled(Link)`
  margin-left: 2.5rem;

  ${screens('sm')} {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
`

const Example = () => (
  <Page>
    <Page.Footer rightContent={<Links />} />
  </Page>
)

const Links = () => (
  <>
    <StyledLink href='#' color='white'>
      +1.888.867.7001
    </StyledLink>

    <StyledLink href='#' color='white'>
      Contact Us
    </StyledLink>

    <StyledLink href='#' color='white'>
      Privacy Policy
    </StyledLink>

    <StyledLink href='#' color='white'>
      Portal Agreement
    </StyledLink>

    <StyledLink href='#' color='white'>
      Toptal Training
    </StyledLink>
  </>
)

export default Example
```

### Copyright content

```tsx
import React from 'react'
import { Page, Typography } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.Footer copyrightContent={<CopyrightContent />} />
  </Page>
)

const CopyrightContent = () => (
  <>
    <Typography invert size='inherit'>
      © Copyright 2021 TopScreen
    </Typography>
  </>
)

export default Example
```

## Page.Banner

Use to show a banner on the page

### Default

```tsx
import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container bottom={SPACING_4}>
    <Page.Banner>
      We are now in the process of reviewing your profile. After your profile
      has been checked, we will reach to you via email about next steps.
    </Page.Banner>
  </Container>
)

export default Example
```

## Page.Autocomplete

Autocomplete to be used in Page.TopBar

### Page.Autocomplete Dark

```tsx
import React from 'react'
import { Page, UserBadge, Typography } from '@toptal/picasso'
import type { Item } from '@toptal/picasso/Autocomplete'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' },
  { text: 'Bob Smith', value: '8' },
  { text: 'John Doe', value: '9' },
]

const renderOption = ({ text }: Item) => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  <UserBadge name={text!}>
    <Typography size='xsmall'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <>
    <div style={{ height: '18.75rem' }}>
      <Page.TopBar
        title='Dark variant'
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
  </>
)

export default Example
```

### Page.Autocomplete Light

```tsx
import React from 'react'
import { Page, UserBadge, Typography } from '@toptal/picasso'
import type { Item } from '@toptal/picasso/Autocomplete'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' },
]

const renderOption = ({ text }: Item) => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  <UserBadge name={text!}>
    <Typography size='xsmall'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Light variant'
      variant='light'
      leftContent={
        <Page.Autocomplete
          value=''
          placeholder='Users'
          options={options}
          renderOption={renderOption}
          variant='light'
        />
      }
    />
  </div>
)

export default Example
```
