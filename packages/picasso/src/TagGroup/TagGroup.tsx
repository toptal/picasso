import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Tag` components which you want to render inside `TagGroup` */
  children: ReactNode
}

export const TagGroup = forwardRef<HTMLDivElement, Props>(function TagGroup(
  { children, classes, className, ...rest },
  ref
) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} ref={ref} className={cx(classes.root, className)}>
      {children}
    </div>
  )
})

TagGroup.defaultProps = {
  children: undefined
}

TagGroup.displayName = 'TagGroup'

export default withStyles(styles)(TagGroup)
