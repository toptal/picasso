import type { ReactNode, HTMLAttributes } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import React, {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import cx from 'classnames'
import type {
  BaseProps,
  SizeType,
  TransitionProps,
} from '@toptal/picasso-shared'
import { usePicassoRoot, RootContext } from '@toptal/picasso-provider'
import { CloseMinor16 } from '@toptal/picasso-icons'
import {
  useCombinedRefs,
  ModalManager,
  usePageScrollLock,
} from '@toptal/picasso-utils'
import { ButtonCircular } from '@toptal/picasso-button'
import { Fade } from '@toptal/picasso-fade'
import { Backdrop } from '@toptal/picasso-backdrop'
import ModalContext from '@toptal/picasso-modal-context'

import { ModalPaper } from '../ModalPaper'

type ContainerValue = HTMLElement | (() => HTMLElement)
type Alignment = 'top' | 'centered'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal component */
  children: ReactNode
  /** Whether modal should be displayed */
  open: boolean
  /** Width of modal */
  size?:
    | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
    | 'full-screen'
  /** Callback executed when backdrop was clicked */
  onBackdropClick?: () => void
  /** If `true`, clicking the backdrop will not fire `onClose` or `onBackdropClick` */
  disableBackdropClick?: boolean
  /** Callback executed when attempting to close modal */
  onClose?: () => void
  /** Callback executed when modal is being opened */
  onOpen?: () => void
  /** A node, or a function that returns node. The container will have the portal children appended to it. */
  container?: ContainerValue
  /** If `true`, the backdrop is not rendered */
  hideBackdrop?: boolean
  /** Position of the modal relative to the browser's viewport */
  align?: Alignment
  /** Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) */
  transitionProps?: TransitionProps
  transitionDuration?: number
  /** used for specifying aria attributes, changing role, or customizing styles */
  paperProps?: React.HTMLAttributes<HTMLDivElement>
  testIds?: {
    closeButton?: string
  }
}

const defaultManager = new ModalManager()

const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
const tooltipContainerString = '[role=tooltip]'

const focusFirstFocusableElement = (node: Element) => {
  const elements = node.querySelectorAll(focusableElementsString)
  const focusableElements = Array.prototype.slice.call(elements)

  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  }
}

const isFocusInsideModal = (modalNode: Element) => {
  return modalNode.contains(document.activeElement)
}

const isFocusInsideTooltip = () => {
  const tooltipContainers = document.querySelectorAll(tooltipContainerString)

  if (tooltipContainers.length === 0) {
    return false
  }

  return Array.from(tooltipContainers).some(container =>
    container.contains(document.activeElement)
  )
}

const isFocusInPopoverOrPortal = () => {
  const popoverElements = document.querySelectorAll(
    '[role="dialog"], [role="listbox"], [role="menu"], [data-radix-popper-content-wrapper]'
  )

  if (popoverElements.length === 0) {
    return false
  }

  return Array.from(popoverElements).some(element =>
    element.contains(document.activeElement)
  )
}

const generateKey = (() => {
  let count = 0

  return () => ++count
})()

export const Modal = forwardRef<HTMLDivElement, Props>(function Modal(
  props,
  ref
) {
  const {
    children,
    open,
    size = 'medium',
    onBackdropClick,
    onClose,
    onOpen,
    className,
    style,
    container,
    hideBackdrop = false,
    transitionDuration = 300,
    paperProps,
    align = 'centered',
    testIds,
    disableBackdropClick = false,
    transitionProps,
    ...rest
  } = props

  const picassoRootContainer = usePicassoRoot()
  const modalRef = useCombinedRefs<HTMLDivElement>(
    ref,
    useRef<HTMLDivElement>(null)
  )
  const modalId = useRef(generateKey())
  const { rootRef } = useContext(RootContext)
  const paperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDocumentFocus = () => {
      if (!rootRef?.current) {
        console.warn(
          'Modal is not rendered inside PicassoRoot, some things might not work as expected. Please open the Modal on mount using useEffect.'
        )
      }

      if (!defaultManager.isTopModal(modalId.current)) {
        return
      }

      if (!modalRef || !modalRef.current) {
        return
      }

      if (isFocusInsideModal(modalRef.current)) {
        return
      }

      if (isFocusInsideTooltip()) {
        return
      }

      if (isFocusInPopoverOrPortal()) {
        return
      }

      focusFirstFocusableElement(modalRef.current)
    }

    if (!open) {
      return
    }

    document.addEventListener('focus', handleDocumentFocus, true)

    return () => {
      document.removeEventListener('focus', handleDocumentFocus, true)
    }
  }, [open, modalRef, rootRef])

  useEffect(() => {
    const currentModalId = modalId.current

    if (open) {
      defaultManager.add(currentModalId)
    }

    return () => {
      defaultManager.remove(currentModalId)
    }
  }, [open])

  usePageScrollLock(open)

  const handleEscapeKeyDown = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  const containerElement = useCallback(() => {
    if (typeof container === 'function') {
      return container()
    }

    return container || picassoRootContainer
  }, [container, picassoRootContainer])

  return (
    <Dialog.Root
      open={open}
      modal={false}
      onOpenChange={(state: boolean) => {
        if (open && !state) {
          if (disableBackdropClick) {
            return
          }

          if (onBackdropClick) {
            onBackdropClick()
          }

          if (onClose) {
            onClose()
          }
        }
      }}
    >
      <Dialog.Portal container={containerElement()}>
        <div
          className={cx(
            'fixed z-modal inset-0 flex flex-col text-lg leading-[normal] justify-center items-center'
          )}
          ref={modalRef}
          {...rest}
        >
          {!hideBackdrop && (
            <div
              className='fixed inset-0 z-0'
              data-disabled={disableBackdropClick}
            >
              <Backdrop
                open={open}
                transitionDuration={transitionDuration}
                aria-hidden='true'
              />
            </div>
          )}

          <Dialog.Content
            onEscapeKeyDown={handleEscapeKeyDown}
            onOpenAutoFocus={e => {
              e.preventDefault()
              if (onOpen) {
                onOpen()
              }
            }}
            onCloseAutoFocus={e => {
              e.preventDefault()
              if (transitionProps?.onExited) {
                transitionProps.onExited(paperRef.current as HTMLElement)
              }
            }}
            className='outline-none pointer-events-auto'
            style={{
              position: 'relative',
              zIndex: 1,
              maxHeight: '100%',
              margin: 'auto',
              display: 'flex',
            }}
          >
            <Fade in={open} timeout={transitionDuration}>
              <ModalPaper
                ref={paperRef}
                size={size}
                align={align}
                tabIndex={-1}
                className={className}
                style={{
                  ...style,
                  maxHeight: 'inherit',
                  height: 'auto',
                  overflow: 'auto',
                }}
                {...paperProps}
              >
                <ModalContext.Provider value={true}>
                  {children}
                  {onClose && (
                    <ButtonCircular
                      aria-label='Close'
                      variant='flat'
                      className='absolute top-8 right-8'
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        onClose()
                      }}
                      data-testid={testIds?.closeButton}
                    >
                      <CloseMinor16 />
                    </ButtonCircular>
                  )}
                </ModalContext.Provider>
              </ModalPaper>
            </Fade>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

Modal.defaultProps = {
  hideBackdrop: false,
  disableBackdropClick: false,
  size: 'medium',
  transitionDuration: 300,
  align: 'centered',
}

Modal.displayName = 'Modal'

export default Modal
