import React from 'react'
import type { RadioProps, RadioGroupProps } from '@toptal/picasso'
import { Radio as PicassoRadio } from '@toptal/picasso'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
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
        {({
          // omit 'highlight' as it is used only for classic inputs
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          highlight,
          ...radioGroupProps
        }) => (
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
