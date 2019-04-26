import React, { useState } from 'react'
import {
  Modal,
  Button,
  TextField,
  Checkbox,
  Select,
  Form
} from '@toptal/picasso'

const STATES = [
  {
    text: 'Alabama',
    value: 'Alabama'
  },
  {
    text: 'Utah',
    value: 'Utah'
  }
]

const ModalDefaultExample = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const showDemo = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <div id='modal-container' style={{ width: '800px', height: '500px' }}>
      <Button onClick={() => setOpen(!open)}>Open</Button>

      <Modal
        container={() => document.getElementById('modal-container')}
        onBackdropClick={() => console.log('Clicked backdrop..')}
        onClose={() => setOpen(false)}
        onOpen={() => console.log('onOpen()')}
        open={open}
        transitionDuration={0} // Only for demo purposes, should not be used
      >
        <Modal.Title>Edit address details</Modal.Title>
        <Modal.Content>
          <Form.Field>
            <TextField label='City' value='Alabaster' />
          </Form.Field>
          <Form.Field>
            <TextField label='Street' value='John Fruit' />
          </Form.Field>
          <Form.Field>
            <Select label='State' options={STATES} value='Alabama' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Use shipping address for billing' />
          </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={isLoading} variant='basic'>
            Cancel
          </Button>
          <Button loading={isLoading} onClick={showDemo} variant='primary'>
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalDefaultExample
