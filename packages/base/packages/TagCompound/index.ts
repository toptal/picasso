/* eslint-disable import/no-extraneous-dependencies */
import Tag from '@toptal/picasso-tag'
import TagGroup from '@toptal/picasso-tag-group'
import TagRectangular from '@toptal/picasso-tag-rectangular'
import TagConnection from '@toptal/picasso-tag-connection'
import TagCheckable from '@toptal/picasso-tag-checkable'

export const TagCompound = Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
  Connection: TagConnection,
  Checkable: TagCheckable,
})
