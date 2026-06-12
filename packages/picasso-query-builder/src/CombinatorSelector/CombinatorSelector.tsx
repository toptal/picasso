import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { RadioGroup as PicassoRadioGroup } from '@toptal/picasso-radio'
import type { CombinatorSelectorProps } from 'react-querybuilder'
import cx from 'classnames'

import { RadioOptions } from './RadioOptions'
import { rootClassName } from './styles'

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
      className={cx(className, rootClassName)}
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
