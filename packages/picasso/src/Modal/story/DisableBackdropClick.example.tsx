import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return <>
    <Button onClick={showModal}>Open</Button>

    <Modal// `disableBackdropClick` is removed by codemod.
// You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal)
 onClose={hideModal} open={isOpen}>
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
  </>;
}

export default Example
