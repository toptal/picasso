import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => (
  <FieldWrapper<TagSelectorProps> {...props}>
    {(inputProps: TagSelectorProps) => {
      return <PicassoTagSelector {...inputProps} />
    }}
  </FieldWrapper>
)

TagSelector.defaultProps = {
  initialValue: []
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
