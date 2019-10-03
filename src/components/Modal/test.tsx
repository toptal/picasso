import React, { Fragment } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'

import Picasso from '../Picasso'
import Button from '../Button'
import Modal, { Props as ModalProps } from './Modal'
import { useModal } from '../utils'
import { Props as ModalActionsProps } from '../ModalActions/ModalActions'
import { Props as ModalTitleProps } from '../ModalTitle/ModalTitle'
import { Props as ModalContentProps } from '../ModalContent/ModalContent'
import { OmitInternalProps } from '../Picasso/types'

let modalRoot: HTMLElement

beforeAll(() => {
  modalRoot = document.createElement('div')

  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
})

const TestModal = ({ children, open }: OmitInternalProps<ModalProps>) => {
  return (
    <Picasso loadFonts={false}>
      <Modal open={open} container={modalRoot}>
        {children}
      </Modal>
    </Picasso>
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

test('useModal opens and closes modal', () => {
  const TestComponent = () => {
    const [showModal, hideModal] = useModal(() => (
      <Modal open>
        <p>Modal content</p>
        <Button onClick={hideModal}>Hide</Button>
      </Modal>
    ))

    return <Button onClick={showModal}>Show</Button>
  }

  const { getByText, queryByText, baseElement } = render(
    <Picasso loadFonts={false}>
      <TestComponent />
    </Picasso>
  )

  const showModal = getByText('Show')

  fireEvent.click(showModal)

  expect(queryByText('Modal content')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()

  const hideModal = getByText('Hide')

  fireEvent.click(hideModal)

  expect(queryByText('Modal content')).toBeFalsy()
  expect(baseElement).toMatchSnapshot()
})

test('useModal shows multiple modals at the same time', () => {
  const TestComponent = () => {
    const [showFirstModal] = useModal(() => (
      <Modal open>
        <p>First modal content</p>
      </Modal>
    ))

    const [showSecondModal] = useModal(() => (
      <Modal open>
        <p>Second modal content</p>
      </Modal>
    ))

    return (
      <Fragment>
        <Button onClick={showFirstModal}>Show first</Button>
        <Button onClick={showSecondModal}>Show second</Button>
      </Fragment>
    )
  }

  const { getByText, queryByText, baseElement } = render(
    <Picasso loadFonts={false}>
      <TestComponent />
    </Picasso>
  )

  fireEvent.click(getByText('Show first'))
  fireEvent.click(getByText('Show second'))

  expect(queryByText('First modal content')).toBeTruthy()
  expect(queryByText('Second modal content')).toBeTruthy()

  expect(baseElement).toMatchSnapshot()
})
