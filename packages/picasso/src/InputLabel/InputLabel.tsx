import React, { ReactNode, FunctionComponent, LabelHTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIInputLabel from '@material-ui/core/InputLabel'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'standard' | 'outlined' | 'filled'

export interface Props
  extends BaseProps,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'color'> {
  variant?: VariantType
  htmlFor?: string
  /** Label content */
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoInputLabel' })

const InputLabel: FunctionComponent<Props> = props => {
  const { variant, htmlFor, className, style, children, ...rest } = props

  const classes = useStyles()

  return (
    <MUIInputLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      variant={variant}
      htmlFor={htmlFor}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUIInputLabel>
  )
}

export default InputLabel
