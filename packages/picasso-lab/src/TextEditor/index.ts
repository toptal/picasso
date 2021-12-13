import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './TextEditor'

export { default } from './TextEditor'
export * from './types'
export type TextEditorProps = OmitInternalProps<Props>
