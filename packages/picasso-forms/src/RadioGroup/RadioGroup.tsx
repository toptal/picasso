import React from 'react'
import {
  Radio as PicassoRadio,
  RadioProps,
  RadioGroupProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import RadioGroupContext from './RadioGroupContext'

export type Props = RadioGroupProps & FieldProps<RadioProps['value']>

export const RadioGroup = (props: Props) => {
  const { children, ...rest } = props

  return (
    <RadioGroupContext.Provider value={props.name}>
      <FieldWrapper
        {...rest}
        type='radio'
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
        {radioGroupProps => (
          <PicassoRadio.Group {...radioGroupProps}>
            {children}
          </PicassoRadio.Group>
        )}
      </FieldWrapper>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
