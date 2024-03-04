import React, { useState } from 'react'
import {
  Button,
  Container,
  Form,
  FormActionsContainer,
  Input,
  Select,
  Switch,
} from '@toptal/picasso'

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
]

const Example = () => {
  const [layoutIsHorizontal, setLayoutIsHorizontal] = useState(true)

  return (
    <Container>
      <Container>
        <Switch
          checked={layoutIsHorizontal}
          onChange={() => setLayoutIsHorizontal(!layoutIsHorizontal)}
          label='Vertical form layout'
        />
      </Container>
      <Container top='medium'>
        <Form layout={layoutIsHorizontal ? 'horizontal' : 'vertical'}>
          <Form.Field>
            <Form.Label>Select field</Form.Label>
            <Select placeholder='Choose option' options={OPTIONS} />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='city'>City</Form.Label>
            <Input id='city' width='full' placeholder='e.g., Barcelona' />
          </Form.Field>
          <FormActionsContainer top='medium'>
            <Button size='medium'>Submit</Button>
            <Button size='medium' variant='secondary'>
              Cancel
            </Button>
          </FormActionsContainer>
        </Form>
      </Container>
    </Container>
  )
}

export default Example
