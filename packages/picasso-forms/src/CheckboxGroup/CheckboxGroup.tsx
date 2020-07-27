import React, { ReactElement } from 'react'
import {
  Checkbox as PicassoCheckbox,
  CheckboxProps,
  CheckboxGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = CheckboxGroupProps & FieldProps<CheckboxProps['value']>

export const CheckboxGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper {...rest} type='checkbox'>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <PicassoCheckbox.Group {...rest}>
            {React.Children.toArray(children)
              .filter(React.isValidElement)
              .map(child =>
                React.cloneElement(child as ReactElement, {
                  name: props.name,
                  inCheckboxGroup: true
                })
              )}
          </PicassoCheckbox.Group>
        )
      }}
    </FieldWrapper>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
