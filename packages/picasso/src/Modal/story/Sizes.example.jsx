import React from 'react'
import {
  Modal,
  Button,
  Input,
  Select,
  Checkbox,
  Form,
  Container
} from '@toptal/picasso'
import { useModals } from '@toptal/picasso-lab/utils'

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

const ModalDialog = ({ modalId, hideModal, size }) => (
  <Modal
    open
    size={size}
    onClose={() => hideModal(modalId)}
    container={() => document.getElementById('modal-container-sizes')} // Only for demo purposes
    transitionDuration={0} // Only for demo purposes, should not be used
  >
    <Modal.Title>Edit address details</Modal.Title>
    <Modal.Content>
      <Form.Field>
        <Input width='full' placeholder='City' value='Alabaster' />
      </Form.Field>
      <Form.Field>
        <Input width='full' placeholder='Street' value='John Fruit' />
      </Form.Field>
      <Form.Field>
        <Select placeholder='State' options={STATES} value='Alabama' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='Use shipping address for billing' />
      </Form.Field>
    </Modal.Content>
    <Modal.Actions>
      <Button
        data-testid='cancel'
        variant='flat'
        onClick={() => hideModal(modalId)}
      >
        Cancel
      </Button>
      <Button onClick={() => hideModal(modalId)} variant='primary-green'>
        Update
      </Button>
    </Modal.Actions>
  </Modal>
)

const ModalSizesExample = () => {
  const { showModal, hideModal } = useModals()

  const handleSmallClick = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} size='small' />
    ))
  }

  const handleMediumClick = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} />
    ))
  }

  const handleLargeClick = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} size='large' />
    ))
  }

  return (
    <div id='modal-container-sizes' style={{ width: '800px', height: '50px' }}>
      <Container flex>
        <Button onClick={handleSmallClick} data-testid='trigger-small'>
          Open small
        </Button>
        <Button onClick={handleMediumClick} data-testid='trigger-medium'>
          Open medium (default)
        </Button>
        <Button onClick={handleLargeClick} data-testid='trigger-large'>
          Open large
        </Button>
      </Container>
    </div>
  )
}

export default ModalSizesExample
