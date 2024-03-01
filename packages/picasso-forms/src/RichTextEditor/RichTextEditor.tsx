import type {
  ASTType,
  RichTextEditorProps,
} from '@toptal/picasso-rich-text-editor'
import { RichTextEditor as PicassoRichTextEditor } from '@toptal/picasso-rich-text-editor'
import React, { useMemo } from 'react'
import type { Except } from 'type-fest'
import { useForm, useField } from 'react-final-form'
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'

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
  const {
    name,
    onChange,
    onFocus,
    defaultValue,
    label,
    titleCase,
    highlight,
    ...rest
  } = props

  const {
    mutators: { setHasMultilineCounter },
  } = useForm()
  const {
    input: { value },
  } = useField(name)
  const initialValue = useMemo(
    () => defaultValue ?? htmlToHast(value),
    [defaultValue]
  )
  const hiddenInputId = `${props.id}-hidden-input`

  return (
    <InputField<InternalProps>
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      label={
        label ? (
          <FieldLabel
            name={hiddenInputId}
            required={props.required}
            label={label}
            titleCase={titleCase}
            alignment='top'
          />
        ) : null
      }
      setHasMultilineCounter={setHasMultilineCounter}
      {...rest}
    >
      {(inputProps: RichTextEditorProps) => (
        <PicassoRichTextEditor
          defaultValue={initialValue}
          hiddenInputId={hiddenInputId}
          highlight={highlight}
          {...inputProps}
        />
      )}
    </InputField>
  )
}

export default RichTextEditor
