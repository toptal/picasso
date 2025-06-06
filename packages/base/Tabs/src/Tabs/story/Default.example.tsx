import React from 'react'
import { Container } from '@toptal/picasso'
import { Tabs, Tab } from '@toptal/picasso-tabs'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = React.useState<number>(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Label' />
        <Tab label='Label' />
        <Tab label='Label' />
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
