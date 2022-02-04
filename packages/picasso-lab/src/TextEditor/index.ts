import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './TextEditor'
import { FormatType, HeaderValue } from './store/toolbar'

export { default } from './TextEditor'
export type { FormatType, HeaderValue }
export * from './types'
export type TextEditorProps = OmitInternalProps<Props>
