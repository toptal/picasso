import { TagSelector } from '../TagSelector'
import { TagSelectorLabel } from '../TagSelectorLabel'

type TagSelectorCompoundType = typeof TagSelector & {
  Label: typeof TagSelectorLabel
}

export const TagSelectorCompound: TagSelectorCompoundType = Object.assign(
  TagSelector,
  {
    Label: TagSelectorLabel,
  }
)
