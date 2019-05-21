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
  const [open, setOpen] = useState(true)
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
            <TextField placeholder='City' value='Alabaster' />
          </Form.Field>
          <Form.Field>
            <TextField placeholder='Street' value='John Fruit' />
          </Form.Field>
          <Form.Field>
            <Select placeholder='State' options={STATES} value='Alabama' />
          </Form.Field>
          <Form.Field>
            <Checkbox placeholder='Use shipping address for billing' />
          </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={isLoading} variant='flat'>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            onClick={showDemo}
            variant='primary-green'
          >
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalDefaultExample
