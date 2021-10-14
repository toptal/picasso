import React, { useContext } from 'react'
import { Button, ButtonCheckboxProps } from '@toptal/picasso'
import {
  Field,
  FieldRenderProps as FinalFormFieldProps
} from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import { CheckboxGroupContext } from '../CheckboxGroup'

type CheckboxValue =
  | ButtonCheckboxProps['value']
  | ButtonCheckboxProps['checked']

type CheckboxFormProps = Omit<ButtonCheckboxProps, 'requiredDecoration'> & {
  required?: boolean
}
type CheckboxWithoutGroup = CheckboxFormProps & FieldProps<CheckboxValue>
type CheckboxInGroup = CheckboxFormProps & { name?: string }

export type Props = CheckboxWithoutGroup | CheckboxInGroup

const ButtonCheckbox = ({ name, value, required, ...restProps }: Props) => {
  const groupName = useContext(CheckboxGroupContext)
  const isCheckboxInGroup = Boolean(groupName)

  if (isCheckboxInGroup) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <Field type='checkbox' name={name || groupName!} value={value}>
        {({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          input: { value: inputValue, type, ...restInput }
        }: FinalFormFieldProps<CheckboxValue>) => {
          return <Button.Checkbox {...restProps} {...restInput} />
        }}
      </Field>
    )
  }

  return (
    <FieldWrapper
      type='checkbox'
      hideFieldLabel
      required={required}
      {...restProps}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name={name!}
    >
      {(input: ButtonCheckboxProps) => <Button.Checkbox {...input} />}
    </FieldWrapper>
  )
}

ButtonCheckbox.displayName = 'ButtonCheckbox'

export default ButtonCheckbox
