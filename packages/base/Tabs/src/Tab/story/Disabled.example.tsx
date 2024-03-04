import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' disabled />
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
