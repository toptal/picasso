import React from 'react'
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
        const { error, id, ...restRadioGroupProps } = radioGroupProps

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <PicassoRadio.Group {...restRadioGroupProps}>
            {children}
          </PicassoRadio.Group>
        )
      }}
    </FieldWrapper>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
