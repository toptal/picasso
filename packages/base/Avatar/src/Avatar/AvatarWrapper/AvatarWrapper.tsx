import type { ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles, { getCornerClassName, getSizeClassName } from './styles'

export interface Props extends BaseProps {
  children: ReactNode
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  variant: 'square' | 'portrait' | 'landscape'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAvatarWrapper',
})

const AvatarWrapper = (props: Props) => {
  const {
    children,
    className,
    style,
    'data-testid': dataTestId,
    size,
    variant,
  } = props
  const classes = useStyles()

  const sizeClassName = getSizeClassName(size, variant)
  const cornerClassName = getCornerClassName(size)

  return (
    <div
      style={style}
      data-testid={dataTestId}
      className={cx(
        className,
        classes.root,
        classes[sizeClassName],
        classes[cornerClassName]
      )}
    >
      {children}
    </div>
  )
}

export default AvatarWrapper
