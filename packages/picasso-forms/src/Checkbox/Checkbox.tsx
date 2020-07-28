import React from 'react'
import { Checkbox as PicassoCheckbox, CheckboxProps } from '@toptal/picasso'
import {
  Field,
  FieldRenderProps as FinalFormFieldProps
} from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

type CheckboxValue = CheckboxProps['value'] | CheckboxProps['checked']

type CheckboxWithoutGroup = CheckboxProps & FieldProps<CheckboxValue>
type CheckboxInGroup = CheckboxProps & {
  name?: string
  inCheckboxGroup?: boolean
}

export type Props = CheckboxWithoutGroup | CheckboxInGroup

export const Checkbox = ({
  inCheckboxGroup,
  name,
  value,
  defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...restProps
}: Props) => {
  if (inCheckboxGroup) {
    return (
      <Field type='checkbox' name={name!} value={value}>
        {({
          input: { value, type, ...restInput } // eslint-disable-line @typescript-eslint/no-unused-vars
        }: FinalFormFieldProps<CheckboxValue>) => {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <PicassoCheckbox {...restProps} {...restInput} />
        }}
      </Field>
    )
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper hideFieldLabel type='checkbox' {...restProps} name={name!}>
      {(input: CheckboxProps) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <PicassoCheckbox checked={!!input.value} {...input} />
      }}
    </FieldWrapper>
  )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
