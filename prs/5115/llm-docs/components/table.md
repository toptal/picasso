# Table

Display sets of data

## Props

### Table

Root component representing table

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Children components (`Table.Head`, `Table.Body`, `Table.Footer`) |
| spacing | `"regular" \| "compact" \| "narrow"` | `regular` | Inner spacing |
| variant | `"clear" \| "bordered" \| "striped"` | `bordered` | Appearance variant |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.Head

Table Header component

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | The content of the component, normally `Table.Row` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.SectionHead

Table section header

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.Footer

Table Footer component

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Zero or more Table.Row elements. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.Body

Table Body component

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | The content of the component, normally `Table.Row` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.Row

Table row container

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Should be valid `<tr>` children such as `Table.Cell`. |
| hover | `boolean` | `false` | If true, the table row will shade on hover |
| selected | `boolean` | `false` | If true, the table row will have the selected shading |
| onClick | `((event: MouseEvent<HTMLTableRowElement, MouseEvent>) => void)` | - | Callback invoked when user clicks on table row |
| stripeEven | `boolean` | `false` | Set a stripe even background for the row |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Table.Cell

Cell for table content

| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | `"inherit" \| "left" \| "center" \| "right" \| "justify"` | `inherit` | Set the text-align on the table cell content |
| colSpan | `number` | - | Indicates for how many columns the cell extends |
| rowSpan | `number` | - | Indicates for how many rows the cell extends |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Table.ExpandableRow

Expandable row

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Should be valid `<tr>` children such as `Table.Cell`. |
| **content** | `ReactNode` | - | Collapsible content of `TableExpandableRow` |
| expanded | `boolean` | `false` | Whether the row is in collapsed or expanded state |
| stripeEven | `boolean` | `false` | Set a stripe even background for the row |
| defaultExpanded | `boolean` | - | Makes the row appear without transition when it is expanded the very first time |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### TableSortableCell

Sortable cell for table header

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **sortDirection** | `"asc" \| "desc"` | - | Set the direction of sorting to get the appropriate icon |
| **onSortClick** | `() => void` | - | Callback called when sort button is clicked |
| align | `"inherit" \| "left" \| "center" \| "right" \| "justify"` | `inherit` | Set the text-align on the table cell content |
| colSpan | `number` | - | Indicates for how many columns the cell extends |
| rowSpan | `number` | - | Indicates for how many rows the cell extends |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Plain table

```tsx
import React from 'react'
import { Table } from '@toptal/picasso'

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

const Example = () => (
  <div>
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
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
)

export default Example
```

### Appearance variants

```tsx
import React, { useState } from 'react'
import type { TableProps } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Table, Select, Container } from '@toptal/picasso'

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

const Example = () => {
  const [variant, setVariant] = useState<TableProps['variant']>('striped')

  return (
    <>
      <Container bottom={SPACING_4}>
        <Select
          onChange={event => setVariant(event.target.value)}
          options={[
            { value: 'clear', text: 'Clear' },
            { value: 'bordered', text: 'Bordered' },
            { value: 'striped', text: 'Striped' },
          ]}
          value={variant}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Table variant={variant}>
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
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3}>Total</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Country</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

export default Example
```

### Inner spacing

```tsx
import React, { useState } from 'react'
import type { TableProps } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Table, Select, Container } from '@toptal/picasso'

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

const Example = () => {
  const [spacing, setSpacing] = useState<TableProps['spacing']>('narrow')

  return (
    <>
      <Container bottom={SPACING_4}>
        <Select
          onChange={event => setSpacing(event.target.value)}
          options={[
            { value: 'regular', text: 'Regular' },
            { value: 'narrow', text: 'Narrow' },
            { value: 'compact', text: 'Compact' },
          ]}
          value={spacing}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Table spacing={spacing}>
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
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3}>Total</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Country</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  )
}

export default Example
```

### Cell alignments

```tsx
import React from 'react'
import { Table } from '@toptal/picasso'

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

const Example = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell align='center'>Talent type</Table.Cell>
        <Table.Cell align='center'>Company</Table.Cell>
        <Table.Cell align='center'>Role</Table.Cell>
        <Table.Cell align='right'>Country</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell align='center'>{row.talentType}</Table.Cell>
          <Table.Cell align='center'>{row.company}</Table.Cell>
          <Table.Cell align='center'>{row.role}</Table.Cell>
          <Table.Cell align='right'>{row.country}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>Total</Table.Cell>
        <Table.Cell align='center'>Role</Table.Cell>
        <Table.Cell align='right'>Country</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default Example
```

### Selectable table

