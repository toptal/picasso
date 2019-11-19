var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import cx from 'classnames'
import { CloseMinor16 } from '../Icon'
import ModalTitle from '../ModalTitle'
import ModalContent from '../ModalContent'
import ModalActions from '../ModalActions'
import { usePicassoRoot } from '../Picasso'
import styles from './styles'
const useStyles = makeStyles(styles)
// eslint-disable-next-line react/display-name
export const Modal = forwardRef(function Modal(props, ref) {
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
      paperProps
    } = props,
    rest = __rest(props, [
      'children',
      'open',
      'size',
      'onBackdropClick',
      'onClose',
      'onOpen',
      'className',
      'style',
      'container',
      'hideBackdrop',
      'transitionDuration',
      'paperProps'
    ])
  const classes = useStyles(props)
  const picassoRootContainer = usePicassoRoot()
  return React.createElement(
    Dialog,
    // eslint-disable-next-line react/jsx-props-no-spreading
    Object.assign({}, rest, {
      ref: ref,
      classes: {
        root: classes.root,
        container: classes.container,
        paper: cx(classes.paper, classes[size])
      },
      className: className,
      style: style,
      container: container || picassoRootContainer,
      PaperProps: Object.assign(Object.assign({}, paperProps), {
        elevation: 2
      }),
      hideBackdrop: hideBackdrop,
      onBackdropClick: onBackdropClick,
      onClose: onClose,
      onEnter: onOpen,
      open: open,
      transitionDuration: transitionDuration,
      maxWidth: false
    }),
    children,
    onClose &&
      React.createElement(
        'span',
        { onClick: onClose },
        React.createElement(CloseMinor16, { className: classes.closeButton })
      )
  )
})
Modal.defaultProps = {
  hideBackdrop: false,
  size: 'medium',
  transitionDuration: 300
}
Modal.displayName = 'Modal'
Modal.Content = ModalContent
Modal.Actions = ModalActions
Modal.Title = ModalTitle
export default Modal
//# sourceMappingURL=Modal.js.map
