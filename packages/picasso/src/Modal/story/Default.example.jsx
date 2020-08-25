import React, { useState } from 'react'
import { Modal, Button, Input, Checkbox, Select, Form } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'
import { DatePicker } from '@toptal/picasso-lab'

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

const ModalDialog = ({ open, onClose }) => {
  const [isLoading, setLoading] = useState(false)
  const [datepickerValue, setDatepickerValue] = useState()

  return (
    <Modal
      container={() => document.getElementById('modal-container')}
      onBackdropClick={() => console.log('Clicked backdrop..')}
      onClose={onClose}
      onOpen={() => console.log('onOpen()')}
      open={open}
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
          <DatePicker
            width='full'
            value={datepickerValue}
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDatepickerValue(date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Use shipping address for billing' />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} variant='flat' onClick={onClose}>
          Cancel
        </Button>
        <Button
          data-testid='close'
          loading={isLoading}
          onClick={() => {
            setLoading(true)

            setTimeout(() => {
              setLoading(false)
              onClose()
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

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <div id='modal-container'>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </div>
  )
}

export default Example
