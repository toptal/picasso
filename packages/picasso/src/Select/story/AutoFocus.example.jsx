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
      <Container bottom={1}>
        <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
      </Container>
      {show && (
        <Select
          autoFocus
          placeholder='Choose an option...'
          width='auto'
          options={OPTIONS}
          value={value}
          onChange={handleChange}
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
