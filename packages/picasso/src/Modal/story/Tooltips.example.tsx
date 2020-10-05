import React, { useState } from 'react'
import { Modal, Button, Form, Tooltip } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'
import { DatePicker } from '@toptal/picasso-lab'

const ModalDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const initialDate = new Date(2020, 10, 10)
  const [datepickerValue, setDatepickerValue] = useState(initialDate)

  return (
    <Modal
      container={() => document.getElementById('modal-container')!}
      onBackdropClick={() => console.log('Clicked backdrop..')}
      onClose={onClose}
      onOpen={() => console.log('onOpen()')}
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
            value={datepickerValue}
            onChange={date => {
              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>
      </Modal.Content>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <div id='modal-container'>
      <Tooltip open content='tooltip'>
        <Button data-testid='trigger' onClick={showModal}>
          Open
        </Button>
      </Tooltip>

      <ModalDialog open={isOpen} onClose={hideModal} />
    </div>
  )
}

export default Example
