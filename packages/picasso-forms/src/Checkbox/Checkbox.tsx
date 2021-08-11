import React, { useContext } from 'react'
import { Checkbox as PicassoCheckbox, CheckboxProps } from '@toptal/picasso'
import {
  Field,
  FieldRenderProps as FinalFormFieldProps
} from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import { CheckboxGroupContext } from '../CheckboxGroup'
import { useFormConfig } from '../FormConfig'

type CheckboxValue = CheckboxProps['value'] | CheckboxProps['checked']

type CheckboxFormProps = Omit<CheckboxProps, 'requiredDecoration'> & {
  required?: boolean
}
type CheckboxWithoutGroup = CheckboxFormProps & FieldProps<CheckboxValue>
type CheckboxInGroup = CheckboxFormProps & { name?: string }

export type Props = CheckboxWithoutGroup | CheckboxInGroup

export const Checkbox = ({
  name,
  value,
  required,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  ...restProps
}: Props) => {
  const formConfig = useFormConfig()
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
          return <PicassoCheckbox {...restProps} {...restInput} />
        }}
      </Field>
    )
  }

  const showAsterisk = required && formConfig.requiredVariant === 'asterisk'
  const requiredDecoration = showAsterisk ? 'asterisk' : undefined

  return (
    <FieldWrapper
      type='checkbox'
      hideFieldLabel
      required={required}
      {...restProps}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name={name!}
    >
      {(input: CheckboxProps) => (
        <PicassoCheckbox
          {...input}
          titleCase={restProps.titleCase}
          requiredDecoration={requiredDecoration}
        />
      )}
    </FieldWrapper>
  )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
