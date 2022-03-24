import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => (
  <InputFieldWrapper<TagSelectorProps>
    {...props}
    label={
      props.label ? (
        <FieldLabel
          id={props.id}
          required={props.required}
          label={props.label}
          titleCase={props.titleCase}
        />
      ) : null
    }
  >
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
