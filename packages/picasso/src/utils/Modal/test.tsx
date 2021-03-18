import React from 'react'
import {
  render,
  fireEvent,
  waitForElementToBeRemoved
} from '@toptal/picasso/test-utils'

import Button from '../../Button'
import Modal from '../../Modal'
import { useModal } from './use-modal'

let modalRoot: HTMLElement

describe('Modal', () => {
  beforeAll(() => {
    modalRoot = document.createElement('div')

    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  it('useModal opens and closes modal', async () => {
    const TestComponent = () => {
      const { showModal, hideModal, isOpen } = useModal()

      return (
        <>
          <Button onClick={showModal}>Show</Button>

          <Modal open={isOpen}>
            <p>Modal content</p>
            <Button onClick={hideModal}>Hide</Button>
          </Modal>
        </>
      )
    }

    const { getByText, queryByText, baseElement } = render(<TestComponent />)

    const showModalButton = getByText('Show')

    fireEvent.click(showModalButton)

    expect(queryByText('Modal content')).toBeTruthy()
    expect(baseElement).toMatchSnapshot()

    const hideModalButton = getByText('Hide')

    fireEvent.click(hideModalButton)
    await waitForElementToBeRemoved(() => getByText('Hide'))

    expect(queryByText('Modal content')).toBeFalsy()
    expect(baseElement).toMatchSnapshot()
  })

  it('useModal shows multiple modals at the same time', () => {
    const TestComponent = () => {
      const { showModal: showModal1, isOpen: isOpen1 } = useModal()
      const { showModal: showModal2, isOpen: isOpen2 } = useModal()

      return (
        <>
          <Button onClick={showModal1}>Show first</Button>
          <Modal open={isOpen1}>
            <p>First modal content</p>
          </Modal>

          <Button onClick={showModal2}>Show second</Button>
          <Modal open={isOpen2}>
            <p>Second modal content</p>
          </Modal>
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
})
