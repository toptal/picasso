import { Avatar } from '../Avatar'
import { AvatarGroup } from '../AvatarGroup'

type AvatarCompoundType = typeof Avatar & {
  Group: typeof AvatarGroup
}

export const AvatarCompound: AvatarCompoundType = Object.assign(Avatar, {
  Group: AvatarGroup,
})
