# PageSidebar

Navigation items provide access to parts in your app

## Props

### PageSidebar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"light" \| "dark"` | `light` | Style variant of Sidebar and subcomponents |
| children | `ReactNode` | - | Content |
| collapsible | `boolean` | - | Indicates Sidebar is collapsible |
| defaultCollapsed | `boolean` | - | Indicates Sidebar is collapsed as default |
| testIds | `{ collapseButton?: string; container?: string; scrollableContainer?: string \| undefined; } \| undefined` | - | Callback to notify when sidebar is having collapsed or default state |
| size | `"small" \| "medium" \| "large"` | `medium` | Different width of sidebar |
| disableSticky | `boolean` | - | Make sidebar scroll with the content |
| onCollapse | `(() => void)` | - | Callback when sidebar is collapsed |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Sidebar.Menu

| Name | Type | Default | Description |
|------|------|---------|-------------|
| bottom | `boolean` | `false` | Defines is sidebar menu pushed to bottom of sidebar |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Sidebar.Item

| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | `ReactElement` | - | Pass icon to be used as part of item |
| selected | `boolean` | `false` | Highlights the item as selected |
| disabled | `boolean` | - | Whether to render disabled item |
| collapsible | `boolean` | `false` | If item has menu defines can menu be collapsed |
| menu | `ReactElement` | - | Renders nested sidebar menu |
| onClick | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void` | - | Callback when item is clicked |
| onClick | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void` | - | Callback when item is hovered |
| as | `"symbol" \| "abbr" \| "address" \| "article" \| "aside" \| "b" \| "bdi" \| "bdo" \| "big" \| "blockquote" \| "caption" \| "cite" \| "code" \| "dd" \| "del" \| "details" \| "dfn" \| "dt" \| "em" \| "figcaption" \| ... 95 more ...` | - | Component name to render the menu item as |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| badge | `number \| BadgeProps: { content: number, variant?: "white" \| "red", max?: number }` | - | Show number of unread messages |
| tag | `string \| TagProps: { content: string, variant?: "red" \| "yellow" \| "dark-grey" \| "light-grey" \| "green" }` | - | Highlight new feature |

### Sidebar.Logo

| Name | Type | Default | Description |
|------|------|---------|-------------|
| collapsedLogo | `ReactNode` | - | Logo to display when Sidebar is in collapsed state |
| fullLogo | `ReactNode` | - | Logo to display when Sidebar is in default state |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Page, Logo, Typography } from '@toptal/picasso'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16,
  Participants16,
} from '@toptal/picasso-icons'

const Example = () => (
  <div
    style={{
      height: '58rem',
      maxHeight: '58rem',
      overflowY: 'scroll',
    }}
  >
    <Page.Sidebar>
      <Page.Sidebar.Logo>
        <Logo />
      </Page.Sidebar.Logo>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item icon={<Home16 />} selected>
          Overview
        </Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Candidates16 />}>
          Candidates
        </Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Billing16 />} disabled>
          Billing
        </Page.Sidebar.Item>
        <Page.Sidebar.Item badge={{ content: 5 }} icon={<LegalInfo16 />}>
          <Typography size='medium' color='inherit'>
            Legal Info
          </Typography>
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          collapsible
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
        <Page.Sidebar.Item icon={<Resources16 />}>
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
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Page, Logo, Container, Typography, Grid } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Participants16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16,
} from '@toptal/picasso-icons'

const ExampleSidebar = ({ variant }: { variant: 'light' | 'dark' }) => (
  <Page.Sidebar variant={variant}>
    <Page.Sidebar.Logo>
      <Logo variant={variant === 'dark' ? 'white' : undefined} />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Home16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Billing16 />} disabled>
        Billing
      </Page.Sidebar.Item>
      <Page.Sidebar.Item badge={{ content: 5 }} icon={<LegalInfo16 />}>
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
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
      <Page.Sidebar.Item icon={<Resources16 />}>Resources</Page.Sidebar.Item>
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

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '58rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Light (default):
        </Typography>
      </Container>
      <ExampleSidebar variant='light' />
    </Grid.Item>

    <Grid.Item style={{ height: '58rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Dark:
        </Typography>
      </Container>
      <ExampleSidebar variant='dark' />
    </Grid.Item>
  </Grid>
)

export default Example
```

### Collapsible

```tsx
import React from 'react'
import { Page, Logo, Typography } from '@toptal/picasso'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16,
  Participants16,
} from '@toptal/picasso-icons'

