import React, { ReactElement } from 'react'
import {
  Radio as PicassoRadio,
  RadioProps,
  RadioGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = RadioGroupProps & FieldProps<RadioProps['value']>

export const RadioGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper {...rest} type='radio'>
      {radioGroupProps => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { error, ...restRadioGroupProps } = radioGroupProps

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <PicassoRadio.Group {...restRadioGroupProps}>
            {React.Children.toArray(children)
              .filter(React.isValidElement)
              .map(child =>
                React.cloneElement(child as ReactElement, {
                  name: props.name
                })
              )}
          </PicassoRadio.Group>
        )
      }}
    </FieldWrapper>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
