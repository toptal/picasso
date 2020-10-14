import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent({ children, classes, className, style, ...rest }, ref) {
    return (
      <div className={cx(classes.fadedWrapper)}>
        <div className={cx(classes.fadedWrapperEffect)} />
        <div // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          style={style}
          className={cx(classes.modalContent, className)}
        >
          {children}
        </div>
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

export default withStyles(styles)(ModalContent)
