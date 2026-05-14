# UserBadge

Show user avatar and name along with addition content

## Props

### UserBadge

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **name** | `string` | - | User full name to display |
| renderName | `((name: string, invert?: boolean) => ReactNode)` | - | Function responsible for rendering the user's name with a custom component |
| avatar | `ReactNode` | - | Photo url or custom Avatar component |
| size | `"xxsmall" \| "xsmall" \| "small"` | `xsmall` | Size |
| title | `string` | - | Title that is rendered on the right of name |
| renderTitle | `((title: string, invert?: boolean) => ReactNode)` | - | Function responsible for rendering the user's title with a custom component |
| invert | `boolean` | `false` | Invert color |
| center | `AlignmentType` | `auto` | Center text vertically  * auto - if no children is provided text will be centered * manual - based on `center` prop `boolean` value |
| children | `ReactNode` | - | Additional content of UserBadge |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography size='xsmall'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <UserBadge name='Jacqueline Roque' />
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
          size='xxsmall'
        >
          <Typography size='xsmall'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography size='xsmall'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
          size='small'
        >
          <Typography size='xsmall'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Alignment

```tsx
import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <Typography>Auto</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
            >
              <Typography size='xsmall'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
      <Grid.Item>
        <Typography>Centered</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center
            >
              <Typography size='xsmall'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
      <Grid.Item>
        <Typography>Non-centered</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center={false}
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center={false}
            >
              <Typography size='xsmall'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Invert

```tsx
import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <div style={{ backgroundColor: '#204ecf', padding: '1rem' }}>
          <UserBadge
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            invert
          >
            <Typography invert size='xsmall'>
              UI specialist
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div style={{ backgroundColor: '#204ecf', padding: '1rem' }}>
          <UserBadge
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            size='small'
            invert
          >
            <Typography invert size='xsmall'>
              UI specialist
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Custom

```tsx
import React from 'react'
import { UserBadge, Typography, Avatar, Container } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <UserBadge
      name='Jacqueline Roque'
      avatar={
        <Avatar
          size='large'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      }
    >
      <Typography variant='body' size='xsmall'>
        Worked as
      </Typography>
      <Container left={SPACING_2}>
        <Typography size='xsmall'>UI specialist</Typography>
        <Typography size='xsmall'>Painter</Typography>
        <Typography size='xsmall'>Student</Typography>
      </Container>
    </UserBadge>
  </div>
)

export default Example
```

### With Title

```tsx
import React from 'react'
import {
  UserBadge,
  Grid,
  Typography,
  Link,
  TypographyOverflow,
} from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <Typography>Standard Title</Typography>
        <UserBadge
          name='Jacqueline Roque'
          title='UI specialist'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography size='xsmall'>
            <Link href='#'>Send me an email</Link>
          </Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <Typography>Custom Title with ellipsis</Typography>
        <div style={{ width: '220px' }}>
          <UserBadge
            name='Jacqueline Roque'
            title='UI specialist'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            renderName={(name: string, invert?: boolean) => (
              <Typography
                inline
                variant='heading'
                size='small'
                invert={invert}
                style={{ whiteSpace: 'nowrap' }}
              >
                {name}
              </Typography>
            )}
            renderTitle={(title: string, invert?: boolean) => (
              <TypographyOverflow
                color='red'
                inline
                size='xsmall'
                invert={invert}
                style={{
                  marginLeft: '0.5em',
                }}
              >
                {title}
              </TypographyOverflow>
            )}
          >
            <Typography size='xsmall'>
              <Link href='#'>Send me an email</Link>
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### With Icon

```tsx
import React from 'react'
import { UserBadge, Support16, Avatar } from '@toptal/picasso'

const Example = () => (
  <div>
    <UserBadge
      name='Jacqueline Roque'
      title='UI specialist'
      avatar={
        <Avatar.Wrapper size='xsmall'>
          <Support16 color='white' />
        </Avatar.Wrapper>
      }
    />
  </div>
)

export default Example
```
