import {
  ASTType,
  RichTextEditor as PicassoRichTextEditor,
  RichTextEditorProps,
} from '@toptal/picasso'
import React, { useCallback, useRef, useState } from 'react'
import { Except } from 'type-fest'

import { FieldProps } from '../FieldWrapper'
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
  const editorRef = useRef<HTMLDivElement>(null)
  const { onChange, defaultValue, label, titleCase, ...rest } = props
  const [value, setValue] = useState('')

  // Because RichTextEditor doesn't have an value input we need to implement this
  // as an compatibility layer between final-form
  const handleOnChange = useCallback(
    (newVal: string) => {
      setValue(newVal)
      onChange?.(newVal)
    },
    [onChange, setValue]
  )

  const handleLabelClick = () => editorRef.current?.focus()

  return (
    <InputField<InternalProps>
      value={value}
      onChange={handleOnChange}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
            onClick={handleLabelClick}
          />
        ) : null
      }
      {...rest}
    >
      {(inputProps: RichTextEditorProps) => (
        <PicassoRichTextEditor
          ref={editorRef}
          defaultValue={defaultValue}
          {...inputProps}
        />
      )}
    </InputField>
  )
}

export default RichTextEditor
