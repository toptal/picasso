import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './RichTextEditor'
export type { CustomEmojiGroup, RichTextEditorChangeHandler } from './types'

export { default } from './RichTextEditor'
export type RichTextEditorProps = OmitInternalProps<Props>