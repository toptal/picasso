import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './RichTextEditor'
export type { RichTextEditorChangeHandler } from './types'

export type CustomEmojiGroup = Exclude<Props['customEmojis'], undefined>[0]

export { default } from './RichTextEditor'
export type RichTextEditorProps = OmitInternalProps<Props>
