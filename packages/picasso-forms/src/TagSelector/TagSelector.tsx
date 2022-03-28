import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps
} from '@toptal/picasso'

import { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props = TagSelectorProps & FieldProps<TagSelectorProps['value']>

export const TagSelector = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputField<TagSelectorProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
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
    </InputField>
  )
}

TagSelector.defaultProps = {
  initialValue: []
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
