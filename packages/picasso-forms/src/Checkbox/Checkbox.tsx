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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  ...restProps
}: Props) => {
  const groupName = useContext(CheckboxGroupContext)

  if (groupName) {
    return (
      <Field type='checkbox' name={name || groupName} value={value}>
        {({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          input: { value: inputValue, type, ...restInput }
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
