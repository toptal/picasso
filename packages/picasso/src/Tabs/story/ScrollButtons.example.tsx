import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

const TAB_COUNT = 10

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: '13rem' }}>
      <Tabs value={value} onChange={handleChange}>
        {Array.from({ length: TAB_COUNT }).map((_, index) => (
          <Tabs.Tab key={index} label='Label' />
        ))}
      </Tabs>
      <Container top='small'>Content of tab #{value}</Container>
    </div>
  )
}

export default Example
