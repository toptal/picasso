import {
  ASTType,
  RichTextEditor as PicassoRichTextEditor,
  RichTextEditorProps
} from '@toptal/picasso'
import React, { useCallback, useState } from 'react'
import { Except } from 'type-fest'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

type OverriddenProps = {
  defaultValue?: ASTType
  value?: never
  initialValue?: never
}

export type Props = RichTextEditorProps &
  Except<FieldProps<string>, keyof OverriddenProps> &
  OverriddenProps

type InternalProps = RichTextEditorProps & { value: string }

export const RichTextEditor = ({ onChange, defaultValue, ...rest }: Props) => {
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

  return (
    <FieldWrapper<InternalProps>
      value={value}
      onChange={handleOnChange}
      {...rest}
    >
      {(inputProps: RichTextEditorProps) => (
        <PicassoRichTextEditor
          defaultValue={defaultValue}
          {...inputProps}
        />
      )}
    </FieldWrapper>
  )
}

export default RichTextEditor
