import React from 'react'
import {
  Radio as PicassoRadio,
  RadioProps,
  RadioGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import RadioGroupContext from './RadioGroupContext'

export type Props = RadioGroupProps & FieldProps<RadioProps['value']>

export const RadioGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    <RadioGroupContext.Provider value={props.name}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FieldWrapper {...rest} type='radio'>
        {radioGroupProps => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { error, ...restRadioGroupProps } = radioGroupProps

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PicassoRadio.Group {...restRadioGroupProps}>
              {children}
            </PicassoRadio.Group>
          )
        }}
      </FieldWrapper>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