const Example = () => {
  const handleCollapse = () => {
    window.alert('Sidebar onCollapse called')
  }

  return (
    <div
      style={{
        height: '58rem',
        maxHeight: '58rem',
        overflowY: 'scroll',
      }}
    >
      <Page.Sidebar collapsible onCollapse={handleCollapse}>
        <Page.Sidebar.Logo
          collapsedLogo={<Logo emblem />}
          fullLogo={<Logo />}
        />
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item icon={<Home16 />} selected>
            Overview
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Candidates16 />}>
            Candidates
          </Page.Sidebar.Item>
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
    </div>
  )
}

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Page, Logo, Typography, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Participants16,
} from '@toptal/picasso-icons'

const Menu = ({ size }: { size: 'small' | 'medium' | 'large' }) => (
  <Page.Sidebar size={size}>
    <Page.Sidebar.Logo>
      <Logo />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Home16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <Container flex gap={SPACING_8}>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Small (212px)
      </Typography>
      <Menu size='small' />
    </Container>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Medium (236px)
      </Typography>
      <Menu size='medium' />
    </Container>
    <Container>
      <Typography variant='heading' size='xsmall'>
        Large (280px)
      </Typography>
      <Menu size='large' />
    </Container>
  </Container>
)

export default Example
```

## Sidebar Item

### As a Link

Most of the time you would use Sidebar.Item as a router Link. This is how to do it.

```tsx
import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Page } from '@toptal/picasso'
import { Overview16 } from '@toptal/picasso-icons'

const SidebarDefaultExample = () => (
  <BrowserRouter>
    <Page.Sidebar>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item
          icon={<Overview16 />}
          as={Link}
          to='/#overview'
          selected
        >
          Overview
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  </BrowserRouter>
)

export default SidebarDefaultExample
```

### Icons

```tsx
import React from 'react'
import { Page, Typography, Grid, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Overview16, Referrals16 } from '@toptal/picasso-icons'

const sidebarWithIcons = (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />}>Overview</Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item selected>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const sidebarWithoutIcons = (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item>Overview</Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item selected>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          With icons
        </Typography>
      </Container>
      {sidebarWithIcons}
    </Grid.Item>

    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Without icons
        </Typography>
      </Container>
      {sidebarWithoutIcons}
    </Grid.Item>
  </Grid>
)

export default Example
```

### Collapsible

Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso-icons'

const Example = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        test-id='Referrals'
        collapsible
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
      <Page.Sidebar.Item
        collapsible
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Community Leader</Page.Sidebar.Item>
            <Page.Sidebar.Item>Speakers Network</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Get Involved
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

export default Example
```

### Expanded by default

When a nested Sidebar.Item is selected, it automatically expands the menu.

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso-icons'

const Example = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item selected>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

export default Example
```

### With Badge and Tag

```tsx
import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  Referrals16,
  Overview16,
  AddDocument16,
  Afternoon16,
  Award16,
  BankWire16,
  Bell16,
} from '@toptal/picasso-icons'

const Menu = () => (
  <Page.Sidebar.Menu>
    <Page.Sidebar.Item icon={<Award16 />}>Overview</Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} icon={<BankWire16 />}>
      Jobs
    </Page.Sidebar.Item>
    <Page.Sidebar.Item tag='New' icon={<Afternoon16 />}>
      Team
    </Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} tag='New' icon={<Bell16 />}>
      Users
    </Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} tag='New' icon={<Bell16 />}>
      Users With Very Long Label
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<Referrals16 />}
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item badge={5}>Referrals</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Referrals
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<Overview16 />}
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item tag='New'>Share Online</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Share Online
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<AddDocument16 />}
      disabled
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item badge={5} tag='New'>
            Legal Info
          </Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Legal Info
    </Page.Sidebar.Item>
  </Page.Sidebar.Menu>
)

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Page.Sidebar size='large'>
      <Menu />
    </Page.Sidebar>
    <Page.Sidebar size='large' defaultCollapsed collapsible>
      <Menu />
    </Page.Sidebar>
  </Container>
)

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Page } from '@toptal/picasso'
import { Referrals16, Overview16 } from '@toptal/picasso-icons'

const Example = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} disabled>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        disabled
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
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

export default Example
```
