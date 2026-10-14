# AccountSelect

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **accounts** | `[]: 
{

  id: string

  href?: string

  name: string

  position: string

  avatar?: string

}
        ` | - | List of available accounts |
| onSelect | `((account: Account) => void)` | `() => {}` | Callback invoked when specific role record is clicked in the list |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { AccountSelect } from '@toptal/picasso'

const accounts = [
  {
    id: '1',
    name: 'Phil Leif',
    position: 'Account Owner at Stowaway Cosmetics',
  },
  {
    id: '2',
    href: '#',
    name: 'Phil Leif',
    position: 'Company Representative at Marketing Works',
  },
  {
    id: '3',
    href: '#',
    name: 'Phil Leif',
    position: 'Talent',
    avatar: './jacqueline-with-flowers-1954-square.jpg',
  },
]

const Example = () => (
  <div>
    <AccountSelect
      accounts={accounts}
      onSelect={account => console.log(account)}
    />
  </div>
)

export default Example
```

### Select Account Page

```tsx
import React from 'react'
import {
  AccountSelect,
  Grid,
  Page,
  Container,
  Typography,
  Logo,
} from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const accounts = [
  {
    id: '1',
    name: 'Phil Leif',
    position: 'Account Owner at Stowaway Cosmetics',
  },
  {
    id: '2',
    href: '#',
    name: 'Phil Leif',
    position: 'Company Representative at Marketing Works',
  },
  {
    id: '3',
    href: '#',
    name: 'Phil Leif',
    position: 'Talent',
    avatar: './jacqueline-with-flowers-1954-square.jpg',
  },
]

const Example = () => (
  <Page>
    <Page.Content>
      <Grid justifyContent='center'>
        <Grid.Item>
          <Container flex direction='column' alignItems='center'>
            <Logo emblem />
            <Typography variant='heading' size='large'>
              Select an Account
            </Typography>
          </Container>
          <Container top={SPACING_8}>
            <AccountSelect
              accounts={accounts}
              onSelect={account => console.log(account)}
            />
          </Container>
        </Grid.Item>
      </Grid>
    </Page.Content>
  </Page>
)

export default Example
```
