import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import withGlobalProps from '../utils/with-global-props'

type ComponentType = 'label' | 'span'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /** Content of the label */
  children: ReactNode
  /** Adds asterisk if true */
  required?: boolean
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string
  /** Whether label should act as inline element `display: inline-block` */
  inline?: boolean
  /** Component used for the root node */
  as?: ComponentType
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

export const FormLabel = forwardRef<HTMLLabelElement, Props>(function FormLabel(
  {
    children,
    required,
    disabled,
    htmlFor,
    classes,
    className,
    style,
    inline,
    titleCase,
    as: Component = 'label',
    ...rest
  },
  ref
) {
  const isInline = inline || Component === 'span'

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
      {required && <span className={classes.asterisk}>*</span>}
      <span className={classes.text}>
        {titleCase ? toTitleCase(children) : children}
      </span>
    </Component>
  )
})

FormLabel.defaultProps = {
  as: 'label',
  inline: false
}

FormLabel.displayName = 'FormLabel'

export default withStyles(styles)(withGlobalProps<Props>(FormLabel))
