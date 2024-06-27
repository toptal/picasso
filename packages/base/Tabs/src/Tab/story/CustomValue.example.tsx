import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type Value = number | string | null

const Example = () => {
  const [value, setValue] = React.useState<Value>(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab value='jobs' label='Jobs' />
        <Tabs.Tab value='engagements' label='Engagements' />
        <Tabs.Tab value='interviews' label='Interviews' />
      </Tabs>

      <Container top={SPACING_4}>
        Current <i>value</i> is equal <code>{JSON.stringify(value)}</code>
      </Container>
    </div>
  )
}

export default Example
