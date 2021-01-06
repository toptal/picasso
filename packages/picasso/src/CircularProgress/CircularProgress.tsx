import React, { FunctionComponent, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUICircularProgress from '@material-ui/core/CircularProgress'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'determinate' | 'indeterminate' | 'static'

export interface Props
  extends StandardProps,
    JssProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the component */
  size?: number
  /** Current value for the `static` or `indeterminate` loaders */
  value?: number
  /** Variant of the `Loader` */
  variant?: VariantType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCircularProgress'
})

const CircularProgress: FunctionComponent<Props> = props => {
  const { className, style, size, value, variant, ...rest } = props
  const classes = useStyles()

  return (
    <MUICircularProgress
      // eslint-disable-next-line react/jsx-props-no-spreading
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
