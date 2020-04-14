import React, { useMemo } from 'react'
import { Select as PicassoSelect } from '@toptal/picasso'
import { Props as SelectProps } from '@toptal/picasso/Select'
import { generateRandomString } from '@toptal/picasso/utils'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = SelectProps & FieldProps<SelectProps['value']>

export const Select = ({ name, id = name, ...rest }: Props) => {
  const randomizedId = useMemo(() => {
    if (!id) return

    return generateRandomString(id)
  }, [id])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper<SelectProps> {...rest} name={name} id={randomizedId}>
      {(selectProps: SelectProps) => {
        return (
          <PicassoSelect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...selectProps}
            id={randomizedId}
            // if `id` is specified, we have to provide a not correct value for autoComplete, e.g. `none` to trick google chrome
            autoComplete={id ? 'none' : rest.autoComplete || 'off'}
          />
        )
      }}
    </FieldWrapper>
  )
}

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
