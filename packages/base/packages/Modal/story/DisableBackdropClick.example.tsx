import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button onClick={showModal}>Open</Button>

      <Modal onClose={hideModal} open={isOpen} disableBackdropClick>
        <Modal.Title>Disable backdrop click</Modal.Title>
        <Modal.Content>
          Clicking backdrop won't cause Modal to close.
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Example
