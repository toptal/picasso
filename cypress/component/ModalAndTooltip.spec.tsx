import React, { useState } from 'react'
import { Modal, Button, Form, Tooltip } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'
import { DatePicker } from '@toptal/picasso-lab'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

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

const ModalWithTooltipsExample = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <TestingPicasso>
      <div id='modal-container'>
        <Tooltip open content='tooltip'>
          <Button data-testid='trigger' onClick={showModal}>
            Open
          </Button>
        </Tooltip>

        <ModalDialog open={isOpen} onClose={hideModal} />
      </div>
    </TestingPicasso>
  )
}

describe('Modal and tooltip', () => {
  it('checks two tooltips on the page, one is inside modal', () => {
    mount(<ModalWithTooltipsExample />)

    // modal is loaded
    cy.get('#modal-container')

    cy.get('[data-testid="trigger"]').click()

    cy.get('[data-testid="datepicker"]').focus()

    cy.get('[data-testid="calendar"] button')
      .eq(10)
      .click()

    cy.get('[data-testid="datepicker"]').should('have.value', '11-03-2020')
  })
})
