import React from 'react'
import type { TagSelectorProps } from '@toptal/picasso'
import { TagSelector as PicassoTagSelector } from '@toptal/picasso'

import type { FieldProps } from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props = TagSelectorProps &
  FieldProps<TagSelectorProps['value']> &
  FieldLabelProps

export const TagSelector = (props: Props) => {
  const { label, labelEndAdornment, titleCase, ...rest } = props

  return (
    <InputField<TagSelectorProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: TagSelectorProps) => {
        const { value, ...restOfInputProps } = inputProps
        // avoid passing empty string to TagSelector
        const valueAsArray = Array.isArray(value) ? value : []

        return <PicassoTagSelector {...restOfInputProps} value={valueAsArray} />
      }}
    </InputField>
  )
}

TagSelector.displayName = 'TagSelector'

export default TagSelector
