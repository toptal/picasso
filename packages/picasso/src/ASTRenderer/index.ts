import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './ASTRenderer'

export { default } from './ASTRenderer'

export type ASTRendererProps = OmitInternalProps<Props>
export type { ASTType } from './types'
