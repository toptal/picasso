import React from 'react'
import type { OptionList } from 'react-querybuilder'
import { isOptionGroupArray } from 'react-querybuilder'
import { Radio } from '@toptal/picasso-radio'

type Props = {
  options: OptionList
  disabled?: boolean
}

export const RadioOptions = ({ options, disabled }: Props) => {
  if (isOptionGroupArray(options)) {
    return options.map(option => (
      <optgroup key={option.label} label={option.label}>
        {option.options.map(opt => (
          <Radio
            disabled={disabled}
            key={opt.name}
            value={opt.name}
            label={opt.label}
          />
        ))}
      </optgroup>
    ))
  }

  if (Array.isArray(options)) {
    return options.map(option => (
      <Radio
        disabled={disabled}
        key={option.name}
        value={option.name}
        label={option.label}
      />
    ))
  }

  return null
}
