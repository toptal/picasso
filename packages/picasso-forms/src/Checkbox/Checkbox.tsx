import React, { useContext } from 'react'
import type { CheckboxProps } from '@toptal/picasso'
import {
  useFieldsLayoutContext,
  Checkbox as PicassoCheckbox,
} from '@toptal/picasso'
import type { FieldRenderProps as FinalFormFieldProps } from 'react-final-form'
import { Field } from 'react-final-form'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
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
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  ...restProps
}: Props) => {
  const { layout } = useFieldsLayoutContext()
  const formConfig = useFormConfig()
  const groupName = useContext(CheckboxGroupContext)
  const isCheckboxInGroup = Boolean(groupName)

  if (isCheckboxInGroup) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <Field type='checkbox' name={name || groupName!} value={value}>
        {({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          input: { value: inputValue, type, ...restInput },
        }: FinalFormFieldProps<CheckboxValue>) => {
          return <PicassoCheckbox {...restProps} {...restInput} label={label} />
        }}
      </Field>
    )
  }

  const showAsterisk = required && formConfig.requiredVariant === 'asterisk'
  const requiredDecoration = showAsterisk ? 'asterisk' : undefined

  return (
    <PicassoField
      type='checkbox'
      required={required}
      {...restProps}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name={name!}
    >
      {({
        // omit 'highlight' as it is used only for classic inputs
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        highlight,
        ...input
      }: CheckboxProps & { highlight?: 'autofill' }) => (
        <>
          {layout === 'horizontal' && <div />}
          <PicassoCheckbox
            {...input}
            labelStyle={
              layout === 'horizontal' ? { gridArea: 'input' } : undefined
            }
            label={label}
            titleCase={restProps.titleCase}
            requiredDecoration={requiredDecoration}
          />
        </>
      )}
    </PicassoField>
  )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
