import React, { useState } from 'react'
import { Modal, Button } from '@toptal/picasso'
import { useModals } from '@toptal/picasso/utils'

const ModalDialog = ({
  modalId,
  hideModal,
  align = 'centered'
}: {
  modalId: string
  hideModal: (modalId: string) => void
  align?: 'top' | 'centered'
}) => {
  const [isLoading] = useState(false)

  return (
    <Modal
      align={align}
      container={() => document.getElementById('modal-container')!}
      onClose={() => hideModal(modalId)}
      open
    >
      <Modal.Title>Alignment is "{align}"</Modal.Title>
      <Modal.Content>
        <h4>This Window is aligned as "{align}".</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={isLoading}
          variant='flat'
          onClick={() => hideModal(modalId)}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal } = useModals()

  const handleClickTopAligned = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} align='top' />
    ))
  }

  const handleClickCenteredAligned = () => {
    const modalId = showModal(() => (
      <ModalDialog modalId={modalId} hideModal={hideModal} />
    ))
  }

  return (
    <div id='modal-container'>
      <Button data-testid='align-top-open' onClick={handleClickTopAligned}>
        Open Top Aligned Modal
      </Button>

      <Button
        data-testid='align-centered-open'
        onClick={handleClickCenteredAligned}
      >
        Open Centered Aligned Modal
      </Button>
    </div>
  )
}

export default Example
