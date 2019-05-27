import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

type ComponetType = 'label' | 'span'

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
  as?: ComponetType
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
  return (
    <Component
      htmlFor={htmlFor}
      className={cx(
        classes.root,
        inline ? classes.inline : classes.block,
        {
          [classes.disabled]: disabled
        },
        className
      )}
      style={style}
    >
      {required && <span className={classes.asterisk}>*</span>}
      {children}
    </Component>
  )
}

FormLabel.defaultProps = {
  as: 'label',
  inline: false
}

FormLabel.displayName = 'FormLabel'

export default withStyles(styles)(FormLabel)
