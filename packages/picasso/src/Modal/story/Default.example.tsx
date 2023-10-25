import React, { useState } from 'react'
import { Modal, Button, Form, DatePicker } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

// TODO: revert to the original file before the merge
const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [date, setDate] = useState<Date>()

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Edit address details</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <DatePicker
            width='full'
            value={date}
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDate(date as Date)
            }}
          />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Cancel
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
