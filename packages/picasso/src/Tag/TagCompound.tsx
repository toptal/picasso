import TagGroup from '../TagGroup'
import TagRectangular from '../TagRectangular'
import TagConnection from '../TagConnection'
import TagCheckable from '../TagCheckable'
import { Tag } from './Tag'

export default Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
  Connection: TagConnection,
  Checkable: TagCheckable
})
