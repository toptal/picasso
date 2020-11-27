import React, { useState, ChangeEvent } from 'react'
import { Select, Typography, Container, Checkbox } from '@toptal/picasso'

const OPTIONS = new Array(40).fill(0).map((_zero, index) => {
  return {
    value: `${index + 1}`,
    text: Math.random()
      .toString(10)
      .substring(5)
  }
})

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>('1')
  const [useTimeout, setUseTimeout] = useState(false)

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    console.log('Select value:', event.target.value)
    if (event.target.value) {
      setValue(event.target.value)
    } else {
      if (useTimeout) {
        setValue('')
        setTimeout(() => {
          setValue(value)
        })
      }
    }
  }

  return (
    <Container>
      <Select
        onChange={handleChange}
        options={OPTIONS}
        value={value}
        placeholder='Choose an option...'
        width='auto'
        searchThreshold={4}
      />
      <Container>
        <Typography>ACTUAL VALUE {value}</Typography>
      </Container>
      <Checkbox
        label='Use timeout hack --- press this to hack the behavior and try again'
        checked={useTimeout}
        onChange={(event, checked) => setUseTimeout(checked)}
      >
        {' '}
      </Checkbox>
    </Container>
  )
}

export default SelectSearchBehaviourExample
