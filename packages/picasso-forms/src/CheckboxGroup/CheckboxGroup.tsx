/* eslint-disable react/jsx-props-no-spreading */
import React, { Children } from 'react'
import type { CheckboxGroupProps } from '@toptal/picasso-checkbox'
import { CheckboxCompound as PicassoCheckbox } from '@toptal/picasso-checkbox'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import CheckboxGroupContext from './CheckboxGroupContext'

type ValueType = string[] | undefined
export type Props = CheckboxGroupProps & FieldProps<ValueType> & FieldLabelProps

export const CheckboxGroup = (props: Props) => {
  const {
    children,
    titleCase,
    label,
    labelEndAdornment,
    initialValue,
    ...rest
  } = props

  const alignment = Children.count(children) > 2 ? 'top' : 'middle'

  return (
    <CheckboxGroupContext.Provider value={props.name}>
      <PicassoField
        {...rest}
        initialValue={initialValue}
        type='checkbox'
        label={
          label ? (
            <FieldLabel
              name={props.name}
              required={props.required}
              label={label}
              labelEndAdornment={labelEndAdornment}
              titleCase={titleCase}
              alignment={alignment}
            />
          ) : null
        }
      >
        {() => (
          <PicassoCheckbox.Group {...rest}>{children}</PicassoCheckbox.Group>
        )}
      </PicassoField>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
