import React, { useRef, useState } from 'react'
import type { DrawerProps } from '@toptal/picasso'
import {
  Button,
  Modal,
  Drawer,
  Container,
  List,
  Typography,
} from '@toptal/picasso'
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'

const DrawerExample = (
  props: Partial<DrawerProps> & { open: boolean; onOpen: () => void }
) => {
  const { onOpen } = props

  return (
    <div style={{ height: '660px' }}>
      <Button data-testid='trigger' onClick={onOpen}>
        Show drawer
      </Button>
      <Drawer {...props}>
        <Container padded='medium'>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

const TestDrawer = (props: Partial<DrawerProps>) => {
  const [open, setOpen] = useState(false)

  return <DrawerExample {...props} open={open} onOpen={() => setOpen(!open)} />
}

const TestDrawerWithNotification = (props: Partial<DrawerProps>) => {
  const { showSuccess } = useNotifications()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(!open)
    showSuccess("That's one small step for a man, one giant leap for mankind.")
  }

  return <DrawerExample {...props} open={open} onOpen={showDrawer} />
}

const TestDrawerBehindModal = (props: Partial<DrawerProps>) => {
  const [isDrawerOpen, setOpen] = useState(false)
  const { isOpen, showModal, hideModal } = useModal()
  const modalContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ height: '660px' }}>
      <div ref={modalContainerRef} />
      <Modal
        open={isOpen}
        onClose={hideModal}
        container={modalContainerRef.current ?? undefined}
      >
        <Modal.Title>Modal Title</Modal.Title>
        <Modal.Content>Modal Content</Modal.Content>
      </Modal>
      <Button data-testid='open-drawer' onClick={() => setOpen(!isDrawerOpen)}>
        Show drawer
      </Button>
      <Drawer
        {...props}
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

const component = 'Drawer'

describe('Drawer', () => {
  beforeEach(() => {
    cy.viewport(1280, 660)
  })
  it('renders with narrow width and custom title', () => {
    cy.mount(
      <TestDrawer
        width='narrow'
        title={
          <Container flex alignItems='center' padded='small'>
            <Typography>This Drawer has a custom title</Typography>
            <Button size='small'>OK!</Button>
          </Container>
        }
      />
    )

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'narrow-width/with-custom-title',
    })
  })

  it('renders with regular width and title', () => {
    cy.mount(<TestDrawer width='regular' title='This is a regular Drawer' />)

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'regular-width/with-title',
    })
  })

  it('renders with medium width and notification', () => {
    cy.mount(<TestDrawerWithNotification width='medium' />)

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'medium-width/with-notification',
    })
  })

  it('renders with wide width and without title', () => {
    cy.mount(<TestDrawer width='wide' />)

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'wide-width/without-title',
    })
  })

  it('renders with ultra-wide width behind Modal', () => {
    cy.mount(<TestDrawerBehindModal width='ultra-wide' />)

    cy.getByTestId('open-drawer').click()
    cy.getByTestId('open-modal').click()

    cy.get('body').happoScreenshot({
      component,
      variant: 'ultra-wide/behind-modal',
    })
  })

  const testedDrawerVariants: DrawerProps['width'][] = [
    'narrow',
    'regular',
    'ultra-wide',
  ]

  Cypress._.each(HAPPO_TARGETS, happoTarget => {
    const { width } = happoTarget

    describe(`when screen has ${width}px width`, () => {
      Cypress._.each(testedDrawerVariants, variant => {
        it(`renders ${variant} drawer`, () => {
          cy.viewport(width, 660)
          cy.mount(
            <TestDrawer title={`${variant} drawer title`}>
              <Container>
                <Typography>${variant} drawer content</Typography>
              </Container>
            </TestDrawer>
          )

          cy.getByTestId('trigger').click()
          cy.getByRole('presentation').should('be.visible')
          cy.get('body').happoScreenshot({
            component,
            variant: `drawer-${variant}-width/${width}-default`,
            targets: [happoTarget],
          })
        })
      })
    })
  })
})
