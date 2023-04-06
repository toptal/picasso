import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './RichText'

export { default } from './RichText'

export type RichTextProps = OmitInternalProps<Props>
export type { ASTType } from './types'
