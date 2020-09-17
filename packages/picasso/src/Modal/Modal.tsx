import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  useEffect,
  useRef
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import { PaperProps } from '@material-ui/core/Paper'
import cx from 'classnames'
import {
  BaseProps,
  CompoundedComponentWithRef,
  usePicassoRoot,
  useBreakpoint,
  SizeType
} from '@toptal/picasso-shared'

import { Close16 } from '../Icon'
import useCombinedRefs from '../utils/use-combined-refs'
import { ModalManager } from '../utils/Modal'
import ModalTitle from '../ModalTitle'
import ModalContent from '../ModalContent'
import ModalActions from '../ModalActions'
import styles from './styles'

type ContainerValue = HTMLElement | (() => HTMLElement)
type Alignment = 'top' | 'centered'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal component */
  children: ReactNode
  /** Whether modal should be displayed */
  open: boolean
  /** Width of modal */
  size?: SizeType<'small' | 'medium' | 'large'> | 'full-screen'
  /** Callback executed when backdrop was clicked */
  onBackdropClick?: () => void
  /** Callback executed when attempting to close modal */
  onClose?: () => void
  /** Callback executed when modal is being opened */
  onOpen?: () => void
  /** A node, component instance, or function that returns either. The container will have the portal children appended to it. */
  container?: ContainerValue
  /** If `true`, the backdrop is not rendered */
  hideBackdrop?: boolean
  /** Position of the modal relative to the browser's viewport */
  align?: Alignment
  transitionDuration?: number
  paperProps?: PaperProps
}

export interface StaticProps {
  Content: typeof ModalContent
  Actions: typeof ModalActions
  Title: typeof ModalTitle
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoModal' })
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
    size,
    onBackdropClick,
    onClose,
    onOpen,
    className,
    style,
    container,
    hideBackdrop,
    transitionDuration,
    paperProps,
    align,
    ...rest
  } = props
  const classes = useStyles(props)
  const picassoRootContainer = usePicassoRoot()
  const rootRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))
  const modalId = useRef(generateKey())

  useEffect(() => {
    const handleDocumentFocus = () => {
      if (!defaultManager.isTopModal(modalId.current)) {
        return
      }

      if (!rootRef || !rootRef.current) {
        return
      }

      if (isFocusInsideModal(rootRef.current)) {
        return
      }

      if (isFocusInsideTooltip()) {
        return
      }

      focusFirstFocusableElement(rootRef.current)
    }

    if (!open) {
      return
    }

    document.addEventListener('focus', handleDocumentFocus, true)

    return () => {
      document.removeEventListener('focus', handleDocumentFocus, true)
    }
  }, [open, rootRef])

  const bodyOverflow = useRef<string>(document.body.style.overflow)

  useEffect(() => {
    const resetBodyOverflow = () => {
      document.body.style.overflow = bodyOverflow.current
    }

    if (open) {
      // TODO: to be improved as part of https://toptal-core.atlassian.net/browse/FX-1069
      bodyOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      defaultManager.add(modalId.current)
    } else {
      resetBodyOverflow()

      defaultManager.remove(modalId.current)
    }

    return () => {
      resetBodyOverflow()

      defaultManager.remove(modalId.current)
    }
  }, [open])

  const isSmall = useBreakpoint('small')

  return (
    <Dialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={rootRef}
      classes={{
        root: classes.root,
        container: classes.container,
        paper: cx(classes.paper, classes[size!], {
          [classes.topAlignedDialog]: align === 'top'
        })
      }}
      className={className}
      style={style}
      fullScreen={isSmall}
      container={container || picassoRootContainer}
      PaperProps={{ ...paperProps, elevation: 2 }}
      hideBackdrop={hideBackdrop}
      onBackdropClick={onBackdropClick}
      onClose={onClose}
      onEnter={onOpen}
      open={open}
      transitionDuration={transitionDuration}
      maxWidth={false}
      disableEnforceFocus // we need our own mechanism to keep focus inside the Modals
    >
      {children}
      {onClose && (
        <span onClick={onClose}>
          <Close16 className={classes.closeButton} />
        </span>
      )}
    </Dialog>
  )
}) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

Modal.defaultProps = {
  hideBackdrop: false,
  size: 'medium',
  transitionDuration: 300,
  align: 'centered'
}

Modal.displayName = 'Modal'

Modal.Content = ModalContent
Modal.Actions = ModalActions
Modal.Title = ModalTitle

export default Modal
