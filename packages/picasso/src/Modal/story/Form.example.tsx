import React from 'react'
import { Modal, Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useModal } from '@toptal/picasso/utils'
import arrayMutators from 'final-form-arrays'

const ModalDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => (
  <Modal
    open={open}
    size='medium'
    onClose={onClose}
    container={() => document.getElementById('modal-container-form')!} // Only for demo purposes
    transitionDuration={0} // Only for demo purposes, should not be used
  >
    <Modal.Title>Edit address details</Modal.Title>

    <Modal.Content>
      <Form.Subtitle>Put your address here</Form.Subtitle>
      <Form.Subtitle weight='regular'>
        Be careful with the data below
      </Form.Subtitle>

      <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
        <Container>
          <Form.Input
            min={220}
            required
            multiline
            rows={4}
            rowsMax={15}
            name='summary'
            label='Summary'
            width='full'
          />

          <Form.Input
            multiline
            rows={4}
            rowsMax={15}
            name='tasksAndDeliverables'
            label='Tasks and Deliverables'
            width='full'
            placeholder='e.g., The final deliverable will be a Sketch file of the work, including all assets and a clickable InVision prototype.'
          />

          <Form.Input
            multiline
            rows={4}
            rowsMax={15}
            name='requiredExperience'
            label='Required Experience'
            width='full'
            placeholder='e.g., 5+ years working in product design'
          />

          <Form.Input
            multiline
            rows={4}
            rowsMax={15}
            name='recommendedSkills'
            label='Recommended Skills'
            width='full'
            placeholder='e.g., 5+ years working in product design'
          />
        </Container>
      </Form>
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
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <div id='modal-container-form'>
      <Container flex>
        <Button onClick={showModal} data-testid='open-modal-with-form'>
          Open Modal with a Form
        </Button>
        <ModalDialog open={isOpen} onClose={hideModal} />
      </Container>
    </div>
  )
}

export default Example
