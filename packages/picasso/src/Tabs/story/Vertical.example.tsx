import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container flex>
      <Tabs value={value} orientation='vertical' onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>

      {value === 0 && (
        <Container left='small'>Content of the first tab</Container>
      )}
      {value === 1 && (
        <Container left='small'>Content of the second tab</Container>
      )}
      {value === 2 && (
        <Container left='small'>Content of the third tab</Container>
      )}
    </Container>
  )
}

export default Example
