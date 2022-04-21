import React, { ReactNode, LabelHTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import MUIInputLabel from '@mui/material/InputLabel'
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

const InputLabel = (props: Props) => {
  const { variant, htmlFor, className, style, children, ...rest } = props

  const classes = useStyles()

  return (
    <MUIInputLabel
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
