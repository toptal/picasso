import React from 'react'
import {
  Modal,
  Button,
  TextField,
  Container,
  Checkbox,
  Select
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
  const [open, setOpen] = React.useState(true)
  const [isLoading, setLoading] = React.useState(false)
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
          <Container bottom={1}>
            <TextField label='City' value='Alabaster' />
          </Container>
          <Container bottom={1}>
            <TextField label='Street' value='John Fruit' />
          </Container>
          <Container bottom={1}>
            <Select label='State' options={STATES} value='Alabama' />
          </Container>
          <Container>
            <Checkbox label='Use shipping address for billing' />
          </Container>
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
