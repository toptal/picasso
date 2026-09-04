import type { ReactNode } from 'react'
import React, { useState } from 'react'
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { useModal } from '@toptal/picasso-utils'
import { Button } from '@toptal/picasso-button'

import type { Props as ModalProps } from './Modal'
import { ModalCompound as Modal } from '../ModalCompound'
import type { Props as ModalActionsProps } from '../ModalActions/ModalActions'
import type { Props as ModalTitleProps } from '../ModalTitle/ModalTitle'
import type { Props as ModalContentProps } from '../ModalContent/ModalContent'

const testIds = {
  closeButton: 'close-modal',
}

const getHtmlElement = (document: Document) => {
  return document.getElementsByTagName('html')[0]
}

const TestModal = ({ children, open }: OmitInternalProps<ModalProps>) => (
  <Modal open={open} container={modalRoot} onClose={() => {}} testIds={testIds}>
    {children}
  </Modal>
)

const TestModalTitle = ({ children }: OmitInternalProps<ModalTitleProps>) => (
  <Modal.Title>{children}</Modal.Title>
)

const TestModalContent = ({
  children,
}: OmitInternalProps<ModalContentProps>) => (
  <Modal.Content>{children}</Modal.Content>
)

const TestModalActions = ({
  children,
}: OmitInternalProps<ModalActionsProps>) => (
  <Modal.Actions>{children}</Modal.Actions>
)

let modalRoot: HTMLElement

