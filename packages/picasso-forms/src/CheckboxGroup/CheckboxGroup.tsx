/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  Checkbox as PicassoCheckbox,
  CheckboxProps,
  CheckboxGroupProps,
} from '@toptal/picasso'

import PicassoField, { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import CheckboxGroupContext from './CheckboxGroupContext'

export type Props = CheckboxGroupProps & FieldProps<CheckboxProps['value']>

export const CheckboxGroup = (props: Props) => {
  const { children, titleCase, label, ...rest } = props

  return (
    <CheckboxGroupContext.Provider value={props.name}>
      <PicassoField
        {...rest}
        type='checkbox'
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
        {() => (
          <PicassoCheckbox.Group {...rest}>{children}</PicassoCheckbox.Group>
        )}
      </PicassoField>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
