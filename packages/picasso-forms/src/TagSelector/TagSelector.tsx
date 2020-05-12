import React from 'react'
import { TagSelector as PicassoTagSelector } from '@toptal/picasso'
import { Props as TagSelectorProps } from '@toptal/picasso/TagSelector'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<TagSelectorProps> {...props}>
    {(inputProps: TagSelectorProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoTagSelector {...inputProps} />
    }}
  </FieldWrapper>
)

TagSelector.defaultProps = {
  initialValue: []
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
