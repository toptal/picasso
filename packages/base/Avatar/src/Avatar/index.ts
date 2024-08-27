import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Avatar'

export { default as Avatar } from './Avatar'
export { AvatarWrapper } from './AvatarWrapper/AvatarWrapper'
export type AvatarProps = OmitInternalProps<Props>
