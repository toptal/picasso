import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { TagRectangular } from '../TagRectangular'
import { TagConnection } from '../TagConnection'
import { TagCheckable } from '../TagCheckable'

export const TagCompound = Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
  Connection: TagConnection,
  Checkable: TagCheckable,
})
