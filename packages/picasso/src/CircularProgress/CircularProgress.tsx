import React, { HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MUICircularProgress from '@mui/material/CircularProgress'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'determinate' | 'indeterminate'

export interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the component */
  size?: number
  /** Current value for the `static` or `indeterminate` loaders */
  value?: number
  /** Variant of the `Loader` */
  variant?: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoCircularProgress',
})

const CircularProgress = (props: Props) => {
  const { className, style, size, value, variant, ...rest } = props
  const classes = useStyles(props)

  return (
    <MUICircularProgress
      {...rest}
      classes={classes}
      className={className}
      style={style}
      size={size}
      value={value}
      variant={variant}
    />
  )
}

CircularProgress.displayName = 'CircularProgress'

export default CircularProgress
