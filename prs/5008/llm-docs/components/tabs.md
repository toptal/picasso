# Tabs

Tabs allow to switch between content sections

## Props

### Tabs.Tab

| Name | Type | Default | Description |
|------|------|---------|-------------|
| disabled | `boolean` | `false` | If true, the tab will be disabled |
| value | `string \| number` | - | You can provide your own value. Otherwise, we fallback to the child position index |
| label | `ReactNode` | - | The label element |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | The Icon element |
| avatar | `string \| null` | - | Image URL |
| description | `string` | - | Description |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>

      {value === 0 && (
        <Container top={SPACING_4}>Content of the first tab</Container>
      )}
      {value === 1 && (
        <Container top={SPACING_4}>Content of the second tab</Container>
      )}
      {value === 2 && (
        <Container top={SPACING_4}>Content of the third tab</Container>
      )}
    </div>
  )
}

export default Example
```

### Vertical

⚠️ Not responsive

```tsx
import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4, shadows, sizes, palette } from '@toptal/picasso-utils'

type TabPanelProps = {
  children: React.ReactNode
  value: number
  index: number
}
const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <Container role='tabpanel' hidden={value !== index}>
    {children}
  </Container>
)

// This component is not from BASE, just an example how it can be used
const TabsContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      style={{
        flex: '1 1 auto',
        backgroundColor: palette.grey.lightest,
        boxShadow: shadows[1],
        borderRadius: sizes.borderRadius.medium,
      }}
      padded={SPACING_4}
    >
      {children}
    </Container>
  )
}

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container
      style={{
        backgroundColor: palette.grey.lighter,
      }}
      padded={SPACING_4}
      flex
    >
      <Tabs onChange={handleChange} orientation='vertical' value={value}>
        <Tabs.Tab
          avatar='./jacqueline-with-flowers-1954-square.jpg'
          description='UI specialist'
          label='Jacqueline Roque'
        />
        <Tabs.Tab
          avatar='./jacqueline-with-flowers-1954-square.jpg'
          description='UI specialist'
          label='Jacqueline Roque'
        />
        <Tabs.Tab
          avatar=''
          description='UI specialist'
          label='Jacqueline Roque'
        />
        <Tabs.Tab avatar={null} description='UI specialist' label='John Doe' />
      </Tabs>
      <TabsContent>
        <TabPanel value={value} index={0}>
          Content of the first tab
        </TabPanel>
        <TabPanel value={value} index={1}>
          Content of the second tab
        </TabPanel>
        <TabPanel value={value} index={2}>
          Content of the third tab
        </TabPanel>
        <TabPanel value={value} index={3}>
          Content of the third tab
        </TabPanel>
      </TabsContent>
    </Container>
  )
}

export default Example
```

### Scroll buttons

```tsx
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const TAB_COUNT = 10

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: '13rem' }}>
      <Tabs value={value} onChange={handleChange}>
        {Array.from({ length: TAB_COUNT }).map((_, index) => (
          <Tabs.Tab key={index} label='Label' />
        ))}
      </Tabs>
      <Container top={SPACING_4}>Content of tab #{value}</Container>
    </div>
  )
}

export default Example
```

### Full Width

```tsx
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'

const TAB_COUNT = 2

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: '45rem', border: `1px solid ${palette.grey.light}` }}>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        {Array.from({ length: TAB_COUNT }).map((_, index) => (
          <Tabs.Tab key={index} label='Label' />
        ))}
      </Tabs>
      <Container padded={SPACING_4}>Content of tab #{value}</Container>
    </div>
  )
}

export default Example
```
