import React, { useRef, useState } from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import {
  Button,
  Modal,
  Drawer,
  Container,
  List,
  DrawerProps,
  Typography,
} from '@toptal/picasso'
import { useModal, useNotifications } from '@toptal/picasso/utils'

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

describe('Drawer', () => {
  it('renders with narrow width and custom title', () => {
    mount(
      <TestingPicasso>
        <TestDrawer
          width='narrow'
          title={
            <Container flex alignItems='center' padded='small'>
              <Typography>This Drawer has a custom title</Typography>
              <Button size='small'>OK!</Button>
            </Container>
          }
        />
      </TestingPicasso>
    )

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot()
  })

  it('renders with regular width and title', () => {
    mount(
      <TestingPicasso>
        <TestDrawer width='regular' title='This is a regular Drawer' />
      </TestingPicasso>
    )

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot()
  })

  it('renders with medium width and notification', () => {
    mount(
      <TestingPicasso>
        <TestDrawerWithNotification width='medium' />
      </TestingPicasso>
    )

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot()
  })

  it('renders with wide width and without title', () => {
    mount(
      <TestingPicasso>
        <TestDrawer width='wide' />
      </TestingPicasso>
    )

    cy.getByTestId('trigger').click()
    cy.get('body').happoScreenshot()
  })

  it('renders with ultra-wide width behind Modal', () => {
    mount(
      <TestingPicasso>
        <TestDrawerBehindModal width='ultra-wide' />
      </TestingPicasso>
    )

    cy.getByTestId('open-drawer').click()
    cy.getByTestId('open-modal').click()

    cy.get('body').happoScreenshot()
  })
})
