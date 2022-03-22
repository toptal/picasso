/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  Checkbox as PicassoCheckbox,
  CheckboxProps,
  CheckboxGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import CheckboxGroupContext from './CheckboxGroupContext'

export type Props = CheckboxGroupProps & FieldProps<CheckboxProps['value']>

export const CheckboxGroup = (props: Props) => {
  const { children, titleCase, ...rest } = props

  return (
    <CheckboxGroupContext.Provider value={props.name}>
      <FieldWrapper
        titleCase={titleCase}
        {...rest}
        type='checkbox'
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
        {() => (
          <PicassoCheckbox.Group {...rest}>{children}</PicassoCheckbox.Group>
        )}
      </FieldWrapper>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
