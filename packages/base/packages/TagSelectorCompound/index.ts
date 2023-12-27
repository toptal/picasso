/* eslint-disable import/no-extraneous-dependencies */
import TagSelector from '@toptal/picasso-tag-selector'
import TagSelectorLabel from '@toptal/picasso-tag-selector-label'

export const TagSelectorCompound = Object.assign(TagSelector, {
  Label: TagSelectorLabel,
})
