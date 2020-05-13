import React from 'react'
import { TagSelector as PicassoTagSelector } from '@toptal/picasso'
import { Props as TagSelectorProps } from '@toptal/picasso/TagSelector'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

type FormTagSelector = Omit<TagSelectorProps, 'classes'>
export type Props = FormTagSelector & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormTagSelector> {...props}>
    {(inputProps: FormTagSelector) => {
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
