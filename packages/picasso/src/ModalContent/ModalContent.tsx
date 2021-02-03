import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { useCombinedRefs } from '../utils'
import useScrollableShades from './use-scrollable-shades'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoModalContent'
})

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent(props, ref) {
    const { children, className, style, ...rest } = props

    /**
     * This is necessary to ensure if ref is not passed in, there's still a ref to calculate
     * when to show the scrollable shades or not.
     */
    const modalContentRef = useCombinedRefs<HTMLDivElement>(ref)

    const { top, bottom } = useScrollableShades(modalContentRef)

    const classes = useStyles()

    return (
      <div className={cx(classes.shadedWrapper)}>
        <div
          className={cx(classes.shadedWrapperEffect, {
            [classes.topShade]: top && !bottom,
            [classes.bottomShade]: bottom && !top,
            [classes.topBottomShades]: top && bottom
          })}
        />
        <div
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

export default ModalContent
