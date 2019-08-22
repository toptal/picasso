import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent({ children, classes, className, style, ...rest }, ref) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

export default withStyles(styles)(ModalContent)
