import React, { useState } from 'react'
import { Modal, Button, Input, Checkbox, Select, Form } from '@toptal/picasso'
import { useModals } from '@toptal/picasso/lab/utils'

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

const ModalDialog = ({ modalId, hideModal }) => {
  const [isLoading, setLoading] = useState(false)

  return (
    <Modal
      container={() => document.getElementById('modal-container')}
      onBackdropClick={() => console.log('Clicked backdrop..')}
      onClose={() => hideModal(modalId)}
      onOpen={() => console.log('onOpen()')}
      open
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
          disabled={isLoading}
          variant='flat'
          onClick={() => hideModal(modalId)}
        >
          Cancel
        </Button>
        <Button
          data-testid='close'
          loading={isLoading}
          onClick={() => {
            setLoading(true)

            setTimeout(() => {
              setLoading(false)
              hideModal(modalId)
            }, 1000)
          }}
          variant='primary-green'
        >
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const ModalDefaultExample = () => {
  const { showModal, hideModal } = useModals()

  const handleClick = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} />
    ))
  }

  return (
    <div id='modal-container' style={{ width: '800px', height: '50px' }}>
      <Button data-testid='open' onClick={handleClick}>
        Open
      </Button>
    </div>
  )
}

export default ModalDefaultExample
