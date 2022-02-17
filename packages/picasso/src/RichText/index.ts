import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './RichText'

export { default } from './RichText'

export type RichTextProps = OmitInternalProps<Props>
export type { ASTType } from './types'
