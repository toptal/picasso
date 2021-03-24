import React, { useState } from 'react'
import { Modal, Button, Typography } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

const ModalDialog = ({
  open,
  onClose,
  align = 'centered'
}: {
  open: boolean
  onClose: () => void
  align?: 'top' | 'centered'
}) => {
  const [isLoading] = useState(false)

  return (
    <Modal align={align} onClose={onClose} open={open}>
      <Modal.Title>Alignment is "{align}"</Modal.Title>
      <Modal.Content>
        <Typography variant='heading'>
          This Window is aligned as "{align}".
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const {
    showModal: showTopAlignedModal,
    hideModal: hideTopAlignedModal,
    isOpen: isTopAlignedModalOpen
  } = useModal()
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='align-top-open' onClick={showTopAlignedModal}>
        Open Top Aligned Modal
      </Button>

      <Button data-testid='align-centered-open' onClick={showModal}>
        Open Centered Aligned Modal
      </Button>

      <ModalDialog
        open={isTopAlignedModalOpen}
        onClose={hideTopAlignedModal}
        align='top'
      />
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