```tsx
import React, { useState } from 'react'
import { Table, Checkbox } from '@toptal/picasso'

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

const Example = () => {
  const [selected, setSelected] = useState<number[]>([])

  const handleClick = (_: React.ChangeEvent<{}>, id: number) => {
    let newSelected = []

    if (selected.includes(id)) {
      newSelected = selected.filter(item => item !== id)
    } else {
      newSelected = [...selected, id]
    }

    setSelected(newSelected)
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Talent type</Table.Cell>
          <Table.Cell>Company</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(({ id, name, talentType, company, role, country }) => {
          const isSelected = selected.includes(id)

          return (
            <Table.Row
              key={id}
              hover
              selected={isSelected}
              onClick={event => handleClick(event, id)}
            >
              <Table.Cell>
                <Checkbox checked={isSelected} />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{talentType}</Table.Cell>
              <Table.Cell>{company}</Table.Cell>
              <Table.Cell>{role}</Table.Cell>
              <Table.Cell>{country}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default Example
```

### Table with section header

```tsx
import React from 'react'
import { Calendar16, Table } from '@toptal/picasso'

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

const Example = () => (
  <div>
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
      <Table.SectionHead icon={<Calendar16 />}>Overdue</Table.SectionHead>
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
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
)

export default Example
```

### Table with multiple sections

```tsx
import React from 'react'
import { Table } from '@toptal/picasso'

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

const Example = () => (
  <div>
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
      <Table.SectionHead>January 2020</Table.SectionHead>
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
      <Table.SectionHead>February 2020</Table.SectionHead>
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
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
)

export default Example
```

### Expandable rows

```tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Table,
  Checkbox,
  Button,
  Tabs,
  UserBadge,
  Typography,
  Tag,
  Container,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'
import { Star16, ArrowDownMinor16, More16 } from '@toptal/picasso-icons'

type StyledArrowDownMinor16Props = {
  expanded: boolean
}
const StyledArrowDownMinor16 = styled(
  ArrowDownMinor16
)<StyledArrowDownMinor16Props>`
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`

const DynamicContent = () => {
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  })

  return (
    <Container className='max-w-[500px]'>
      {isLoaded ? (
        <Typography size='small'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          dolorem provident, aut aspernatur doloribus eos reiciendis molestiae
          ab quidem ad facilis animi dolorum quis laborum possimus temporibus
          debitis maiores ullam neque? Tempora rem eligendi ex consectetur
          impedit eos optio illum voluptates. Quis expedita, rerum reiciendis
          hic quae molestiae sit doloribus, beatae assumenda illo non iste
          itaque deleniti! Expedita ducimus, deleniti accusantium iusto adipisci
          nesciunt inventore! Laborum, repudiandae temporibus eligendi
          blanditiis laudantium suscipit. Tempore culpa, consequuntur placeat,
          inventore cumque vitae recusandae at consequatur praesentium
          asperiores sunt porro beatae, ipsa dicta laboriosam quae voluptatum.
          Magnam animi ea sint ex, ipsum explicabo. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Modi placeat dolorem provident, aut
          aspernatur doloribus eos reiciendis molestiae ab quidem ad facilis
          animi dolorum quis laborum possimus temporibus debitis maiores ullam
          neque? Tempora rem eligendi ex consectetur impedit eos optio illum
          voluptates. Quis expedita, rerum reiciendis hic quae molestiae sit
          doloribus, beatae assumenda illo non iste itaque deleniti! Expedita
          ducimus, deleniti accusantium iusto adipisci nesciunt inventore!
          Laborum, repudiandae temporibus eligendi blanditiis laudantium
          suscipit. Tempore culpa, consequuntur placeat, inventore cumque vitae
          recusandae at consequatur praesentium asperiores sunt porro beatae,
          ipsa dicta laboriosam quae voluptatum. Magnam animi ea sint ex, ipsum
          explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      ) : (
        <Typography size='small'>Loading dynamic content...</Typography>
      )}
    </Container>
  )
}

const ExpandableContent = () => (
  <Container padded={SPACING_4}>
    <Tabs value={1}>
      <Tabs.Tab label='Job' />
      <Tabs.Tab label='Company' />
      <Tabs.Tab label='Task Details' />
    </Tabs>

    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      top={SPACING_6}
      bottom={SPACING_6}
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Typography size='xsmall'>UI specialist</Typography>
      </UserBadge>

      <Container>
        <Button variant='secondary' size='small'>
          Q &amp; A
        </Button>
        <Button variant='secondary' size='small'>
          Timeline
        </Button>
        <Button size='small'>Contact Company</Button>
        <Button.Circular variant='flat' icon={<More16 />} />
      </Container>
    </Container>

    <Container top={SPACING_4}>
      <Tag>$2k Design Credit</Tag>
    </Container>
    <DynamicContent />
  </Container>
)

const TableExpandableRowsExample = () => {
  const [expandedData, setExpandedData] = useState<{
    [id: number]: boolean
  }>({})

  const handleExpandClick = (id: number) => {
    const expanded = expandedData[id]

    setExpandedData({
      ...expandedData,
      [id]: !expanded,
    })
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Tasks</Table.Cell>
          <Table.Cell>Related to</Table.Cell>
          <Table.Cell>Time</Table.Cell>
          <Table.Cell align='center'>Assignee</Table.Cell>
          <Table.Cell align='center'>Actions</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(({ id, task, relatedTo, time, assignee }) => (
          <Table.ExpandableRow
            key={id}
            content={<ExpandableContent />}
            expanded={expandedData[id]}
          >
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>{task}</Table.Cell>
            <Table.Cell>{relatedTo}</Table.Cell>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell align='center'>{assignee}</Table.Cell>
            <Table.Cell align='center'>
              <Button.Circular variant='flat' icon={<Star16 />} />
              <Button.Circular
                variant='flat'
                icon={<StyledArrowDownMinor16 expanded={expandedData[id]} />}
                data-testid={`expand-button-${id}`}
                onClick={() => handleExpandClick(id)}
              />
            </Table.Cell>
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  )
}

type Data = {
  id: number
  task: string
  relatedTo: string
  time: string
  assignee: string
  expanded: boolean
}
const data: Data[] = [
  {
    id: 0,
    task: "Invoice the client for half of Sanin's time...",
    relatedTo: 'Passionate PHP Dev...',
    time: '2:19 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 1,
    task: 'BUG: try to edit skills in profile',
    relatedTo: 'Ardelia Conn',
    time: '3:27 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 2,
    task: 'Assign attendee to scheduled meeting',
    relatedTo: 'Mariel Ankunding',
    time: '1:27 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 3,
    task: 'Conquer The World',
    relatedTo: 'Hye Schmeler',
    time: '7:46 PM',
    assignee: 'AD',
    expanded: false,
  },
]

export default TableExpandableRowsExample
```

