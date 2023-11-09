import type { ReactNode, HTMLAttributes } from 'react'
import React, {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog } from '@material-ui/core'
import type { PaperProps } from '@material-ui/core/Paper'
import cx from 'classnames'
import type {
  StandardProps,
  SizeType,
  TransitionProps,
} from '@toptal/picasso-shared'
import {
  usePicassoRoot,
  useBreakpoint,
  RootContext,
} from '@toptal/picasso-provider'

import { CloseMinor16 } from '../Icon'
import useCombinedRefs from '../utils/use-combined-refs'
import { ModalManager } from '../utils/Modal'
import ButtonCircular from '../ButtonCircular'
import styles from './styles'
import ModalContext from './ModalContext'
import { usePageScrollLock } from '../utils/use-page-scroll-lock'

type ContainerValue = HTMLElement | (() => HTMLElement)
type Alignment = 'top' | 'centered'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
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
  paperProps?: PaperProps
  testIds?: {
    closeButton?: string
  }
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoModal',
})
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

  focusableElements[0].focus()
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
export const Modal = forwardRef<HTMLElement, Props>(function Modal(props, ref) {
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
    transitionProps,
    disableBackdropClick = false,
    ...rest
  } = props
  const classes = useStyles(props)
  const picassoRootContainer = usePicassoRoot()
  const modalRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))
  const modalId = useRef(generateKey())
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

  const isExtraSmall = useBreakpoint('xs')

  const handleClose = useCallback(
    (_event, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'escapeKeyDown' && onClose) {
        onClose()
      } else if (reason === 'backdropClick' && !disableBackdropClick) {
        if (onBackdropClick) {
          onBackdropClick()
        }

        if (onClose) {
          onClose()
        }
      }
    },
    [disableBackdropClick, onBackdropClick, onClose]
  )

  return (
    <Dialog
      {...rest}
      ref={modalRef}
      classes={{
        root: classes.root,
        container: classes.container,
        paper: cx(classes.paper, classes[size], {
          [classes.topAlignedDialog]: align === 'top',
        }),
      }}
      className={className}
      style={style}
      fullScreen={isExtraSmall}
      container={container || picassoRootContainer}
      PaperProps={{ ...paperProps, elevation: 2 }}
      hideBackdrop={hideBackdrop}
      onClose={handleClose}
      onEnter={onOpen}
      open={open}
      transitionDuration={transitionDuration}
      maxWidth={false}
      disableEnforceFocus // we need our own mechanism to keep focus inside the Modals
      TransitionProps={transitionProps}
      disableScrollLock
    >
      <ModalContext.Provider value>{children}</ModalContext.Provider>

      {onClose && (
        <ButtonCircular
          variant='flat'
          className={classes.closeButton}
          onClick={onClose}
          data-testid={testIds?.closeButton}
        >
          <CloseMinor16 />
        </ButtonCircular>
      )}
    </Dialog>
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
