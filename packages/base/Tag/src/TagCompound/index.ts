import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { TagRectangular } from '../TagRectangular'
import { TagConnection } from '../TagConnection'
import { TagCheckable } from '../TagCheckable'

type TagCompoundType = typeof Tag & {
  Group: typeof TagGroup
  Rectangular: typeof TagRectangular
  Connection: typeof TagConnection
  Checkable: typeof TagCheckable
}

export const TagCompound: TagCompoundType = Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
  Connection: TagConnection,
  Checkable: TagCheckable,
})
