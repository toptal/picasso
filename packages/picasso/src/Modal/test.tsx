import React, { useState } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Button from '../Button'
import Modal, { Props as ModalProps } from './Modal'
import { useModals } from '../utils'
import { Props as ModalActionsProps } from '../ModalActions/ModalActions'
import { Props as ModalTitleProps } from '../ModalTitle/ModalTitle'
import { Props as ModalContentProps } from '../ModalContent/ModalContent'

let modalRoot: HTMLElement

beforeAll(() => {
  modalRoot = document.createElement('div')

  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
})

const TestModal = ({ children, open }: OmitInternalProps<ModalProps>) => {
  return (
    <Modal open={open} container={modalRoot}>
      {children}
    </Modal>
  )
}

const TestModalTitle = ({ children }: OmitInternalProps<ModalTitleProps>) => (
  <Modal.Title>{children}</Modal.Title>
)

const TestModalContent = ({
  children
}: OmitInternalProps<ModalContentProps>) => (
  <Modal.Content>{children}</Modal.Content>
)

const TestModalActions = ({
  children
}: OmitInternalProps<ModalActionsProps>) => (
  <Modal.Actions>{children}</Modal.Actions>
)

test('renders Modal', () => {
  render(
    <TestModal open>
      <TestModalTitle>Title</TestModalTitle>
      <TestModalContent>Modal test content</TestModalContent>
      <TestModalActions>
        <Button variant='flat'>Cancel</Button>
        <Button onClick={() => window.alert('clicked')} variant='primary-green'>
          Update
        </Button>
      </TestModalActions>
    </TestModal>,
    { container: modalRoot }
  )

  expect(modalRoot).toMatchSnapshot()
})

test('useModals opens and closes modal', () => {
  const TestComponent = () => {
    const { showModal, hideModal } = useModals()

    const handleShowClick = () => {
      const modalId = showModal(() => (
        <Modal open>
          <p>Modal content</p>
          <Button onClick={() => hideModal(modalId)}>Hide</Button>
        </Modal>
      ))
    }

    return <Button onClick={handleShowClick}>Show</Button>
  }

  const { getByText, queryByText, baseElement } = render(<TestComponent />)

  const showModal = getByText('Show')

  fireEvent.click(showModal)

  expect(queryByText('Modal content')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()

  const hideModal = getByText('Hide')

  fireEvent.click(hideModal)

  expect(queryByText('Modal content')).toBeFalsy()
  expect(baseElement).toMatchSnapshot()
})

test('given multiple modals are opened, when navigate from page then all modals should be closed', () => {
  const PageWithModals = () => {
    const { showModal } = useModals()

    const handleShowClick = (number: number) => {
      showModal(() => (
        <Modal open>
          <p>Modal content {number}</p>
        </Modal>
      ))
    }

    return (
      <div>
        <Button onClick={() => handleShowClick(1)}>Show 1</Button>
        <Button onClick={() => handleShowClick(2)}>Show 2</Button>
      </div>
    )
  }

  const SimplePage = () => {
    return <div>Simple Page</div>
  }

  const TestComponent = () => {
    const [showPageWithModals, setShowPageWithModals] = useState(true)

    return (
      <div>
        {showPageWithModals ? <PageWithModals /> : <SimplePage />}
        <Button onClick={() => setShowPageWithModals(false)}>
          Switch pages
        </Button>
      </div>
    )
  }

  const { getByText, queryByText } = render(<TestComponent />)

  const showModal1 = getByText('Show 1')
  const showModal2 = getByText('Show 2')

  // Open modals
  fireEvent.click(showModal1)
  fireEvent.click(showModal2)

  // Check modals opened
  expect(queryByText('Modal content 1')).toBeInTheDocument()
  expect(queryByText('Modal content 2')).toBeInTheDocument()

  // Switch to other page
  const switchPages = getByText('Switch pages')

  fireEvent.click(switchPages)

  // Check all modals were auto-closed
  expect(queryByText('Modal content 1')).not.toBeInTheDocument()
  expect(queryByText('Modal content 2')).not.toBeInTheDocument()
})

test('useModals shows multiple modals at the same time', () => {
  const TestComponent = () => {
    const { showModal } = useModals()

    const showFirstModalClick = () => {
      showModal(() => (
        <Modal open>
          <p>First modal content</p>
        </Modal>
      ))
    }

    const showSecondModalClick = () => {
      showModal(() => (
        <Modal open>
          <p>Second modal content</p>
        </Modal>
      ))
    }

    return (
      <>
        <Button onClick={showFirstModalClick}>Show first</Button>
        <Button onClick={showSecondModalClick}>Show second</Button>
      </>
    )
  }

  const { getByText, queryByText, baseElement } = render(<TestComponent />)

  fireEvent.click(getByText('Show first'))
  fireEvent.click(getByText('Show second'))

  expect(queryByText('First modal content')).toBeTruthy()
  expect(queryByText('Second modal content')).toBeTruthy()

  expect(baseElement).toMatchSnapshot()
})
