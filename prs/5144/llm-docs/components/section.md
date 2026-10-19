# Section

Use sections to organize content on the page

## Props

### Section

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `ReactNode` | - | Title of the Section |
| subtitle | `ReactNode` | - | Subtitle of the Section |
| actions | `ReactNode` | - | Additional actions of the Section |
| children | `ReactNode` | - | Main content of the Section |
| collapsible | `boolean` | `false` | Whether section can be collapsed |
| defaultCollapsed | `boolean` | `true` | Default collapsed value **(applied if `collapsible: true`)** |
| collapsed | `boolean` | - | Controlled collapsed state |
| onToggle | `((collapsed: boolean) => void)` | - | Callback when the collapsed state changes |
| titleSize | `"small" \| "medium"` | `medium` | Title size of the inner text |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| variant | `bordered \| default \| withHeaderBar` | `default` | The variant to use |

### Default

```tsx
import React from 'react'
import { Table, Section } from '@toptal/picasso'

const Example = () => {
  return (
    <Section title='Talents' subtitle={`${data.length} people`}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Talent type</Table.Cell>
            <Table.Cell>Company</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Country</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.talentType}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.country}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

export default Example
```

### With Actions

```tsx
import React from 'react'
import { Button, Table, Section } from '@toptal/picasso'

const Example = () => {
  return (
    <Section
      title='Talents'
      subtitle={`${data.length} people`}
      actions={
        <Button size='small' variant='secondary'>
          More
        </Button>
      }
    >
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Talent type</Table.Cell>
            <Table.Cell>Company</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Country</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.talentType}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.country}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

export default Example
```

### Collapsible

```tsx
import React from 'react'
import {
  Table,
  Button,
  Grid,
  Typography,
  Section,
  Container,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const content = (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Talent type</Table.Cell>
          <Table.Cell>Company</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.talentType}</Table.Cell>
            <Table.Cell>{row.company}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )

  return (
    <Grid>
      <Grid.Item sm={6}>
        <Typography>Collapsible section is collapsed by default.</Typography>
        <Section
          title='Talents'
          subtitle={`${data.length} people`}
          actions={
            <Button size='small' variant='secondary'>
              More
            </Button>
          }
          collapsible
        >
          {content}
        </Section>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Typography>
          You can modify this behavior with `defaultCollapsed` property.
        </Typography>
        <Section
          title='Talents'
          subtitle={`${data.length} people`}
          actions={
            <Button size='small' variant='secondary'>
              More
            </Button>
          }
          collapsible
          defaultCollapsed={false}
        >
          {content}
        </Section>
      </Grid.Item>

      <Grid.Item sm={6}>
        <Typography>Collapsible section with header bar.</Typography>
        <Container top={SPACING_4}>
          <Section title='Details' collapsible variant='withHeaderBar'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            dolore, et ipsum eligendi sunt maiores aliquam blanditiis labore
            praesentium magnam necessitatibus. Quisquam ipsum, doloremque sit
            laudantium beatae nihil similique. Laborum eum itaque recusandae ut
            eaque vero et atque dolor nostrum nobis maxime, nihil nisi non
            perferendis amet voluptatibus odio laudantium!
          </Section>
        </Container>
      </Grid.Item>

      <Grid.Item sm={6}>
        <Typography>Collapsible bordered section.</Typography>
        <Container top={SPACING_4}>
          <Section title='Details' collapsible variant='bordered'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            dolore, et ipsum eligendi sunt maiores aliquam blanditiis labore
            praesentium magnam necessitatibus. Quisquam ipsum, doloremque sit
            laudantium beatae nihil similique. Laborum eum itaque recusandae ut
            eaque vero et atque dolor nostrum nobis maxime, nihil nisi non
            perferendis amet voluptatibus odio laudantium!
          </Section>
        </Container>
      </Grid.Item>
    </Grid>
  )
}

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

export default Example
```

### Variant

```tsx
import React from 'react'
import { Container, Table, Typography, Section } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'

const TableDemo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Talent type</Table.Cell>
        <Table.Cell>Company</Table.Cell>
        <Table.Cell>Role</Table.Cell>
        <Table.Cell>Country</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.talentType}</Table.Cell>
          <Table.Cell>{row.company}</Table.Cell>
          <Table.Cell>{row.role}</Table.Cell>
          <Table.Cell>{row.country}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

const Example = () => {
  return (
    <>
      <Container>
        <Typography variant='heading' size='small'>
          Bordered
        </Typography>
        <Container top={SPACING_4}>
          <Section
            title='Talents'
            subtitle={`${data.length} people`}
            variant='bordered'
          >
            <TableDemo />
          </Section>
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          WithHeaderBar
        </Typography>
        <Container top={SPACING_4}>
          <Section
            title='Talents'
            subtitle={`${data.length} people`}
            variant='withHeaderBar'
          >
            <TableDemo />
          </Section>
        </Container>
      </Container>
    </>
  )
}

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

export default Example
```

### Title Size

```tsx
import React from 'react'
import { Grid, List, Typography, Section } from '@toptal/picasso'

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={6}>
        <Typography>Default title size</Typography>
        <Section title='Quotes'>
          <List variant='unordered'>
            <List.Item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </List.Item>
            <List.Item>In nec cursus lectus, nec malesuada tellus.</List.Item>
          </List>
        </Section>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Typography>Small title size</Typography>
        <Section title='Quotes' titleSize='small'>
          <List variant='unordered'>
            <List.Item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </List.Item>
            <List.Item>In nec cursus lectus, nec malesuada tellus.</List.Item>
          </List>
        </Section>
      </Grid.Item>
    </Grid>
  )
}

export default Example
```

### Controlled Section

```tsx
import React, { useState } from 'react'
import { Button, Container, Section, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [sectionIsOpened, setSectionIsOpened] = useState(false)

  return (
    <>
      <Container>
        <Button onClick={() => setSectionIsOpened(!sectionIsOpened)}>
          Toggle section
        </Button>
      </Container>
      <Container top={SPACING_4}>
        <Section
          collapsible
          onToggle={collapsed => setSectionIsOpened(collapsed ? false : true)}
          variant='bordered'
          title='First section'
          collapsed={!sectionIsOpened}
        >
          <Typography>First section content</Typography>
          <Button onClick={() => setSectionIsOpened(false)}>
            Close section
          </Button>
        </Section>
      </Container>
    </>
  )
}

export default Example
```
