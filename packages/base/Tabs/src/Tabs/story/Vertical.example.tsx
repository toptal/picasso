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
