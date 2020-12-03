import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoLabelGroup'
})

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Label` components which you want to render inside `LabelGroup` */
  children: ReactNode
}

export const LabelGroup = forwardRef<HTMLDivElement, Props>(function LabelGroup(
  props,
  ref
) {
  const { children, classes: externalClasses, className, ...rest } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} ref={ref} className={cx(classes.root, className)}>
      {children}
    </div>
  )
})

LabelGroup.defaultProps = {
  children: undefined
}

LabelGroup.displayName = 'LabelGroup'

export default LabelGroup
