import React, { useState } from 'react'
import {
  Container,
  Form,
  Input,
  Select,
  NumberInput,
  PasswordInput,
} from '@toptal/picasso'

type SelectValue = '1' | '2' | undefined

const Example = () => {
  const [selectValue, setSelectValue] = useState<SelectValue>()

  const handleSelectChange = (
    event: React.ChangeEvent<{ value: SelectValue }>
  ) => {
    console.log('Select value:', event.target.value)
    setSelectValue(event.target.value)
  }

  return (
    <Form>
      <Container flex justifyContent='space-between'>
        <Input width='auto' placeholder='Text input' />
        <Select
          onChange={handleSelectChange}
          value={selectValue}
          options={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' },
          ]}
          placeholder='Select (controlled)'
          width='auto'
        />
        <PasswordInput placeholder='Password input' />
        <NumberInput placeholder='Number input' />
      </Container>
    </Form>
  )
}

export default Example
