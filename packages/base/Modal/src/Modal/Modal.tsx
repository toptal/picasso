import type { ReactNode, HTMLAttributes, MouseEvent } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'
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

const resolveContainer = (
  container: ContainerValue | undefined,
  fallback: HTMLElement | null
): HTMLElement | undefined => {
  if (typeof container === 'function') {
    return container()
  }

  // `Dialog.Portal` treats an explicit `null` as "wait for the container to be
  // resolved" and never mounts. We want the default-to-`document.body` path
  // when neither a consumer-supplied container nor `PicassoRoot` is available,
  // so coalesce a missing container to `undefined`.
  return container ?? fallback ?? undefined
}

const resolveDuration = (
  timeout: TransitionProps['timeout'],
  fallback: number
): number => {
  if (typeof timeout === 'number') {
    return timeout
  }

  if (timeout && typeof timeout === 'object') {
    return timeout.exit ?? timeout.enter ?? fallback
  }

  return fallback
}

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
  const { rootRef } = useContext(RootContext)

  // Internal "should the dialog be mounted" flag. Stays `true` while the exit
  // transition runs so consumers see the modal in the DOM until Fade reports
  // `onExited`, matching the legacy `closeAfterTransition` behavior the test
  // suite relies on.
  const [renderDialog, setRenderDialog] = useState(open)

  useEffect(() => {
    if (open) {
      setRenderDialog(true)
    }
  }, [open])

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

  const handleOpenChange = useCallback(
    (nextOpen: boolean, details: Dialog.Root.ChangeEventDetails) => {
      if (nextOpen) {
        return
      }

      if (details.reason === 'escape-key') {
        onClose?.()
      }
    },
    [onClose]
  )

  const handleFadeExited = useCallback(
    (node: HTMLElement) => {
      setRenderDialog(false)
      transitionProps?.onExited?.(node)
    },
    [transitionProps]
  )

  const handlePopupClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return
      }

      if (disableBackdropClick) {
        return
      }

      onBackdropClick?.()
      onClose?.()
    },
    [disableBackdropClick, onBackdropClick, onClose]
  )

  const duration = resolveDuration(transitionProps?.timeout, transitionDuration)
  const portalContainer = resolveContainer(container, picassoRootContainer)

  if (!renderDialog) {
    return null
  }

  return (
    <Dialog.Root
      open={open}
      modal={false}
      disablePointerDismissal
      onOpenChange={handleOpenChange}
    >
      <Dialog.Portal container={portalContainer} keepMounted>
        {!hideBackdrop && (
          <Fade in={open} timeout={duration}>
            <div
              aria-hidden
              className='fixed z-modal inset-0 bg-black/50 [-webkit-tap-highlight-color:transparent]'
            />
          </Fade>
        )}
        <Dialog.Popup
          ref={modalRef}
          role='presentation'
          className={twMerge(
            'fixed z-modal inset-0 flex flex-col text-lg leading-[normal] justify-center items-center bg-transparent outline-hidden',
            className
          )}
          style={style}
          initialFocus={false}
          finalFocus={false}
          onClick={handlePopupClick}
          {...rest}
        >
          <Fade
            in={open}
            onEnter={onOpen}
            onExited={handleFadeExited}
            timeout={duration}
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
          </Fade>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

Modal.displayName = 'Modal'

export default Modal
