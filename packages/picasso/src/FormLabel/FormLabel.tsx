import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { useTitleCase, BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'

type ComponentType = 'label' | 'span'
export type RequiredDecoration = 'asterisk' | 'optional'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /** Content of the label */
  children: ReactNode
  /** Whether to show asterisk or (optional) postfix as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string
  /** Whether label should act as inline element `display: inline-block` */
  inline?: boolean
  /** Component used for the root node */
  as?: ComponentType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoFormLabel' })

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
    as: Component = 'label',
    titleCase: propsTitleCase,
    requiredDecoration,
    ...rest
  } = props

  const classes = useStyles()

  const isInline = inline || Component === 'span'
  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
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
      {requiredDecoration === 'asterisk' && (
        <span className={classes.asterisk}>*</span>
      )}
      <span className={classes.text}>
        {titleCase ? toTitleCase(children) : children}
        {requiredDecoration === 'optional' && ' (optional)'}
      </span>
    </Component>
  )
})

FormLabel.defaultProps = {
  as: 'label',
  inline: false
}

FormLabel.displayName = 'FormLabel'

export default FormLabel
