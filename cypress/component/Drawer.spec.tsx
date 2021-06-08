import React, { useState } from 'react'
import Drawer from '@toptal/picasso-lab/Drawer'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { Button, Modal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso/utils'

const TestDrawer = () => {
  const [isDrawerOpen, setOpen] = useState(false)
  const { isOpen, showModal, hideModal } = useModal()

  return (
    <div style={{ height: '660px' }}>
      <div id='modal-container' />
      <Modal
        open={isOpen}
        onClose={hideModal}
        container={document.getElementById('modal-container')!}
      >
        <Modal.Title>Modal Title</Modal.Title>
        <Modal.Content>Modal Content</Modal.Content>
      </Modal>
      <Button data-testid='open-drawer' onClick={() => setOpen(!isDrawerOpen)}>
        Show drawer
      </Button>
      <Drawer
        title='My Operational Issues'
        open={isDrawerOpen}
        onClose={() => setOpen(false)}
        data-testid='drawer'
      >
        <Button data-testid='open-modal' onClick={() => showModal()}>
          Modal
        </Button>
      </Drawer>
    </div>
  )
}

describe('Drawer', () => {
  it('renders Drawer behind Modal', () => {
    mount(
      <TestingPicasso>
        <TestDrawer />
      </TestingPicasso>
    )

    cy.get('[data-testid=open-drawer]').click()
    cy.get('[data-testid=drawer]').should('be.visible')
    cy.get('[data-testid=open-modal]').click()

    cy.get('body').happoScreenshot()
  })
})
