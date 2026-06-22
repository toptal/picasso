import React, { useEffect } from 'react'
import type { ModalProps } from '@toptal/picasso'
import { Modal, Form, Input, Select, Checkbox, Button } from '@toptal/picasso'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'

const TestModalForm = (props: Partial<Omit<ModalProps, 'open'>>) => {
  const [isOpen, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Modal {...props} open={isOpen}>
      <Modal.Title>Edit address details</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <Input width='full' placeholder='City' value='Alabaster' />
        </Form.Field>
        <Form.Field>
          <Input width='full' placeholder='Street' value='John Fruit' />
        </Form.Field>
        <Form.Field>
          <Select
            placeholder='State'
            options={[
              {
                text: 'Alabama',
                value: 'Alabama',
              },
              {
                text: 'Utah',
                value: 'Utah',
              },
            ]}
            value='Alabama'
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Use shipping address for billing' />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary'>Cancel</Button>
        <Button data-testid='close' variant='positive'>
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const TestModalOverflown = (props: Partial<Omit<ModalProps, 'open'>>) => {
  const [isOpen, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Modal {...props} open={isOpen}>
      <Modal.Title>A lot of data</Modal.Title>
      <Modal.Content data-testid='overflown-content'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Modal.Content>
      <Modal.Actions>
        <Button data-testid='cancel' variant='secondary'>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const component = 'Modal'

// Wait for the modal's open fade (data-starting-style:opacity-0 → 1) to settle
// before taking the screenshot. Capturing mid-fade composites the bordered
// secondary (Cancel) button at partial opacity, producing edge artifacts on its
// border.
const waitForModalOpen = () =>
  cy
    .get('[role="dialog"]')
    .should('be.visible')
    .and('not.have.attr', 'data-starting-style')

// The scroll shades fade in over 300ms. When the content overflows, wait for
// the fade to settle so the screenshot captures the fully-opaque shade instead
// of a mid-fade frame. When it doesn't overflow (e.g. full-screen / xlarge on a
// tall viewport) there are no shades, so skip the wait — asserting otherwise
// would hang.
const waitForScrollShades = () => {
  // Settle the modal open fade first (same reason as waitForModalOpen), then
  // gate on the shade fade so the overflown screenshots are fully stable.
  waitForModalOpen()

  return cy
    .get('[data-testid="overflown-content"]')
    .should('be.visible')
    .then($el => {
      const el = $el.get(0)
      const overflows = el.scrollHeight > el.clientHeight

      // No overflow (e.g. full-screen / xlarge on a tall viewport) → no shades
      // to wait for. Otherwise wait for the fade to finish.
      return overflows
        ? cy.get('[data-active="true"]').should('have.css', 'opacity', '1')
        : cy.wrap(null)
    })
}

describe('Modal', () => {
  it('renders', () => {
    cy.mount(<TestModalForm />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  it('renders aligned to top', () => {
    cy.mount(<TestModalForm align='top' />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'align-top',
    })
  })

  it('renders without backdrop', () => {
    cy.mount(<TestModalForm hideBackdrop />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'without-backdrop',
    })
  })

  it('renders small', () => {
    cy.mount(<TestModalForm size='small' />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/small',
    })
  })

  it('renders large', () => {
    cy.mount(<TestModalForm size='large' />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/large',
    })
  })

  it('renders full-screen', () => {
    cy.mount(<TestModalForm size='full-screen' />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/full-screen',
    })
  })

  it('renders overflown', () => {
    cy.mount(<TestModalOverflown />)

    waitForScrollShades()

    cy.get('body').happoScreenshot({
      component,
      variant: 'overflown',
    })
  })

  Cypress._.each(HAPPO_TARGETS, happoTarget => {
    const { width } = happoTarget

    describe(`when screen has ${width}px width`, () => {
      Cypress._.each(
        ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full-screen'],
        modalSize => {
          it(`renders ${modalSize} size modal`, () => {
            cy.viewport(width, 1000)

            cy.mount(
              <TestModalOverflown size={modalSize as ModalProps['size']} />
            )

            waitForScrollShades()

            cy.get('body').happoScreenshot({
              component,
              variant: `modal-${modalSize}-size/${width}-default`,
              targets: [happoTarget],
            })
          })
        }
      )
    })
  })
})
