import {
  RichTextEditor as PicassoRichTextEditor,
  RichTextEditorProps
} from '@toptal/picasso'
import React, { useCallback, useState } from 'react'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import { Merge } from '../utils/types'

type OverriddenProps = {
  defaultValue?: RichTextEditorProps['defaultValue']
  value?: never
  initialValue?: never
}

// We need to ignore the defaultValue from FieldProps, but Omit doesn't work with indexed types
// We used our own workaround instead
export type Props = RichTextEditorProps &
  Merge<FieldProps<string>, OverriddenProps>

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
        <PicassoRichTextEditor defaultValue={defaultValue} {...inputProps} />
      )}
    </FieldWrapper>
  )
}

export default RichTextEditor
