import type { ASTType, RichTextEditorProps } from '@toptal/picasso'
import { RichTextEditor as PicassoRichTextEditor } from '@toptal/picasso'
import React, { useCallback, useState } from 'react'
import type { Except } from 'type-fest'
import { useForm } from 'react-final-form'

import type { FieldProps } from '../FieldWrapper'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'

type OverriddenProps = {
  defaultValue?: ASTType
  value?: never
  initialValue?: never
}

export type Props = RichTextEditorProps &
  Except<FieldProps<string>, keyof OverriddenProps> &
  OverriddenProps

type InternalProps = RichTextEditorProps & { value: string }

export const RichTextEditor = (props: Props) => {
  const { onChange, defaultValue, label, titleCase, ...rest } = props
  const [value, setValue] = useState('')
  const {
    mutators: { setHasMultilineCounter },
  } = useForm()

  // Because RichTextEditor doesn't have an value input we need to implement this
  // as an compatibility layer between final-form
  const handleOnChange = useCallback(
    (newVal: string) => {
      setValue(newVal)
      onChange?.(newVal)
    },
    [onChange, setValue]
  )
  const hiddenInputId = `${props.id}-hidden-input`

  return (
    <InputField<InternalProps>
      value={value}
      onChange={handleOnChange}
      label={
        label ? (
          <FieldLabel
            name={hiddenInputId}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
      setHasMultilineCounter={setHasMultilineCounter}
      {...rest}
    >
      {(inputProps: RichTextEditorProps) => (
        <PicassoRichTextEditor
          defaultValue={defaultValue}
          hiddenInputId={hiddenInputId}
          {...inputProps}
        />
      )}
    </InputField>
  )
}

export default RichTextEditor
