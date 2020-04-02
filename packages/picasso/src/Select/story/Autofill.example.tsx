import React, { useState, ChangeEvent } from 'react'
import { Select, Container, Form } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState()

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string | string[] | number
    }>
  ) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right='small'>
        <Form.Label>Autofill disabled</Form.Label>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          name='country'
        />
      </Container>
      <Container>
        <Form.Label>Autofill enabled</Form.Label>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          name='country'
          enableAutofill
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'Romania', value: 'RO' }
]

export default Example
