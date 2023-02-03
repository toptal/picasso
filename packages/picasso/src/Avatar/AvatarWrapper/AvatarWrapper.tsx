import React, { ReactNode } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { BaseProps, SizeType } from '@toptal/picasso-shared'
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
