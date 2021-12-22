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
  StandardProps,
  SizeType,
  TransitionProps
} from '@toptal/picasso-shared'
import { usePicassoRoot, useBreakpoint } from '@toptal/picasso-provider'

import { CloseMinor16 } from '../Icon'
import useCombinedRefs from '../utils/use-combined-refs'
import { ModalManager } from '../utils/Modal'
import ModalTitle from '../ModalTitle'
import ModalContent from '../ModalContent'
import ModalActions from '../ModalActions'
import Button from '../Button'
import styles from './styles'
import ModalContext from './ModalContext'

type ContainerValue = HTMLElement | (() => HTMLElement)
type Alignment = 'top' | 'centered'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
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
  name: 'PicassoModal'
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

  const tooltipContainsFocusedElement = Array.from(
    tooltipContainers
  ).some(container => container.contains(document.activeElement))

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
    const currentModal = modalId.current

    if (open) {
      // TODO: to be improved as part of https://toptal-core.atlassian.net/browse/FX-1069
      bodyOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      defaultManager.add(currentModal)
    } else {
      resetBodyOverflow()

      defaultManager.remove(currentModal)
    }

    return () => {
      resetBodyOverflow()

      defaultManager.remove(currentModal)
    }
  }, [open])

  const isSmall = useBreakpoint('small')

  return (
    <Dialog
      {...rest}
      ref={rootRef}
      classes={{
        root: classes.root,
        container: classes.container,
        paper: cx(classes.paper, classes[size], {
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
      disableBackdropClick
      TransitionProps={transitionProps}
    >
      <ModalContext.Provider value>{children}</ModalContext.Provider>

      {onClose && (
        <Button.Circular
          variant='flat'
          className={classes.closeButton}
          onClick={onClose}
          data-testid={testIds?.closeButton}
        >
          <CloseMinor16 />
        </Button.Circular>
      )}
    </Dialog>
  )
})

Modal.defaultProps = {
  hideBackdrop: false,
  size: 'medium',
  transitionDuration: 300,
  align: 'centered'
}

Modal.displayName = 'Modal'

export default Object.assign(Modal, {
  Content: ModalContent,
  Actions: ModalActions,
  Title: ModalTitle
})