### Expandable rows, expanded by default

```tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Table,
  Checkbox,
  Button,
  Tabs,
  UserBadge,
  Typography,
  Tag,
  Container,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'
import { Star16, ArrowDownMinor16, More16 } from '@toptal/picasso-icons'

type StyledArrowDownMinor16Props = {
  expanded: boolean
}
const StyledArrowDownMinor16 = styled(
  ArrowDownMinor16
)<StyledArrowDownMinor16Props>`
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`

const ExpandableContent = () => (
  <Container padded={SPACING_4}>
    <Tabs value={1}>
      <Tabs.Tab label='Job' />
      <Tabs.Tab label='Company' />
      <Tabs.Tab label='Task Details' />
    </Tabs>

    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      top={SPACING_6}
      bottom={SPACING_6}
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Typography size='xsmall'>UI specialist</Typography>
      </UserBadge>

      <Container>
        <Button variant='secondary' size='small'>
          Q &amp; A
        </Button>
        <Button variant='secondary' size='small'>
          Timeline
        </Button>
        <Button size='small'>Contact Company</Button>
        <Button.Circular variant='flat' icon={<More16 />} />
      </Container>
    </Container>

    <Container top={SPACING_4}>
      <Tag>$2k Design Credit</Tag>
    </Container>
  </Container>
)

const TableWithExpandableRows = () => {
  const [expandedData, setExpandedData] = useState(expandedDataIds)

  const handleExpandClick = (id: number) => {
    const expanded = expandedData[id]

    setExpandedData({
      ...expandedData,
      [id]: !expanded,
    })
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Tasks</Table.Cell>
          <Table.Cell>Related to</Table.Cell>
          <Table.Cell>Time</Table.Cell>
          <Table.Cell align='center'>Assignee</Table.Cell>
          <Table.Cell align='center'>Actions</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(({ id, task, relatedTo, time, assignee }) => (
          <Table.ExpandableRow
            key={id}
            defaultExpanded
            expanded={expandedData[id]}
            content={<ExpandableContent />}
          >
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>{task}</Table.Cell>
            <Table.Cell>{relatedTo}</Table.Cell>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell align='center'>{assignee}</Table.Cell>
            <Table.Cell align='center'>
              <Button.Circular variant='flat' icon={<Star16 />} />
              <Button.Circular
                variant='flat'
                icon={<StyledArrowDownMinor16 expanded={expandedData[id]} />}
                data-testid={`expand-button-${id}`}
                onClick={() => handleExpandClick(id)}
              />
            </Table.Cell>
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  )
}

const TableExpandableRowsExample = () => {
  const [isTableShown, toggleTable] = useState(false)

  return (
    <>
      <Button
        data-testid='expand-table'
        onClick={() => toggleTable(!isTableShown)}
      >
        Toggle Table
      </Button>
      {isTableShown && (
        <Container top={SPACING_6}>
          <TableWithExpandableRows />
        </Container>
      )}
    </>
  )
}

type Data = {
  id: number
  task: string
  relatedTo: string
  time: string
  assignee: string
}
const data: Data[] = [
  {
    id: 0,
    task: "Invoice the client for half of Sanin's time...",
    relatedTo: 'Passionate PHP Dev...',
    time: '2:19 PM',
    assignee: 'AD',
  },
  {
    id: 1,
    task: 'BUG: try to edit skills in profile',
    relatedTo: 'Ardelia Conn',
    time: '3:27 PM',
    assignee: 'AD',
  },
  {
    id: 2,
    task: 'Assign attendee to scheduled meeting',
    relatedTo: 'Mariel Ankunding',
    time: '1:27 PM',
    assignee: 'AD',
  },
  {
    id: 3,
    task: 'Conquer The World',
    relatedTo: 'Hye Schmeler',
    time: '7:46 PM',
    assignee: 'AD',
  },
]

const expandedDataIds = Object.fromEntries(data.map(item => [item.id, true]))

export default TableExpandableRowsExample
```

