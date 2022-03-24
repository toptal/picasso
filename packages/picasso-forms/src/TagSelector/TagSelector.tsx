import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputFieldWrapper<TagSelectorProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            id={props.id}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: TagSelectorProps) => {
        return <PicassoTagSelector {...inputProps} />
      }}
    </InputFieldWrapper>
  )
}

TagSelector.defaultProps = {
  initialValue: []
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
