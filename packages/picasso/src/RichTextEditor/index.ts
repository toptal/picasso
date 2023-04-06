import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './RichTextEditor'

export { default } from './RichTextEditor'
export type { RichTextEditorChangeHandler } from './types'
export type RichTextEditorProps = OmitInternalProps<Props>
