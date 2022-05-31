import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoLabelGroup',
})

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Tag` components which you want to render inside `TagGroup` */
  children: ReactNode
}

export const TagGroup = forwardRef<HTMLDivElement, Props>(function TagGroup(
  props,
  ref
) {
  const { children, className, ...rest } = props

  const classes = useStyles()

  return (
    <div {...rest} ref={ref} className={cx(classes.root, className)}>
      {children}
    </div>
  )
})

TagGroup.defaultProps = {
  children: undefined,
}

TagGroup.displayName = 'TagGroup'

export default TagGroup
