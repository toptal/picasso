import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

type ComponentType = 'label' | 'span'

export interface Props extends StandardProps {
  /** Content of the label */
  children: string
  /** Adds asteriks if true */
  required?: boolean
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string
  /** Whether label should act as inline element `display: inline-block` */
  inline?: boolean
  /** Component used for the root node */
  as?: ComponentType
}

export const FormLabel: FunctionComponent<Props> = ({
  children,
  required,
  disabled,
  htmlFor,
  classes,
  className,
  style,
  inline,
  as: Component = 'label'
}) => {
  const isInline = inline || Component === 'span'

  return (
    <Component
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
      <span className={classes.text}>{children}</span>
    </Component>
  )
}

FormLabel.defaultProps = {
  as: 'label',
  inline: false
}

FormLabel.displayName = 'FormLabel'

export default withStyles(styles)(FormLabel)
