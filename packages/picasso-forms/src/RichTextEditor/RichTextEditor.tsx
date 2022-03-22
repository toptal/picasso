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

export type Props = Merge<
  RichTextEditorProps & FieldProps<string>,
  OverriddenProps
>

type InternalProps = RichTextEditorProps & { value: string }

export const RichTextEditor = ({ onChange, defaultValue, ...rest }: Props) => {
  const [internalValue, setInternalValue] = useState('')

  // Because RichTextEditor doesn't have an value input we need to implement this
  // as an compatibility layer between final-form
  const handleOnChange = useCallback(
    (newVal: string) => {
      setInternalValue(newVal)
      onChange?.(newVal)
    },
    [onChange, setInternalValue]
  )

  return (
    <FieldWrapper<InternalProps>
      value={internalValue}
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
