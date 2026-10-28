# SkeletonLoader

## Props

### SkeletonLoader.Typography

| Name | Type | Default | Description |
|------|------|---------|-------------|
| rows | `number` | `1` | Specify the amount of rows |
| uniqueKey | `string` | - | Default to random unique id, you can set your own unique id to fix SSR |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | `{}` | Style applied to root element |

### SkeletonLoader.Header

| Name | Type | Default | Description |
|------|------|---------|-------------|
| uniqueKey | `string` | - | Default to random unique id, you can set your own unique id to fix SSR |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### SkeletonLoader.Button

| Name | Type | Default | Description |
|------|------|---------|-------------|
| uniqueKey | `string` | - | Default to random unique id, you can set your own unique id to fix SSR |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| size | `"small" \| "medium" \| "large"` | `medium` | A button can have different sizes |

### Page Loader

SkeletonLoader is a compound component that exposes a few primitive content loaders.
    It's up to the developer to use them to build a loader that mimics the actual UI as close as possible.
    Below is a simple example demonstrating how. If you make a reusable skeleton loader - export it to topkit.

```tsx
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import {
  Container,
  PortfolioDesigner16,
  Profile16,
  Globe16,
  Page,
  Menu,
  Typography,
  Update16,
  Button,
  Grid,
  Image,
  SkeletonLoader,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const useGetData = (): [boolean, () => void] => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    setTimeout(() => setLoading(false), 2000)
  }

  const reload = () => {
    setLoading(true)
  }

  return [loading, reload]
}

const SidebarMenu = ({ children }: { children: ReactNode }) => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
    <Page.Sidebar.Menu bottom>{children}</Page.Sidebar.Menu>
  </Page.Sidebar>
)

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item>My Account</Menu.Item>
      <Menu.Item>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <>
    <Container flex justifyContent='space-between' alignItems='center'>
      <Typography align='center' variant='heading' size='large'>
        My Page
      </Typography>
      <Button>Read more</Button>
    </Container>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <Grid>
      <Grid.Item sm={6}>
        <Typography align='center' variant='heading'>
          My section
        </Typography>
        <Container flex justifyContent='center'>
          <Image
            src='./jacqueline-with-flowers-1954-square.jpg'
            alt='Default image'
            style={{ width: '5rem', height: '5rem' }}
          />
        </Container>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Typography align='center' variant='heading'>
          My Section
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Grid.Item>
    </Grid>
  </>
)

const PageLoader = () => (
  <>
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      bottom={SPACING_4}
    >
      <SkeletonLoader.Header />
      <SkeletonLoader.Button />
    </Container>

    <Container bottom={SPACING_4}>
      <SkeletonLoader.Typography rows={4} />
    </Container>

    <Grid>
      <Grid.Item sm={6}>
        <Container
          flex
          alignItems='center'
          bottom={SPACING_4}
          direction='column'
        >
          <SkeletonLoader.Header />

          <SkeletonLoader.Media variant='image' width='5rem' height='5rem' />
        </Container>

        <SkeletonLoader.Typography rows={5} />
      </Grid.Item>

      <Grid.Item sm={6}>
        <Container flex justifyContent='center' bottom={SPACING_4}>
          <SkeletonLoader.Header />
        </Container>
        <SkeletonLoader.Typography rows={8} />
      </Grid.Item>
    </Grid>
  </>
)

const PageExample = () => {
  const [loading, reloadData] = useGetData()

  return (
    <div style={{ height: '40rem' }}>
      <Page>
        <Page.TopBar rightContent={<RightContent />} title='Default example' />
        <Page.Content>
          <SidebarMenu>
            <Page.Sidebar.Item icon={<Update16 />} onClick={reloadData}>
              Click me to reload the content!
            </Page.Sidebar.Item>
          </SidebarMenu>
          <Container
            style={{ flex: 1 }}
            top={SPACING_4}
            bottom={SPACING_4}
            left={SPACING_4}
            right={SPACING_4}
          >
            {loading ? PageLoader() : <Content />}
          </Container>
        </Page.Content>
        <Page.Footer />
      </Page>
    </div>
  )
}

export default PageExample
```

### Different background color

Skeleton loader is designed to be used on a variety of backgrounds.

```tsx
import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'

type Props = {
  backgroundColor: string
}

const LoaderContent = ({ backgroundColor }: Props) => (
  <Container style={{ backgroundColor, maxWidth: '32%' }} padded={SPACING_4}>
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      bottom={SPACING_4}
    >
      <SkeletonLoader.Header />
      <SkeletonLoader.Button />
    </Container>

    <Container bottom={SPACING_4}>
      <SkeletonLoader.Typography rows={2} />
    </Container>

    <Grid>
      <Grid.Item sm={6}>
        <SkeletonLoader.Media variant='image' width='5rem' height='5rem' />
      </Grid.Item>

      <Grid.Item sm={6}>
        <Container flex justifyContent='center' bottom={SPACING_4}>
          <SkeletonLoader.Header />
        </Container>
        <SkeletonLoader.Typography rows={2} />
      </Grid.Item>
    </Grid>
  </Container>
)

const BackgroundExample = () => (
  <Grid>
    <LoaderContent backgroundColor={palette.grey.dark} />
    <LoaderContent backgroundColor={palette.blue.darker} />
    <LoaderContent backgroundColor={palette.grey.darker} />
  </Grid>
)

export default BackgroundExample
```

## SkeletonLoader.Header

```tsx
import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Default alignment</Typography>
      </Container>
      <SkeletonLoader.Header />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Centered</Typography>
      </Container>
      <Container flex justifyContent='center'>
        <SkeletonLoader.Header />
      </Container>
    </Container>
  </>
)

export default Example
```

## SkeletonLoader.Typography

```tsx
import React from 'react'
import { SkeletonLoader, Typography, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>One row</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Two rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={2} />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Three rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
  </>
)

export default Example
```

## SkeletonLoader.Button

```tsx
import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Default</Typography>
      </Container>
      <SkeletonLoader.Button />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Align center</Typography>
      </Container>

      <Container flex justifyContent='center'>
        <SkeletonLoader.Button />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Align right</Typography>
      </Container>

      <Container flex justifyContent='flex-end'>
        <SkeletonLoader.Button />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography variant='heading'>Sizes</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button size='small' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button size='medium' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button size='large' />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography variant='heading'>Circular</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button circular size='small' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button circular size='medium' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button circular size='large' />
      </Container>
    </Container>
  </>
)

export default Example
```

## SkeletonLoader.Media

```tsx
import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Avatar</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media size='xxsmall' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='xsmall' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='small' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='medium' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Icon</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='medium' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Shapes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='large' circle />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Image</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='image' width='4rem' height='4rem' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Shapes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media
              variant='image'
              width='2rem'
              height='2rem'
              circle
            />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
        </Container>
      </Container>
    </Container>
  </>
)

export default Example
```
