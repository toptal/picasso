import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Label` components which you want to render inside `LabelGroup` */
  children: ReactNode
}

export const LabelGroup = forwardRef<HTMLDivElement, Props>(function LabelGroup(
  { children, classes, ...rest },
  ref
) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} ref={ref} className={classes.root}>
      {children}
    </div>
  )
})

LabelGroup.defaultProps = {
  children: undefined
}

LabelGroup.displayName = 'LabelGroup'

export default withStyles(styles)(LabelGroup)
