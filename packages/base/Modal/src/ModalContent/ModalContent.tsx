import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { useCombinedRefs } from '@toptal/picasso-utils'

import styles from './styles'
import useScrollableShades from './hooks/use-scrollable-shades'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoModalContent',
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
      <div className={cx(classes.wrapper)}>
        {top && <div className={cx(classes.topShade)} />}
        {bottom && <div className={cx(classes.bottomShade)} />}
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
