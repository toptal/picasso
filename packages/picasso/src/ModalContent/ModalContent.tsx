import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoModalContent'
})

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent(props, ref) {
    const {
      children,
      classes: externalClasses,
      className,
      style,
      ...rest
    } = props

    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
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

export default ModalContent
