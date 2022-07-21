import React from 'react'
import {
  TagSelector as PicassoTagSelector,
  TagSelectorProps,
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
        const { value, ...restOfInputProps } = inputProps
        // avoid passing empty string to TagSelector
        const valueAsArray = value ? value : []

        return <PicassoTagSelector {...restOfInputProps} value={valueAsArray} />
      }}
    </InputField>
  )
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
