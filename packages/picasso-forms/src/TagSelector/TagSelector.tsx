import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => (
  <InputFieldWrapper<TagSelectorProps> {...props}>
    {(inputProps: TagSelectorProps) => {
      return <PicassoTagSelector {...inputProps} />
    }}
  </InputFieldWrapper>
)

TagSelector.defaultProps = {
  initialValue: []
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
