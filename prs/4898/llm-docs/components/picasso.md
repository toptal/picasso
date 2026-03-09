# Picasso

The wrapper and the root component.
      &nbsp;  
      &nbsp;  

      All the rest of the components from Picasso library
      should be used only as nested in Picasso component.
      The preferred way to do that - to wrap your app within
      the <Picasso> component.

## Props

### Picasso

| Name | Type | Default | Description |
|------|------|---------|-------------|
| loadFonts | `boolean` | `true` | Whether to load fonts file to the page |
| loadFavicon | `boolean` | `true` | Whether to specify favicons in the head |
| environment | `"development" \| "staging" \| "production" \| "test" \| "temploy"` | `development` | current environment |
| reset | `boolean` | `true` | Whether to apply Picasso CSS reset |
| responsive | `boolean` | `true` | Sets a minimum width of the page |
| fixViewport | `boolean` | `true` | Whether to load viewport fix or not |
| preventPageWidthChangeOnScrollbar | `boolean` | `true` | Whether to load scrollbar page jump fix or not |
| notificationContainer | `HTMLElement` | - | Notification DOMNode for createPortal |
| RootComponent | `ForwardRefExoticComponent<PicassoRootNodeProps & RefAttributes<HTMLDivElement>>` | `PicassoRootNode` | Component that is used to render root node |
| disableHelmet | `boolean` | - | Disables usage of `<HelmetProvider>` component from `react-helmet-async` package |
| disableTransitions | `boolean` | - | Disables transitions for components like Loader, to make testing easier |
| disableClassNamePrefix | `boolean` | - | Disables unique prefix for styles class names |
| injectFirst | `boolean` | - | By default, the styles are injected last in the <head> element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Picasso's styles, set this prop. |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### PicassoLight

The light version of the wrapper and the root component.

All the rest of the components from Picasso library
should be used only as nested in Picasso component.
The preferred way to do that - to wrap your app within
the <Picasso> component.

This is a light composable version of <Picasso> component.
You can add necessary functionality by wrapping the following
utility components/providers:

- <FixViewport /> - the same as passing a 'fixViewport' prop to <Picasso>
- <Favicon /> - the same as passing a 'loadFavicon' prop to <Picasso>
- <FontsLoader /> - the same as passing a 'loadFonts' prop to <Picasso>
- <NotificationsProvider>{children}</NotificationsProvider> - enables notifications in the wrapped app
    

| Name | Type | Default | Description |
|------|------|---------|-------------|
| environment | `"development" \| "staging" \| "production" \| "test" \| "temploy"` | `development` | current environment |
| reset | `boolean` | `true` | Whether to apply Picasso CSS reset |
| responsive | `boolean` | `true` | Sets a minimum width of the page |
| preventPageWidthChangeOnScrollbar | `boolean` | - | Whether to load scrollbar page jump fix or not |
| notificationContainer | `HTMLElement` | - | Notification DOMNode for createPortal |
| RootComponent | `ForwardRefExoticComponent<PicassoRootNodeProps & RefAttributes<HTMLDivElement>>` | `PicassoRootNode` | Component that is used to render root node |
| disableHelmet | `boolean` | - | Disables usage of `<HelmetProvider>` component from `react-helmet-async` package |
| disableTransitions | `boolean` | - | Disables transitions for components like Loader, to make testing easier |
| disableClassNamePrefix | `boolean` | - | Disables unique prefix for styles class names |
| injectFirst | `boolean` | `true` | By default, the styles are injected last in the <head> element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Picasso's styles, set this prop. |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
import { default as Picasso, SPACING_12 } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = () => (
  <Picasso
    loadFavicon={false}
    fixViewport={false}
    preventPageWidthChangeOnScrollbar={false}
  >
    <Page>
      <Page.TopBar title='App Page' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
            Your application goes here
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </Picasso>
)

const Index = () => (
  <div id='root'>
    <App />
  </div>
)

export default Index
```

### Responsive Disabled

```tsx
import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
import { default as Picasso, SPACING_4 } from '@toptal/picasso-provider'
import { Grid, Page, Container, Menu, Typography } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
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

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item>Team</Page.Sidebar.Item>
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
    <Grid>
      <Grid.Item sm={6}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Grid.Item>
      <Grid.Item sm={6}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Grid.Item>
    </Grid>
  </Container>
)

const Index = () => (
  <div id='root'>
    <Picasso
      responsive={false}
      loadFavicon={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
    >
      <Example />
    </Picasso>
  </div>
)

export default Index
```

### ClassNames Prefix Disabled

```tsx
import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
// eslint-disable-next-line import/no-extraneous-dependencies
import { default as Picasso, SPACING_12 } from '@toptal/picasso-provider'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Page, Container } from '@toptal/picasso'

const App = () => (
  <Picasso disableClassNamePrefix preventPageWidthChangeOnScrollbar={false}>
    <Page>
      <Page.TopBar title='App Page' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
            Your application goes here
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </Picasso>
)

const Index = () => (
  <div id='root'>
    <App />
  </div>
)

export default Index
```

### PicassoLight without any utilities

```tsx
import type { ReactNode } from 'react'
import React from 'react'
import { PicassoLight, SPACING_12 } from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = ({ children }: { children: ReactNode }) => (
  <PicassoLight>
    <Page>
      <Page.TopBar title='Picasso without any dependencies' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
            {children}
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </PicassoLight>
)

const Index = () => (
  <div id='root'>
    <App>Your application without adding any utility components</App>
  </div>
)

export default Index
```

### PicassoLight with FixViewport and FontsLoader

```tsx
import type { ReactNode } from 'react'
import React from 'react'
import {
  PicassoLight,
  FixViewport,
  FontsLoader,
  SPACING_12,
} from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = ({ children }: { children: ReactNode }) => (
  <PicassoLight>
    <FixViewport />
    <FontsLoader />
    <Page>
      <Page.TopBar title='Picasso with viewport fixing utility and fonts loaded' />
      <Page.Content>
        <Page.Article>
          <Container
            flex
            justifyContent='center'
            top={SPACING_12}
            style={{ height: '14rem' }}
          >
            {children}
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </PicassoLight>
)

const Index = () => (
  <div id='root'>
    <App>Your app with a fixed viewport tag and fonts loaded</App>
  </div>
)

export default Index
```

### PicassoLight with notifications and favicon

```tsx
import type { ReactNode } from 'react'
import React from 'react'
import {
  PicassoLight,
  Favicon,
  NotificationsProvider,
  SPACING_12,
} from '@toptal/picasso-provider'
import { Page, Container, Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const App = ({ children }: { children?: ReactNode }) => {
  const { showInfo } = useNotifications()

  return (
    <PicassoLight>
      <Favicon />
      <NotificationsProvider>
        <Page>
          <Page.TopBar title='Picasso with notifications provider and favicon' />
          <Page.Content>
            <Page.Article>
              <Container
                flex
                justifyContent='center'
                top={SPACING_12}
                style={{ height: '14rem' }}
              >
                <Button
                  data-testid='trigger'
                  variant='secondary'
                  onClick={() =>
                    showInfo(
                      "That's one small step for a man, one giant leap for mankind."
                    )
                  }
                >
                  Show general notification
                </Button>
                {children}
              </Container>
            </Page.Article>
          </Page.Content>
          <Page.Footer />
        </Page>
      </NotificationsProvider>
    </PicassoLight>
  )
}

const Index = () => (
  <div id='root'>
    <App></App>
  </div>
)

export default Index
```
