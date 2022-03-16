import React, { useCallback, useState } from 'react'
import {
  RichTextEditor as PicassoRichTextEditor,
  RichTextEditorProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = RichTextEditorProps & FieldProps<string>

type InternalProps = RichTextEditorProps & { value: string }

export const RichTextEditor = ({ onChange, ...rest }: Props) => {
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
        <PicassoRichTextEditor {...inputProps} />
      )}
    </FieldWrapper>
  )
}

export default RichTextEditor
