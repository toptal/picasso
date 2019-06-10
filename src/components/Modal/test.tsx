import React from 'react'
import { render } from 'react-testing-library'
import 'react-testing-library/cleanup-after-each'

import Picasso from '../Picasso'
import Button from '../Button'
import Modal, { Props as ModalProps } from './Modal'
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
