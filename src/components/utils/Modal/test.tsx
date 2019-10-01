import React, { Fragment } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'

import Picasso from '../../Picasso'
import Button from '../../Button'
import Modal from '../../Modal/Modal'
import { useModals } from './use-modals'

let modalRoot: HTMLElement

beforeAll(() => {
  modalRoot = document.createElement('div')

  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
})

test('useModal opens and closes modal', () => {
  const TestComponent = () => {
    const { showModal, hideModal } = useModals()

    return (
      <Button
        onClick={() => {
          const modalId = showModal(() => (
            <Modal open>
              <p>Modal content</p>
              <Button onClick={() => hideModal(modalId)}>Hide</Button>
            </Modal>
          ))
        }}
      >
        Show
      </Button>
    )
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
    const { showModal } = useModals()

    const FirstModal = () => (
      <Modal open>
        <p>First modal content</p>
      </Modal>
    )
    const SecondModal = () => (
      <Modal open>
        <p>Second modal content</p>
      </Modal>
    )

    return (
      <Fragment>
        <Button onClick={() => showModal(FirstModal)}>Show first</Button>
        <Button onClick={() => showModal(SecondModal)}>Show second</Button>
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
