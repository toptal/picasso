# How to layout a page

Learn how to create page layouts using Picasso Grid component along with Page and Container components.

In this tutorial you will learn how to create page layouts from scratch using components from Picasso.
We will focus on using `Page`, `PageHead`, `Section` components to create simple page layout consisting of
header, footer, sidebar and main content.

### Goals
 * Explain `Page` component and it's child components
 * Usage of `PageHead` for title of the main content
 * Usage of `Section` for defining content sections

### End result

```tsx
import React from 'react'
import {
  Page,
  Container,
  Typography,
  Table,
  Helpbox,
  PageHead,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import { Section } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso-icons'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const MainContent = () => (
  <Page.Article>
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Profile</PageHead.Title>
      </PageHead.Main>
    </PageHead>
    <Section title='Details'>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          UI/UX Designer
        </Typography>
        <Typography size='small'>Posted at: Nov 24, 2019</Typography>
      </Container>
      <Table>
        <Table.Body>
          <Table.Row key='talent'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Talent:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hugo, John, Dean</Table.Cell>
          </Table.Row>
          <Table.Row key='commitment'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Commitment:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hourly</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Section>
    <Section title='Notes'>
      <Helpbox>
        <Helpbox.Title>Incomplete profile</Helpbox.Title>
        <Helpbox.Content>
          Talent's profile is incomplete. Please fill in required fields.
        </Helpbox.Content>
      </Helpbox>
    </Section>
  </Page.Article>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <MainContent />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```

## Tutorial

Step-by-step guide to create page layout

### First step: Define page

We will start with defining basic page layout containing header, content and footer. BASE design specifies
how should page look like and Picasso provides implementation with [`Page`](..?path=/story/layout-folder--page) component.

The first step is to import Page component from our library `@toptal/picasso`. Each component that you will
need is imported in the same way:

~~~javascript
import { Page } from '@toptal/picasso'
~~~

`Page` consists of `Page.TopBar`, `Page.Footer` and `Page.Content` so when we import it we
automatically have all necessary components to define our base page layout. Idea is to use composition
pattern and pass props to each component to define e.g. page title, footer links or in most cases
content in `Page.Content`.

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>Here goes content!</Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```

### Second step: Implement sidebar and main content layout

Great, now that we have basic layout let's divide content part of the page into a left sidebar and main content sections.
We will use [`Container`](..?path=/story/layout-folder--container) component for placing them side by side by using `flex` property.

For demonstration purposes, it's been added additional padding for Sidebar and the Main Content.

```tsx
import React from 'react'
import { Page, Container } from '@toptal/picasso'

import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <Container padded={SPACING_4}>Sidebar</Container>
        <Container padded={SPACING_4}>Main Content</Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```

### Third step: Sidebar menu

To add the sidebar menu we will be using [`Sidebar`](..?path=/story/components-sidebar--sidebar) component,
which is a part of Picasso librabry. It should fill all available height of the left column.

```tsx
import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso-icons'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Container top={SPACING_6} bottom={SPACING_6}>
            Main Content
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```

### Forth step: Title and sections

Main content can have various layouts, but for this tutorial, we choose to have a title
and two sections. We use [`PageHead`](..?path=/story/picasso-pagehead--pagehead) for
the title and [`Section`](..?path=/story/components-section--section) for content
sections. Also, it's very important to use use
`Page.Article` component, because we use a flexbox wrapper
around the page and we need to make `MainContent` grow and fill all available space.

```tsx
import React from 'react'
import { Page, PageHead } from '@toptal/picasso'
import { Globe16, PortfolioDesigner16, Profile16 } from '@toptal/picasso-icons'
import { Section } from '@toptal/picasso'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const MainContent = () => (
  <Page.Article>
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Profile</PageHead.Title>
      </PageHead.Main>
    </PageHead>
    <Section title='Details'>Details content</Section>
    <Section title='Notes'>Notes content</Section>
  </Page.Article>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <MainContent />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```

### Forth step: Main content

We use [`Container`](..?path=/story/utils-folder--container) component
to define inner spacings of the talent details container.

Picasso defines standard BASE [colors](..?path=/story/utils-folder--colors) so we can
easily set color of containers by using `palette`.

Talent details item is using `Typography` with different variants and `Table` for structuring
data.

And that's it, we have implemented our goal.

```tsx
import React from 'react'
import {
  Page,
  Container,
  Typography,
  Table,
  Helpbox,
  PageHead,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import { Section } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso-icons'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const MainContent = () => (
  <Page.Article>
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Profile</PageHead.Title>
      </PageHead.Main>
    </PageHead>
    <Section title='Details'>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          UI/UX Designer
        </Typography>
        <Typography size='small'>Posted at: Nov 24, 2019</Typography>
      </Container>
      <Table>
        <Table.Body>
          <Table.Row key='talent'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Talent:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hugo, John, Dean</Table.Cell>
          </Table.Row>
          <Table.Row key='commitment'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Commitment:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hourly</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Section>
    <Section title='Notes'>
      <Helpbox>
        <Helpbox.Title>Incomplete profile</Helpbox.Title>
        <Helpbox.Content>
          Talent's profile is incomplete. Please fill in required fields.
        </Helpbox.Content>
      </Helpbox>
    </Section>
  </Page.Article>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <MainContent />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
```
