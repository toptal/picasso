import React, { Children } from 'react'
import type { RadioProps, RadioGroupProps } from '@toptal/picasso-radio'
import { RadioCompound as PicassoRadio } from '@toptal/picasso-radio'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import FieldLabel from '../FieldLabel'
import type { Props as FieldLabelProps } from '../FieldLabel'
import RadioGroupContext from './RadioGroupContext'

export type Props = RadioGroupProps &
  FieldProps<RadioProps['value']> &
  FieldLabelProps

export const RadioGroup = (props: Props) => {
  const { children, label, labelEndAdornment, titleCase, ...rest } = props

  const alignment = Children.count(children) > 2 ? 'top' : 'middle'

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
              labelEndAdornment={labelEndAdornment}
              titleCase={titleCase}
              alignment={alignment}
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
