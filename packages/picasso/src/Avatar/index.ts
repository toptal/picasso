import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Avatar'

export { default } from './AvatarCompound'
export type AvatarProps = OmitInternalProps<Props>
export type { VariantType, AvatarSizeType } from './types'
