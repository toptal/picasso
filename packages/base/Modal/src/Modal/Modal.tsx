import type { ReactNode, HTMLAttributes } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import React, { forwardRef, useEffect, useRef, useContext } from 'react'
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
import ModalContext from '@toptal/picasso-modal-context'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
  classes?: {
    closeButton?: string
  }
}

const defaultManager = new ModalManager()

// https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js#L25
// found in https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
const tooltipContainerString = '[role=tooltip]'

const focusFirstFocusableElement = (node: Element) => {
  const elements = node.querySelectorAll(focusableElementsString)
  // Convert NodeList to Array
  const focusableElements = Array.prototype.slice.call(elements)

  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  }
}

const isFocusInsideModal = (modalNode: Element) => {
  const modalContainsFocusedElement = modalNode.contains(document.activeElement)

  if (modalContainsFocusedElement) {
    return true
  }

  return false
}

const isFocusInsideTooltip = () => {
  const tooltipContainers = document.querySelectorAll(tooltipContainerString)

  if (tooltipContainers.length === 0) {
    return false
  }

  const tooltipContainsFocusedElement = Array.from(tooltipContainers).some(
    container => container.contains(document.activeElement)
  )

  if (tooltipContainsFocusedElement) {
    return true
  }

  return false
}

const generateKey = (() => {
  let count = 0

  return () => ++count
})()

// eslint-disable-next-line react/display-name
export const Modal = forwardRef<HTMLDivElement, Props>(function Modal(
  {
    hideBackdrop = false,
    disableBackdropClick = false,
    size = 'medium',
    transitionDuration = 300,
    align = 'centered',
    ...props
  },
  ref
) {
  const {
    children,
    open,
    onBackdropClick,
    onClose,
    onOpen,
    onClick,
    className,
    style,
    container,
    paperProps,
    testIds,
    transitionProps,
    classes,
    ...rest
  } = props
  const picassoRootContainer = usePicassoRoot()
  const modalRef = useCombinedRefs<HTMLDivElement>(
    ref,
    useRef<HTMLDivElement>(null)
  )
  const modalId = useRef(generateKey())
  const wasOpen = useRef(false)
  const { rootRef } = useContext(RootContext)

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

  useEffect(() => {
    if (open && !wasOpen.current) {
      onOpen?.()
    }
    wasOpen.current = open
  }, [open, onOpen])

  const duration = transitionProps?.timeout || transitionDuration
  const durationStyle = { transitionDuration: `${duration}ms` }

  const resolvedContainer =
    (typeof container === 'function' ? container() : container) ||
    picassoRootContainer

  const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !disableBackdropClick) {
      onBackdropClick?.()
      onClose?.()
    }

    onClick?.(event)
  }

  return (
    <Dialog.Root
      open={open}
      modal={false}
      disablePointerDismissal
      onOpenChange={isOpen => {
        if (!isOpen) {
          onClose?.()
        }
      }}
      onOpenChangeComplete={isOpen => {
        if (!isOpen && modalRef.current) {
          transitionProps?.onExited?.(modalRef.current)
        }
      }}
    >
      <Dialog.Portal container={resolvedContainer}>
        {!hideBackdrop && (
          <Dialog.Backdrop
            className='fixed z-modal inset-0 bg-black/50 transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0'
            style={durationStyle}
          />
        )}
        <Dialog.Popup
          {...rest}
          ref={modalRef}
          initialFocus={() =>
            modalRef.current?.contains(document.activeElement)
              ? undefined
              : modalRef.current
          }
          className={twMerge(
            className,
            'fixed z-modal inset-0 flex flex-col text-lg leading-[normal] justify-center items-center transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0'
          )}
          style={{ ...style, ...durationStyle }}
          onClick={handlePopupClick}
        >
          <ModalPaper size={size} align={align} tabIndex={-1} {...paperProps}>
            <ModalContext.Provider value>
              {children}
              {onClose && (
                <ButtonCircular
                  aria-label='Close'
                  variant='flat'
                  className={twMerge(
                    'absolute top-8 right-8',
                    classes?.closeButton
                  )}
                  onClick={onClose}
                  data-testid={testIds?.closeButton}
                >
                  <CloseMinor16 />
                </ButtonCircular>
              )}
            </ModalContext.Provider>
          </ModalPaper>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

Modal.displayName = 'Modal'

export default Modal
