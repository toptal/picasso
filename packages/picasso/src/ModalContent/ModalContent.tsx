import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'
import { useCombinedRefs } from '../utils'
import useScrollableShades from './use-scrollable-shades'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent({ children, classes, className, style, ...rest }, ref) {
    /**
     * This is necessary to ensure if ref is not passed in, there's still a ref to calculate
     * when to show the scrollable shades or not.
     */
    const modalContentRef = useCombinedRefs<HTMLDivElement>(ref)

    const { top, bottom } = useScrollableShades(modalContentRef)

    return (
      <div className={cx(classes.shadedWrapper)}>
        <div
          className={cx(classes.shadedWrapperEffect, {
            [classes.topShade]: top && !bottom,
            [classes.bottomShade]: bottom && !top,
            [classes.topBottomShades]: top && bottom
          })}
        />
        <div // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          style={style}
          ref={modalContentRef}
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
