/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react'
import {
  Checkbox as PicassoCheckbox,
  CheckboxProps,
  CheckboxGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import CheckboxGroupContext from './CheckboxGroupContext'

export type Props = CheckboxGroupProps & FieldProps<CheckboxProps['value']>

export const CheckboxGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    <CheckboxGroupContext.Provider value>
      <FieldWrapper {...rest} type='checkbox'>
        {() => (
          <PicassoCheckbox.Group {...rest}>
            {React.Children.toArray(children)
              .filter(React.isValidElement)
              .map(child =>
                React.cloneElement(child as ReactElement, {
                  name: props.name
                })
              )}
          </PicassoCheckbox.Group>
        )}
      </FieldWrapper>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
