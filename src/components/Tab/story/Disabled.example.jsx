import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

const DisabledTabExample = () => {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
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
        <Container top='small'>Content for the first tab</Container>
      )}
      {value === 1 && (
        <Container top='small'>Content for the second tab</Container>
      )}
      {value === 2 && (
        <Container top='small'>Content for the third tab</Container>
      )}
    </div>
  )
}

export default DisabledTabExample
