import React from 'react'
import {
  Radio as PicassoRadio,
  RadioProps,
  RadioGroupProps,
} from '@toptal/picasso'

import PicassoField, { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import RadioGroupContext from './RadioGroupContext'

export type Props = RadioGroupProps & FieldProps<RadioProps['value']>

export const RadioGroup = (props: Props) => {
  const { children, label, titleCase, ...rest } = props

  return (
    <RadioGroupContext.Provider value={props.name}>
      <PicassoField
        {...rest}
        type='radio'
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
        {radioGroupProps => (
          <PicassoRadio.Group {...radioGroupProps}>
            {children}
          </PicassoRadio.Group>
        )}
      </PicassoField>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.defaultProps = {}

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
