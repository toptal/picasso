import { OmitInternalProps } from '@toptal/picasso-shared'

import { PromptModalProps as RawPromptModalProps } from './PromptModal'

export { default } from './PromptModal'
export type PromptModalProps = OmitInternalProps<RawPromptModalProps>
export * from './PromptModal'
