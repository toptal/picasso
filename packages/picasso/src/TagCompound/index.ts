import Tag from '../Tag'
import TagGroup from '../TagGroup'
import TagRectangular from '../TagRectangular'

export const TagCompound = Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
})
