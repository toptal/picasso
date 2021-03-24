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

const ModalDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const [isLoading, setLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  return (
    <Modal onClose={onClose} open={open}>
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
            value={date}
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDate(date as Date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Use shipping address for billing' />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} variant='secondary' onClick={onClose}>
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
          variant='positive'
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
    <>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
