import React from 'react'
import { Checkbox as PicassoCheckbox, CheckboxProps } from '@toptal/picasso'
import {
  Field,
  FieldRenderProps as FinalFormFieldProps
} from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

type CheckboxValue = CheckboxProps['value'] | CheckboxProps['checked']

type CheckboxWithoutGroup = CheckboxProps & FieldProps<CheckboxProps['checked']>
type CheckboxInGroup = CheckboxProps & {
  name?: string
  inCheckboxGroup: boolean
}

export type Props = CheckboxWithoutGroup | CheckboxInGroup

export const Checkbox = ({ name, value, ...restProps }: Props) => {
  if ('inCheckboxGroup' in restProps) {
    const { inCheckboxGroup, ...domProps } = restProps // eslint-disable-line @typescript-eslint/no-unused-vars
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Field type='checkbox' name={name!} value={value}>
        {({
          input: { value, type, ...restInput }
        }: FinalFormFieldProps<CheckboxValue>) => {
          // eslint-disable-line @typescript-eslint/no-unused-vars
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <PicassoCheckbox {...domProps} {...restInput} />
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
