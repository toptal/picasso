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
    <Modal {...props} open={isOpen} onClose={() => {}}>
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
    <Modal {...props} open={isOpen} onClose={() => {}}>
      <Modal.Title>A lot of data</Modal.Title>
      <Modal.Content>
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

describe('Modal', () => {
  it('renders', () => {
    cy.mount(<TestModalForm />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  it('renders aligned to top', () => {
    cy.mount(<TestModalForm align='top' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'align-top',
    })
  })

  it('renders without backdrop', () => {
    cy.mount(<TestModalForm hideBackdrop />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'without-backdrop',
    })
  })

  it('renders small', () => {
    cy.mount(<TestModalForm size='small' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/small',
    })
  })

  it('renders large', () => {
    cy.mount(<TestModalForm size='large' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/large',
    })
  })

  it('renders full-screen', () => {
    cy.mount(<TestModalForm size='full-screen' />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'size/full-screen',
    })
  })

  it('renders overflown', () => {
    cy.mount(<TestModalOverflown />)

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
