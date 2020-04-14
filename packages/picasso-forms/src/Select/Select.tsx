import React, { useMemo } from 'react'
import { Select as PicassoSelect } from '@toptal/picasso'
import { Props as SelectProps } from '@toptal/picasso/Select'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = SelectProps & FieldProps<SelectProps['value']>

export const Select = ({ name, id = name, ...rest }: Props) => {
  const randomizedId = useMemo(() => {
    if (!id) return

    return (
      id +
      Math.random()
        .toString(32)
        .slice(2, 9)
    )
  }, [id])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper<SelectProps> {...rest} name={name} id={randomizedId}>
      {(selectProps: SelectProps) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return (
          <PicassoSelect
            {...selectProps}
            id={randomizedId}
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
