import React, { useState } from 'react'
import { Modal, Button, Typography } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [isLong, setLong] = useState(false)

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Edit address details</Modal.Title>
      <Modal.Content>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
        {isLong && (
          <>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={!isLong}
          onClick={() => {
            setLong(false)
          }}
          variant='positive'
        >
          Short Content
        </Button>
        <Button
          disabled={isLong}
          onClick={() => {
            setLong(true)
          }}
          variant='positive'
        >
          Long Content
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
