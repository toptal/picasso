import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

type Value = number | string | boolean

const Example = () => {
  const [value, setValue] = React.useState<Value>(false)

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

      <Container top='small'>
        Current <i>value</i> is equal <code>{JSON.stringify(value)}</code>
      </Container>
    </div>
  )
}

export default Example
