import React from 'react'
import { Container, Radio as PicassoRadio, Typography } from '@toptal/picasso'
import type { CombinatorSelectorProps } from 'react-querybuilder'

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
      // TODO: https://toptal-core.atlassian.net/browse/CPT-993
      // Styling will be fixed with styled-components to JSS conversion
      // css={S.Container}
      className={className}
    >
      {level === 0 && <Typography weight='semibold'>Query</Typography>}
      <PicassoRadio.Group
        name='variableName'
        horizontal
        onChange={event => handleOnChange(event.target.value)}
        value={value}
      >
        {RadioOptions({ options, disabled })}
      </PicassoRadio.Group>
    </Container>
  )
}
