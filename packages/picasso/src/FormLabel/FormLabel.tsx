import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  useTitleCase,
  BaseProps,
  TextLabelProps,
  SizeType
} from '@toptal/picasso-shared'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'

type ComponentType = 'label' | 'span'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /** Content of the label */
  children: ReactNode
  /** Whether to show (optional) postfix */
  optional?: boolean
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string
  /** Whether label should act as inline element `display: inline-block` */
  inline?: boolean
  /** Component used for the root node */
  as?: ComponentType
  /** Component size */
  size?: SizeType<'medium' | 'large'>
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoFormLabel' })

export const FormLabel = forwardRef<HTMLLabelElement, Props>(function FormLabel(
  props,
  ref
) {
  const {
    children,
    disabled,
    htmlFor,
    className,
    style,
    inline,
    optional,
    as: Component = 'label',
    titleCase: propsTitleCase,
    size = 'medium',
    ...rest
  } = props

  const classes = useStyles(props)

  const isInline = inline || Component === 'span'
  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component
      {...rest}
      ref={ref}
      htmlFor={htmlFor}
      className={cx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.inline]: isInline
        },
        className
      )}
      style={style}
    >
      <span className={classes[size]}>
        {titleCase ? toTitleCase(children) : children}
        {optional && ' (optional)'}
      </span>
    </Component>
  )
})

FormLabel.defaultProps = {
  as: 'label',
  inline: false,
  size: 'medium'
}

FormLabel.displayName = 'FormLabel'

export default FormLabel
