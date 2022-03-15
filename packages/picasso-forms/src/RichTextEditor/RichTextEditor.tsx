import React from 'react'
import {
  RichTextEditor as PicassoRichTextEditor,
  RichTextEditorProps
} from '@toptal/picasso'
import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = RichTextEditorProps & FieldProps<string>

export const RichTextEditor = (props: Props) => (
  // value is ignored
  <>asdkfjaskld</>
  // <PicassoRichTextEditor {...props} />

  // <FieldWrapper<RichTextEditorProps & { value: string }> value='' {...props}>
  // {(inputProps: RichTextEditorProps) => (
  //<PicassoRichTextEditor {...inputProps} />
  //)}
  //</FieldWrapper>
)

export default RichTextEditor
