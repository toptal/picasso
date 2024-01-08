import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type {
  BaseProps,
  TextLabelProps,
  SizeType,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'

import styles from './styles'
import { useFieldsLayoutContext } from '../FieldsLayout'

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
    as: Component = 'label',
    titleCase: propsTitleCase,
    requiredDecoration,
    size = 'medium',
    ...rest
  } = props

  const classes = useStyles(props)

  const isInline = inline || Component === 'span'
  const titleCase = useTitleCase(propsTitleCase)
  const { layout } = useFieldsLayoutContext()

  return (
    <Component
      {...rest}
      ref={ref}
      htmlFor={htmlFor}
      className={cx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.inline]: isInline,
          [classes.horizontalLayout]: layout === 'horizontal',
        },
        className
      )}
      style={style}
    >
      <span className={classes[size]}>
        {requiredDecoration === 'asterisk' && (
          <span className={classes.asterisk}>*</span>
        )}

        {titleCase ? toTitleCase(children) : children}
        {requiredDecoration === 'optional' && ' (optional)'}
      </span>
    </Component>
  )
})

FormLabel.defaultProps = {
  as: 'label',
  inline: false,
  size: 'medium',
}

FormLabel.displayName = 'FormLabel'

export default FormLabel