// eslint-disable-next-line max-lines-per-function
describe('Modal', () => {
  beforeAll(() => {
    modalRoot = document.createElement('div')

    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  it('renders', () => {
    render(
      <TestModal open>
        <TestModalTitle>Title</TestModalTitle>
        <TestModalContent>Modal test content</TestModalContent>
        <TestModalActions>
          <Button variant='secondary'>Cancel</Button>
          <Button onClick={() => window.alert('clicked')} variant='positive'>
            Update
          </Button>
        </TestModalActions>
      </TestModal>,
      { container: modalRoot }
    )

    expect(modalRoot).toMatchSnapshot()
  })

  it('renders content when mounted already open', async () => {
    render(<Modal open>Mount-open modal content</Modal>)

    expect(
      await screen.findByText('Mount-open modal content')
    ).toBeInTheDocument()
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
    await waitFor(() => expect(queryByText('Hide')).toBeFalsy())

    expect(queryByText('Modal content')).toBeFalsy()
    expect(baseElement).toMatchSnapshot()
  })

  it('given multiple modals are opened, when navigate from page then all modals should be closed', () => {
    const PageWithModals = () => {
      const { showModal: showModal1, isOpen: isOpen1 } = useModal()
      const { showModal: showModal2, isOpen: isOpen2 } = useModal()

      return (
        <div>
          <Button onClick={showModal1}>Show 1</Button>
          <Button onClick={showModal2}>Show 2</Button>

          <Modal open={isOpen1}>
            <p>Modal content 1</p>
          </Modal>
          <Modal open={isOpen2}>
            <p>Modal content 2</p>
          </Modal>
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

  it('useModal shows multiple modals at the same time', () => {
    const TestComponent = () => {
      const { showModal: showModal1, isOpen: isOpen1 } = useModal()
      const { showModal: showModal2, isOpen: isOpen2 } = useModal()

      return (
        <>
          <Button onClick={showModal1}>Show first</Button>
          <Button onClick={showModal2}>Show second</Button>

          <Modal open={isOpen1}>
            <p>First modal content</p>
          </Modal>
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

  describe('backdrop', () => {
    const getBackdrops = (element: HTMLElement) =>
      element.querySelectorAll('[role="presentation"]')

    it('renders a backdrop for a nested modal by default', () => {
      const { baseElement } = render(
        <Modal open>
          <p>Outer modal content</p>
          <Modal open>
            <p>Nested modal content</p>
          </Modal>
        </Modal>
      )

      expect(getBackdrops(baseElement)).toHaveLength(2)
    })

    it('given forceRenderBackdrop is false, does not render a backdrop for a nested modal', () => {
      const { baseElement } = render(
        <Modal open>
          <p>Outer modal content</p>
          <Modal open forceRenderBackdrop={false}>
            <p>Nested modal content</p>
          </Modal>
        </Modal>
      )

      expect(getBackdrops(baseElement)).toHaveLength(1)
    })

    it('given hideBackdrop is true, does not render a backdrop', () => {
      const { baseElement } = render(
        <Modal open hideBackdrop>
          <p>Modal content</p>
        </Modal>
      )

      expect(getBackdrops(baseElement)).toHaveLength(0)
    })
  })

  describe('backdrop click', () => {
    const renderModal = (props?: Partial<ModalProps>) => {
      const onClose = jest.fn()
      const onBackdropClick = jest.fn()

      const { baseElement } = render(
        <Modal
          open
          onClose={onClose}
          onBackdropClick={onBackdropClick}
          {...props}
        >
          <Modal.Content>
            <input />
          </Modal.Content>
        </Modal>
      )

      return {
        onClose,
        onBackdropClick,
        // the popup is the transparent full-screen element over the backdrop
        popup: baseElement.querySelector('[role="dialog"]') as HTMLElement,
      }
    }

    // a pointer interaction fires mousedown → mouseup → click, and the browser
    // dispatches the click on the nearest common ancestor of the press and the
    // release target — the popup itself whenever the two differ
    const press = ({
      from,
      to,
      popup,
    }: {
      from: HTMLElement
      to: HTMLElement
      popup: HTMLElement
    }) => {
      fireEvent.mouseDown(from)
      fireEvent.mouseUp(to)
      fireEvent.click(from === to ? from : popup)
    }

    it('closes when pressing and releasing on the backdrop', () => {
      const { popup, onClose, onBackdropClick } = renderModal()

      press({ from: popup, to: popup, popup })

      expect(onBackdropClick).toHaveBeenCalled()
      expect(onClose).toHaveBeenCalled()
    })

    it('given the press started inside the content, does not close', () => {
      const { popup, onClose, onBackdropClick } = renderModal()

      // selecting text in a field and releasing outside the paper
      press({ from: screen.getByRole('textbox'), to: popup, popup })

      expect(onBackdropClick).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
    })

    it('given the press ended inside the content, does not close', () => {
      const { popup, onClose, onBackdropClick } = renderModal()

      // selecting from outside the paper into a field
      press({ from: popup, to: screen.getByRole('textbox'), popup })

      expect(onBackdropClick).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
    })

    it('given disableBackdropClick, does not close on a backdrop click', () => {
      const { popup, onClose } = renderModal({ disableBackdropClick: true })

      press({ from: popup, to: popup, popup })

      expect(onClose).not.toHaveBeenCalled()
    })

    it('forwards onMouseUp', () => {
      const onMouseUp = jest.fn()
      const { popup } = renderModal({ onMouseUp })

      fireEvent.mouseUp(popup)

      expect(onMouseUp).toHaveBeenCalled()
    })

    it('forwards onMouseDown', () => {
      const onMouseDown = jest.fn()
      const { popup } = renderModal({ onMouseDown })

      fireEvent.mouseDown(popup)

      expect(onMouseDown).toHaveBeenCalled()
    })
  })

  describe('focus return', () => {
    let outsideButton: HTMLButtonElement

    const renderModal = (children: ReactNode) => {
      render(
        <Modal open onClose={() => {}}>
          <TestModalContent>{children}</TestModalContent>
        </Modal>
      )

      return screen.findByTestId('field')
    }

    beforeEach(() => {
      outsideButton = document.createElement('button')
      document.body.appendChild(outsideButton)
    })

    afterEach(() => {
      cleanup()
      outsideButton.remove()
    })

    it('returns focus to the first focusable element when it leaves the modal', async () => {
      const field = await renderModal(<input data-testid='field' />)

      outsideButton.focus()

      expect(field).toHaveFocus()
    })

    it('skips hidden inputs', async () => {
      const field = await renderModal(
        <>
          <input type='hidden' name='hiddenField' />
          <input data-testid='field' />
        </>
      )

      outsideButton.focus()

      expect(field).toHaveFocus()
    })

    it('leaves focus inside an exempt popup', async () => {
      await renderModal(<input data-testid='field' />)
      render(
        <div data-picasso-popper=''>
          <Button>Popup action</Button>
        </div>
      )

      const popupButton = screen.getByRole('button', { name: 'Popup action' })

      popupButton.focus()

      expect(popupButton).toHaveFocus()
    })
  })

  describe('page scroll lock', () => {
    afterEach(() => {
      cleanup()
      getHtmlElement(document).style.overflow = ''
    })

    it('drops scroll lock when initially open modal is mounted', () => {
      render(<Modal open={true}>Hello from modal!</Modal>)

      expect(getHtmlElement(document).style.overflow).toBe('clip')
    })

    it('does not drop scroll lock when closed modal is mounted', () => {
      render(<Modal open={false}>Hello from modal!</Modal>)

      expect(getHtmlElement(document).style.overflow).toBe('')
    })

    describe('drops scroll lock as modal opens and lifts it as modal closes', () => {
      it('always mounted modal', () => {
        const TestComponent = () => {
          const modal = useModal()

          return (
            <>
              <Button data-testid='open-first' onClick={modal.showModal}>
                Open first
              </Button>

              <Modal
                open={modal.isOpen}
                onClose={modal.hideModal}
                testIds={{ closeButton: 'close-first' }}
              >
                <p>First modal content</p>
              </Modal>
            </>
          )
        }

        render(<TestComponent />)
        expect(getHtmlElement(document).style.overflow).toBe('')

        fireEvent.click(screen.getByTestId('open-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-first'))
        expect(getHtmlElement(document).style.overflow).toBe('')
      })

      it('conditionally mounted modal', () => {
        const TestComponent = () => {
          const modal = useModal()

          return (
            <>
              <Button data-testid='open-first' onClick={modal.showModal}>
                Open first
              </Button>
              {modal.isOpen && (
                <Modal
                  open
                  onClose={modal.hideModal}
                  testIds={{ closeButton: 'close-first' }}
                >
                  <p>First modal content</p>
                </Modal>
              )}
            </>
          )
        }

        render(<TestComponent />)
        expect(getHtmlElement(document).style.overflow).toBe('')

        fireEvent.click(screen.getByTestId('open-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-first'))
        expect(getHtmlElement(document).style.overflow).toBe('')
      })

      it('restores prev page overflow value', () => {
        const TestComponent = () => {
          const modal = useModal()

          return (
            <>
              <Button data-testid='open-first' onClick={modal.showModal}>
                Open first
              </Button>

              <Modal
                open={modal.isOpen}
                onClose={modal.hideModal}
                testIds={{ closeButton: 'close-first' }}
              >
                <p>First modal content</p>
              </Modal>
            </>
          )
        }

        getHtmlElement(document).style.overflow = 'visible'

        render(<TestComponent />)
        expect(getHtmlElement(document).style.overflow).toBe('visible')

        fireEvent.click(screen.getByTestId('open-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-first'))
        expect(getHtmlElement(document).style.overflow).toBe('visible')
      })
    })

    describe('multiple modals', () => {
      it('properly manages page scroll lock as modals open/close', () => {
        const TestComponent = () => {
          const modal1 = useModal()
          const modal2 = useModal()

          return (
            <>
              <Button data-testid='open-first' onClick={modal1.showModal}>
                Open first
              </Button>
              <Button data-testid='open-second' onClick={modal2.showModal}>
                Open second
              </Button>

              <Modal
                open={modal1.isOpen}
                onClose={modal1.hideModal}
                testIds={{ closeButton: 'close-first' }}
              >
                <p>First modal content</p>
              </Modal>
              <Modal
                open={modal2.isOpen}
                onClose={modal2.hideModal}
                testIds={{ closeButton: 'close-second' }}
              >
                <p>Second modal content</p>
              </Modal>
            </>
          )
        }

        render(<TestComponent />)
        expect(getHtmlElement(document).style.overflow).toBe('')

        fireEvent.click(screen.getByTestId('open-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('open-second'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-second'))
        expect(getHtmlElement(document).style.overflow).toBe('')
      })

      // NOTE: See https://toptal-core.atlassian.net/browse/FX-1069?focusedCommentId=96115 for more details
      it('properly restores page overflow when closed modal mounts/unmounts', () => {
        const TestComponent = () => {
          const modal1 = useModal()
          const [isModal2Mounted, setModal2Mounted] = useState(false)

          return (
            <>
              <Button data-testid='open-first' onClick={modal1.showModal}>
                Open first
              </Button>
              <Button
                data-testid={
                  isModal2Mounted ? 'unmount-second' : 'mount-second'
                }
                onClick={() => setModal2Mounted(isMounted => !isMounted)}
              >
                Toggle second
              </Button>

              <Modal
                open={modal1.isOpen}
                onClose={modal1.hideModal}
                testIds={{ closeButton: 'close-first' }}
              >
                <p>First modal content</p>
              </Modal>
              {isModal2Mounted && (
                <Modal open={false}>
                  <p>Second modal content</p>
                </Modal>
              )}
            </>
          )
        }

        render(<TestComponent />)
        expect(getHtmlElement(document).style.overflow).toBe('')

        fireEvent.click(screen.getByTestId('open-first'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('mount-second'))
        expect(getHtmlElement(document).style.overflow).toBe('clip')

        fireEvent.click(screen.getByTestId('close-first'))
        expect(getHtmlElement(document).style.overflow).toBe('')

        fireEvent.click(screen.getByTestId('unmount-second'))
        expect(getHtmlElement(document).style.overflow).toBe('')
      })
    })
  })
})
