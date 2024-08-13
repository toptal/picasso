import type { ReactElement, ReactNode, LabelHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import type { StandardProps, TextLabelProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { RequiredDecoration } from '../FormLabel'
import { FormCompound as Form } from '../FormCompound'
import { useFieldsLayoutContext } from '../FieldsLayout'

export type FormControlLabelAttributesType =
  LabelHTMLAttributes<HTMLLabelElement> &
    Pick<FormControlLabelProps, 'onChange'>

export interface Props
  extends StandardProps,
    TextLabelProps,
    FormControlLabelAttributesType {
  /** A control element. For instance, it can be be a Radio or a Checkbox */
  control: ReactElement
  /** The text to be used in an enclosing label element */
  label?: ReactNode
  /** Shows whether label is disabled or not */
  disabled?: boolean
  /** Whether to show asterisk or (optional) postfix as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  classes?: {
    root?: string
    label?: string
  }
}

const FormControlLabel = forwardRef<HTMLLabelElement, Props>(
  function FormControlLabel(props, ref) {
    const {
      control,
      label,
      className,
      style,
      disabled,
      requiredDecoration,
      titleCase,
      classes,
      ...rest
    } = props

    const { layout } = useFieldsLayoutContext()
    const isHorizontalLayout = layout === 'horizontal'

    return (
      <label
        {...rest}
        ref={ref}
        className={twMerge(
          'inline-flex items-center',
          'max-w-full',
          'align-middle',
          '-webkit-tap-highlight-color-transparent',
          'mx-0',
          disabled ? 'cursor-default' : 'cursor-pointer',
          isHorizontalLayout && 'col-start-1 col-span-2',
          classes?.root,
          className
        )}
        style={style}
      >
        {React.cloneElement(control, { disabled })}
        <Form.Label
          className={twMerge(disabled && 'pointer-events-auto', classes?.label)}
          as='span'
          requiredDecoration={requiredDecoration}
          disabled={disabled}
          titleCase={titleCase}
        >
          {label}
        </Form.Label>
      </label>
    )
  }
)

FormControlLabel.displayName = 'FormControlLabel'

export default FormControlLabel