### Sortable table

Use TableSortableCell instead of TableCell in TableHead to sort columns

```tsx
/* eslint-disable id-length */
import React, { useMemo } from 'react'
import { Table, TableSortableCell } from '@toptal/picasso'

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
  },
]

const sortAlphabetically = (
  a: string,
  b: string,
  direction: 'asc' | 'desc'
) => {
  if (direction === 'asc') {
    return a.localeCompare(b)
  }

  return b.localeCompare(a)
}

const Example = () => {
  const [sortState, setSortState] = React.useState<{
    key: 'name' | 'talentType'
    direction: 'asc' | 'desc'
  }>({
    key: 'name',
    direction: 'asc',
  })

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      return sortAlphabetically(
        a[sortState.key],
        b[sortState.key],
        sortState.direction
      )
    })
  }, [sortState])

  const onSort = (key: 'name' | 'talentType') => {
    setSortState({
      key,
      direction:
        sortState.key === key && sortState.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <TableSortableCell
              onSortClick={() => onSort('name')}
              sortDirection={
                sortState.key === 'name' && sortState.direction === 'desc'
                  ? 'desc'
                  : 'asc'
              }
            >
              Name
            </TableSortableCell>
            <TableSortableCell
              onSortClick={() => onSort('talentType')}
              sortDirection={
                sortState.key === 'talentType' && sortState.direction === 'desc'
                  ? 'desc'
                  : 'asc'
              }
            >
              Talent type
            </TableSortableCell>
            <Table.Cell>Company</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.talentType}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Example
```

## Table.Cell

Cell for table content

### Alignments

```tsx
import React from 'react'
import { Table } from '@toptal/picasso'

const Example = () => (
  <div>
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Default</Table.Cell>
          <Table.Cell>Left</Table.Cell>
          <Table.Cell>Center</Table.Cell>
          <Table.Cell>Right</Table.Cell>
          <Table.Cell>Justify</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell align='left'>{row.talentType}</Table.Cell>
            <Table.Cell align='center'>{row.company}</Table.Cell>
            <Table.Cell align='right'>{row.role}</Table.Cell>
            <Table.Cell align='justify'>{row.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
)

let id = 0

const createData = (
  name: string,
  talentType: string,
  company: string,
  role: string,
  country: string
) => {
  id += 1

  return { id, name, talentType, company, role, country }
}

const data = [
  createData('Delia Floyd', 'Designer', 'Airbnb', 'UX lead', 'United States'),
  createData('Linnie Sims', 'Designer', 'Facebook', 'Art director', 'Spain'),
  createData(
    'Charles Watson',
    'Developer',
    'Amazon',
    'Ruby developer',
    'Germany'
  ),
  createData('Leila Pena', 'Developer', 'Invision', 'Web developer', 'Poland'),
  createData('Logan Burton', 'Developer', 'Microsoft', 'CTO', 'United States'),
]

export default Example
```
