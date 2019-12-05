import React, { useState } from 'react'
import { Select, Button, Container } from '@toptal/picasso'

const SelectCustomOptionExample = () => {
  const [value, setValue] = useState()
  const [show, setShow] = useState(false)

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <Container>
      <Container bottom={2}>
        <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
      </Container>
      {show && (
        <Select
          onChange={handleChange}
          options={OPTIONS}
          autoFocus
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      )}
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectCustomOptionExample
