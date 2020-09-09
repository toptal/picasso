import React, { useContext } from 'react'
import { Checkbox as PicassoCheckbox, CheckboxProps } from '@toptal/picasso'
import {
  Field,
  FieldRenderProps as FinalFormFieldProps
} from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import { CheckboxGroupContext } from '../CheckboxGroup'

type CheckboxValue = CheckboxProps['value'] | CheckboxProps['checked']

type CheckboxWithoutGroup = CheckboxProps & FieldProps<CheckboxValue>
type CheckboxInGroup = CheckboxProps & { name?: string }

export type Props = CheckboxWithoutGroup | CheckboxInGroup

export const Checkbox = ({
  name,
  value,
  defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...restProps
}: Props) => {
  const inCheckboxGroup = useContext(CheckboxGroupContext)

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
        return <PicassoCheckbox {...input} />
      }}
    </FieldWrapper>
  )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
