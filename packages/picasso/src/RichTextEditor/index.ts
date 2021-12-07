import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './RichTextEditor'
import { FormatType, HeaderValue } from './store/toolbar'

export { default } from './RichTextEditor'
export type { FormatType, HeaderValue }
export * from './types'
export type RichTextEditorProps = OmitInternalProps<Props>
