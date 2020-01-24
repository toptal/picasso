import React from 'react'
import { Radio as PicassoRadio } from '@toptal/picasso'
import { Props as PicassoRadioProps } from '@toptal/picasso/Radio'
import { Props as PicassoRadioGroupProps } from '@toptal/picasso/RadioGroup'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = PicassoRadioGroupProps &
  FieldProps<PicassoRadioProps['value']>

export const RadioGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    <FieldWrapper {...rest} type='radio'>
      {radioGroupProps => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { error, ...restRadioGroupProps } = radioGroupProps

        return (
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
