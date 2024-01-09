import React, { useState } from 'react'
import { Modal, Button, Form, Tooltip, DatePicker } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const initialDate = new Date(2020, 10, 10)
const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [date, setDate] = useState(initialDate)

  return (
    <Modal
      onClose={onClose}
      open={open}
      transitionDuration={0} // Only for demo purposes, should not be used
    >
      <Modal.Title>
        You can select a date with other tooltips on the page
      </Modal.Title>
      <Modal.Content>
        <Form.Field>
          <DatePicker
            data-testid='datepicker'
            width='full'
            value={date}
            onChange={newDate => {
              setDate(newDate as Date)
            }}
          />
          <Tooltip open content='Inner Tooltip' placement='bottom'>
            <span>
              Lorem facere corrupti accusantium asperiores magnam Atque
              doloribus asperiores corrupti!
            </span>
          </Tooltip>
        </Form.Field>
      </Modal.Content>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Tooltip open content='tooltip'>
        <Button data-testid='trigger' onClick={showModal}>
          Open
        </Button>
      </Tooltip>

      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
