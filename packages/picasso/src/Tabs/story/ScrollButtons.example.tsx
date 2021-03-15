import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: '13rem' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>

      {value === 0 && (
        <Container top='small'>Content for the first tab</Container>
      )}
      {value === 1 && (
        <Container top='small'>Content for the second tab</Container>
      )}
      {value === 2 && (
        <Container top='small'>Content for the third tab</Container>
      )}
      {value === 3 && (
        <Container top='small'>Content for the fourth tab</Container>
      )}
    </div>
  )
}

export default Example
