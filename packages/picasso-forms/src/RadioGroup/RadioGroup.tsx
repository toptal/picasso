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
      <FieldWrapper {...rest} type='radio'>
        {inputProps => (
          <PicassoRadio.Group {...inputProps}>{children}</PicassoRadio.Group>
        )}
      </FieldWrapper>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
