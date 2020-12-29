import React from 'react'
import {
  Dropdown,
  Form,
  Input,
  Container,
  Select,
  Button,
  Typography
} from '@toptal/picasso'

// Autofocus will force scrolling to the bottom of the portal, so we disable portal
const Example = () => (
  <div>
    <Dropdown content={<ComplexContent />} disableAutoClose disablePortal>
      Open Dropdown
      <Dropdown.Arrow />
    </Dropdown>
  </div>
)

const ComplexContent = () => {
  const { close } = Dropdown.useContext()

  return (
    <Container padded='medium'>
      <Container bottom='small'>
        <Typography variant='heading' size='medium'>
          Talent
        </Typography>
      </Container>
      <Form>
        <Form.Field>
          <Input autoFocus width='full' placeholder='Job title' />
        </Form.Field>
        <Form.Field>
          <Select placeholder='Select talent' options={OPTIONS} />
        </Form.Field>
      </Form>
      <Container flex top='small' justifyContent='flex-end'>
        <Button onClick={close}>Close</Button>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default Example
