import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import { PaperProps } from '@material-ui/core/Paper'

import { CloseMinor16 } from '../Icon'
import ModalTitle from '../ModalTitle'
import ModalContent from '../ModalContent'
import ModalActions from '../ModalActions'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef,
  usePicassoRoot
} from '../Picasso'
import styles from './styles'

type ContainerValue = HTMLElement | (() => HTMLElement)

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal component */
  children: ReactNode
  /** Whether modal should be displayed */
  open: boolean
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
  transitionDuration?: number
  paperProps?: PaperProps
}

interface StaticProps {
  Content: typeof ModalContent
  Actions: typeof ModalActions
  Title: typeof ModalTitle
}

// eslint-disable-next-line react/display-name
export const Modal = forwardRef<HTMLElement, Props>(function Modal(
  {
    children,
    open,
    onBackdropClick,
    onClose,
    onOpen,
    classes,
    className,
    style,
    container,
    hideBackdrop,
    transitionDuration,
    paperProps,
    ...rest
  },
  ref
) {
  const { closeButton, ...restClasses } = classes

  const picassoRootContainer = usePicassoRoot()

  return (
    <Dialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={restClasses}
      className={className}
      style={style}
      container={container || picassoRootContainer}
      PaperProps={{ ...paperProps, elevation: 2 }}
      hideBackdrop={hideBackdrop}
      onBackdropClick={onBackdropClick}
      onClose={onClose}
      onEnter={onOpen}
      open={open}
      transitionDuration={transitionDuration}
    >
      {children}
      {onClose && (
        <span onClick={onClose}>
          <CloseMinor16 className={closeButton} />
        </span>
      )}
    </Dialog>
  )
}) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

Modal.defaultProps = {
  hideBackdrop: false,
  transitionDuration: 300
}

Modal.displayName = 'Modal'

Modal.Content = ModalContent
Modal.Actions = ModalActions
Modal.Title = ModalTitle

export default withStyles(styles)(Modal) as PicassoComponentWithRef<
  Props,
  HTMLElement,
  StaticProps
>
