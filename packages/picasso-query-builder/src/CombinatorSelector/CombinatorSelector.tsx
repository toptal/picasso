import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { RadioGroup as PicassoRadioGroup } from '@toptal/picasso-radio'
import type { CombinatorSelectorProps } from 'react-querybuilder'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { RadioOptions } from './RadioOptions'

export const CombinatorSelector = ({
  value,
  handleOnChange,
  options,
  disabled,
  className,
  level,
}: Omit<CombinatorSelectorProps, 'schema'>) => {
  return (
    <Container
      flex
      alignItems='center'
      gap='small'
      className={twMerge('mr-auto', className)}
    >
      {level === 0 && <Typography weight='semibold'>Query</Typography>}
      <PicassoRadioGroup
        name='variableName'
        horizontal
        onChange={event => handleOnChange(event.target.value)}
        value={value}
      >
        {RadioOptions({ options, disabled })}
      </PicassoRadioGroup>
    </Container>
  )
}
