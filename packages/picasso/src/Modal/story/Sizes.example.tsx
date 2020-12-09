import React from 'react'
import {
  Modal,
  Button,
  Input,
  Select,
  Checkbox,
  Form,
  Container,
  ModalProps
} from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

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
  onClose,
  size
}: {
  open: boolean
  onClose: () => void
  size: ModalProps['size']
}) => (
  <Modal
    open={open}
    size={size}
    onClose={onClose}
    container={() => document.getElementById('modal-container-sizes')!} // Only for demo purposes
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
        <Checkbox label='Use shipping address for billing' />
      </Form.Field>
    </Modal.Content>
    <Modal.Actions>
      <Button data-testid='cancel' variant='secondary' onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onClose} variant='positive'>
        Update
      </Button>
    </Modal.Actions>
  </Modal>
)

const Example = () => {
  const {
    showModal: showModalSmall,
    hideModal: hideModalSmall,
    isOpen: isOpenSmall
  } = useModal()
  const {
    showModal: showModalMedium,
    hideModal: hideModalMedium,
    isOpen: isOpenMedium
  } = useModal()
  const {
    showModal: showModalLarge,
    hideModal: hideModalLarge,
    isOpen: isOpenLarge
  } = useModal()
  const {
    showModal: showModalFullscreen,
    hideModal: hideModalFullscreen,
    isOpen: isOpenFullscreen
  } = useModal()

  return (
    <div id='modal-container-sizes'>
      <Container flex>
        <Button onClick={showModalSmall} data-testid='trigger-small'>
          Open small
        </Button>
        <ModalDialog open={isOpenSmall} onClose={hideModalSmall} size='small' />

        <Button onClick={showModalMedium} data-testid='trigger-medium'>
          Open medium (default)
        </Button>
        <ModalDialog
          open={isOpenMedium}
          onClose={hideModalMedium}
          size='medium'
        />

        <Button onClick={showModalLarge} data-testid='trigger-large'>
          Open large
        </Button>
        <ModalDialog open={isOpenLarge} onClose={hideModalLarge} size='large' />

        <Button onClick={showModalFullscreen} data-testid='trigger-full-screen'>
          Open full-screen
        </Button>
        <ModalDialog
          open={isOpenFullscreen}
          onClose={hideModalFullscreen}
          size='full-screen'
        />
      </Container>
    </div>
  )
}

export default Example
