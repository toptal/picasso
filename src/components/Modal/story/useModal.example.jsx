import React, { useState } from 'react'
import { Modal, Button, Input, Checkbox, Select, Form } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

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
  const [isLoading, setLoading] = useState(false)
  const [modalId, setModalId] = useState(null)

  const showDemo = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      hideModal(modalId)
    }, 2000)
  }

  const { showModal, hideModal } = useModal()

  const handleOnClick = () => {
    const modalId = showModal(() => (
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
            <Input placeholder='City' value='Alabaster' />
          </Form.Field>
          <Form.Field>
            <Input placeholder='Street' value='John Fruit' />
          </Form.Field>
          <Form.Field>
            <Select placeholder='State' options={STATES} value='Alabama' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Use shipping address for billing' />
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
    ))

    setModalId(modalId)
  }

  return (
    <div id='modal-container' style={{ width: '800px', height: '500px' }}>
      <Button onClick={handleOnClick}>Open</Button>
    </div>
  )
}

export default ModalDefaultExample
